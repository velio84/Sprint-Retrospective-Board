import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import boardActions from '../js/actions/board-actions'
import '../css/new-board.css';

class AddBoard extends Component {
  constructor( props ) {
    super( props )

    this.state = { newBoardName: '' }

    this.resetState = this.resetState.bind(this)
    this.onNewBoardNameChange = this.onNewBoardNameChange.bind( this )
    this.hideAddBoardView = this.hideAddBoardView.bind( this )
    this.onAddNewBoard = this.onAddNewBoard.bind( this )
  }

  resetState() {
    this.setState( { newBoardName: '' } )
  }

  onNewBoardNameChange( ev ) {
    this.setState( { newBoardName: ev.target.value } )
  }

  hideAddBoardView() {
    this.props.toggleAddBoardView( true )
  }

  onAddNewBoard() {
    const { addBoard } = this.props
    const { newBoardName } = this.state

    addBoard( { boardName: newBoardName } )
    this.resetState()
    this.hideAddBoardView()
  }

  render() {
    const { isAddBoardPanelHidden } = this.props
    const className = isAddBoardPanelHidden ? 'add-new-board hidden' : 'add-new-board'

    return (
      <div className={ className }>
        <input type="text" onChange={ this.onNewBoardNameChange } value={ this.state.newBoardName } />
        <input type="button" className="add-button" value="Add" onClick={ this.onAddNewBoard } />
        <input type="button" className="cancel-button danger" value="Cancel" onClick={ this.hideAddBoardView } />
      </div>
    )
  }
}

AddBoard.propTypes = {
  isAddBoardPanelHidden: PropTypes.bool.isRequired,
  toggleAddBoardView: PropTypes.func.isRequired,
  addBoard: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    isAddBoardPanelHidden: state.isAddBoardPanelHidden
  }
}

export default connect( mapStateToProps, boardActions )( AddBoard )
