import actionTypes from '../action-types'
import loadingStatuses from '../loading-statuses'
import Axios from 'axios'

const { LOADING, LOADED, LOAD_ERROR } = loadingStatuses
const { LOAD_BOARDS, TOGGLE_ADD_BOARD_VIEW } = actionTypes

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



export const addBoard = ( board ) => dispatch => {
  Axios.post( `${ boardsBaseURL }`, board )
    .then( () => {
      loadBoardsPromise( boardsBaseURL, dispatch )
    })
}

export const deleteBoard = ( boardId ) => dispatch => {
  Axios.post( `${ boardsBaseURL }/${ boardId }` )
    .then( () => {
      loadBoardsPromise( boardsBaseURL, dispatch )
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

export const addBoardItem = ( boardId, section, item ) => dispatch => {
  Axios.post( `${ boardsBaseURL }/${ boardId }/${ section }`, item )
    .then( () => {
      loadBoardsPromise( boardsBaseURL, dispatch )
    })
}

export const deleteBoardItem = ( boardId, section, itemId ) => dispatch => {
  Axios.post( `${ boardsBaseURL }/${ boardId }/${ section }/${ itemId }` )
    .then( () => {
      loadBoardsPromise( boardsBaseURL, dispatch )
    })
}

export default { loadBoards, addBoardItem, toggleAddBoardView, addBoard, deleteBoard, deleteBoardItem }
