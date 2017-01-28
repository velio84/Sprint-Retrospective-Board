import actionTypes from '../action-types'
import loadingStatuses from '../loading-statuses'

const { LOAD_BOARDS, TOGGLE_ADD_BOARD_VIEW } = actionTypes
const { LOADING, LOADED } = loadingStatuses

const defaultState = {
  boards: {},
  isAddBoardPanelHidden: true
}

export const boards = ( state = defaultState.boards, action ) => {
  if ( action.type === LOAD_BOARDS ) {
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
      return Object.assign( {}, state, boards )
    }

    return state
  }

  return state
}

export const isAddBoardPanelHidden = ( state = defaultState.isAddBoardPanelHidden, action ) => {
  if ( action.type === TOGGLE_ADD_BOARD_VIEW ) {
    return action.isAddBoardPanelHidden
  }

  return state
}
