import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import loadingStatuses from '../js/loading-statuses'
import Board from './board'

const { LOADING, LOADED } = loadingStatuses

const Boards = ( { boards } ) => {

  if ( boards.status === LOADING ) {
    return (
      <div>
        <div>LOADING</div>
      </div>
    );
  }

  if ( boards.status === LOADED ) {
    return (
      <div className="boards">
        <ul>
        {
          boards.data.map( ( board, index ) => {
            return <Board board={ board } key={ board._id } isInitiallyExpanded={ index === 0 ? true : false } ></Board>
          })
        }
        </ul>
      </div>
    )
  }

  return <div></div>
}

Boards.propTypes = {
  boards: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    boards: state.boards
  }
}

export default connect ( mapStateToProps )( Boards )
