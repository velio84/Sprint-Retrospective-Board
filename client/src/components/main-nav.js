import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import boardActions from '../js/actions/board-actions'
import AddBoard from './add-board'

class MainNav extends Component {
  componentWillMount() {
    this.props.loadBoards()
  }

  render() {
    const { toggleAddBoardView } = this.props
    const AddBoardButton = <input type="button" className="add-new-board-button" onClick={ () => toggleAddBoardView( false ) } value="Add board" />

    return (
      <div className="main-nav">
        <AddBoard />
        { AddBoardButton }
      </div>
    )
  }
}

MainNav.propTypes = {
  loadBoards: PropTypes.func.isRequired,
  toggleAddBoardView: PropTypes.func.isRequired
}

export default connect( null, boardActions )( MainNav )
