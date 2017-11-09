import { combineReducers } from 'redux';
import app from 'reducers/app';
import login from 'reducers/login';
import admin from 'reducers/admin';

export default combineReducers({
  app,
  login,
  admin,
});
