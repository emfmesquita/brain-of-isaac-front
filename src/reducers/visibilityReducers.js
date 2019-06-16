import { handleActions } from 'redux-actions';
import actions from '../actions/visibilityActions';

export default handleActions(
  {
    [actions.setVisible]: (state, action) => state.visible === action.payload.visible ? state : { ...state, ...action.payload }
  },
  {
    visible: true
  },
);
