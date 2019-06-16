import  { createActions } from 'redux-actions';

export default createActions({
  SET_VISIBLE: (visible = true) => ({ visible })
});
