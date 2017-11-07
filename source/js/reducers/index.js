import { combineReducers } from 'redux';
import app from 'reducers/app';
import login from 'reducers/login';

export default combineReducers({
  app,
  login,
});
