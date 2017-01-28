import { combineReducers } from 'redux';
import { boards, isAddBoardPanelHidden } from './boards-reducers';

const funRetroDeluxe = combineReducers({
  boards,
  isAddBoardPanelHidden
});

export default funRetroDeluxe;
