import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import BoardSection from './board-section'
import boardActions from '../js/actions/board-actions'

import '../css/board.css'

class Board extends Component {
  constructor( props ) {
    super( props )

    this.state = { isBoardExpanded: false }

    this.onDeleteBoard = this.onDeleteBoard.bind( this )
    this.onExpandClick = this.onExpandClick.bind( this )
  }

  onDeleteBoard() {
    const { board, deleteBoard } = this.props
    const { _id } = board

    deleteBoard( _id )
  }

  onExpandClick() {
    this.setState( { isBoardExpanded: !this.state.isBoardExpanded } )
  }

  render() {
    const { isBoardExpanded } = this.state
    const { board } = this.props
    const { boardName, _id, sections } = board
    const { good, bad, actions } = sections

    if ( !isBoardExpanded ) {
      return (
        <li className="board shrinked" onClick={ this.onExpandClick }>
          <div className="board-header">
            <h2>{ boardName }</h2>
            <input type="button" className="board-delete-button danger" onClick={ this.onDeleteBoard } value="x" />
          </div>
        </li>
      )
    }

    // Refactor sectionName to get the names from an object, not to be hardcoded
    return (
      <li className="board">

        <div className="board-header" onClick={ this.onExpandClick }>
          <h2>{ boardName }</h2>
          <input type="button" className="board-delete-button danger" onClick={ this.onDeleteBoard } value="x" />
        </div>

        <div className="board-sections">
          <BoardSection sectionName="Good" sectionItems={ good } boardId={ _id } />
          <BoardSection sectionName="Bad" sectionItems={ bad } boardId={ _id } />
          <BoardSection sectionName="Actions" sectionItems={ actions } boardId={ _id } />
        </div>

      </li>
    )
  }
}


Board.propTypes = {
  board: PropTypes.object,
  deleteBoard: PropTypes.func.isRequired
}

export default connect( null, boardActions )( Board )
