import actionTypes from '../action-types'
import loadingStatuses from '../loading-statuses'
import Axios from 'axios'

const { LOADING, LOADED, LOAD_ERROR } = loadingStatuses
const {
  ADD_BOARD,
  DELETE_BOARD,
  LOAD_BOARDS,
  TOGGLE_ADD_BOARD_VIEW,
  ADD_BOARD_ITEM,
  DELETE_BOARD_ITEM
} = actionTypes

const boardsBaseURL = 'boards'

const loadBoardsAction = ( dispatch, status, data ) => {
  dispatch({
    type: LOAD_BOARDS,
    boards: {
      status,
      data
    }
  })
}

const loadBoardsPromise = ( url, dispatch ) => {
  loadBoardsAction( dispatch, LOADING, [] )

  Axios.get( boardsBaseURL )
    .then( response => {
      loadBoardsAction( dispatch, LOADED, response.data )
    })
    .catch( err => {
      loadBoardsAction( dispatch, LOAD_ERROR, err )
    })
}



export const addBoard = ( board ) => ( dispatch, getState ) => {
  const { boards } = getState()

  Axios.post( `${ boardsBaseURL }`, board )
    .then( ( response ) => {
      dispatch({
        type: ADD_BOARD,
        payload: {
          boards,
          board: response.data
        }
      })
    })
}

export const deleteBoard = ( boardId ) => ( dispatch, getState ) => {
  const { boards } = getState()

  Axios.post( `${ boardsBaseURL }/${ boardId }` )
    .then( () => {
      dispatch({
        type: DELETE_BOARD,
        payload: {
          boards,
          boardId
        }
      })
    })
}

export const toggleAddBoardView = ( isHidden ) => dispatch => {
  dispatch({
    type: TOGGLE_ADD_BOARD_VIEW,
    isAddBoardPanelHidden: isHidden
  })
}

export const loadBoards = () => dispatch => {
  loadBoardsPromise( boardsBaseURL, dispatch )
}

export const addBoardItem = ( boardId, section, item ) => ( dispatch, getState ) => {
  const { boards } = getState()

  Axios.post( `${ boardsBaseURL }/${ boardId }/${ section }`, item )
    .then( ( response ) => {
      dispatch({
        type: ADD_BOARD_ITEM,
        payload: {
          boardId,
          boards,
          section,
          item: response.data
        }
      })
    })
}

export const deleteBoardItem = ( boardId, section, itemId ) => ( dispatch, getState ) => {
  const { boards } = getState()

  Axios.post( `${ boardsBaseURL }/${ boardId }/${ section }/${ itemId }` )
    .then( () => {
      dispatch({
        type: DELETE_BOARD_ITEM,
        payload: {
          boardId,
          boards,
          section,
          itemId
        }
      })
    })
}

export default { loadBoards, addBoardItem, toggleAddBoardView, addBoard, deleteBoard, deleteBoardItem }
