import actionTypes from '../action-types'
import loadingStatuses from '../loading-statuses'

const {
  ADD_BOARD,
  DELETE_BOARD,
  LOAD_BOARDS,
  TOGGLE_ADD_BOARD_VIEW,
  ADD_BOARD_ITEM,
  DELETE_BOARD_ITEM
} = actionTypes

const { LOADING, LOADED } = loadingStatuses

const defaultState = {
  boards: {},
  isAddBoardPanelHidden: true
}

function handleAddBoardAction( payload ) {
  const { boards, board } = payload
  const newState = Object.assign( {}, boards );
  newState.data.reverse()
  newState.data.push( board )
  newState.data.reverse()

  return newState
}

function handleDeleteBoardAction( payload ) {
  const { boards, boardId } = payload
  const filteredBoards = boards.data.filter( board => board._id !== boardId )
  const newState = Object.assign( {}, boards, { data: filteredBoards } );

  return newState
}

function handleLoadBoardsAction( state, action ) {
  if ( action.boards.status === LOADING ) {
    const boards = {
      status: LOADING,
      data: []
    }

    return Object.assign( {}, state, boards )
  }

  if ( action.boards.status === LOADED ) {
    const boards = {
      status: LOADED,
      data: action.boards.data
    }

    const newState = Object.assign( {}, state, boards )
    newState.data.reverse()

    return newState
  }

  return state
}

function handleAddBoardItemAction( state, action ) {
  const { boardId, boards, section, item } = action.payload

  const updatedBoards = boards.data.map( board => {
    if ( board._id === boardId ) {
      const updatedBoard = Object.assign( {}, board );
      updatedBoard.sections[ section ].push( item )

      return updatedBoard
    }

    return board
  })

  return Object.assign( {}, state, { data: updatedBoards } )
}

function handleDeleteBoardItemACtion( state, action ) {
  const { boardId, boards, section, itemId } = action.payload

  const updatedBoards = boards.data.map( board => {
      if ( board._id === boardId ) {

        const updatedBoardSection = board.sections[ section ].filter( item => item._id !== itemId )
        const updatedBoard = Object.assign( {}, board )
        updatedBoard.sections[ section ] = updatedBoardSection

        return updatedBoard
      }

      return board
  })

  return Object.assign( {}, state, { data: updatedBoards } )
}


export const boards = ( state = defaultState.boards, action ) => {

  switch ( action.type ) {
    case ADD_BOARD:
      return handleAddBoardAction( action.payload )
    case DELETE_BOARD:
      return handleDeleteBoardAction( action.payload )
    case LOAD_BOARDS:
      return handleLoadBoardsAction( state, action )
    case ADD_BOARD_ITEM:
      return handleAddBoardItemAction( state, action )
    case DELETE_BOARD_ITEM:
      return handleDeleteBoardItemACtion( state, action )
    default:
      return state
  }

}

export const isAddBoardPanelHidden = ( state = defaultState.isAddBoardPanelHidden, action ) => {
  if ( action.type === TOGGLE_ADD_BOARD_VIEW ) {
    return action.isAddBoardPanelHidden
  }

  return state
}
