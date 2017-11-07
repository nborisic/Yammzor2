import { findUserByUID, saveOrUpdateUser } from 'api/user';
import { roles } from 'utils/global';

export const GET_USER_START = 'GET_USER_START';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const LOG_OUT_USER = 'LOG_OUT_USER';


// Get user
function getUserStart() {
  return {
    type: GET_USER_START,
  };
}

function getUserSuccess(data) {
  return {
    type: GET_USER_SUCCESS,
    data,
  };
}

function getUserError(error) {
  return {
    type: GET_USER_ERROR,
    error,
  };
}

export function getUser(uid, email, username) {
  return function (dispatch) {
    dispatch(getUserStart());
    findUserByUID(uid)
      .then(data => {
        if (data.val()) {
          const storedUser = { ...data.val(), uid };
          dispatch(getUserSuccess(storedUser));
        } else {
          const newUser = {
            username,
            role: roles.USER,
            email,
          };
          saveOrUpdateUser(uid, newUser);
          const storedUser = { ...newUser, uid };
          dispatch(getUserSuccess(storedUser));
        }
      }).catch(error => dispatch(getUserError(error)));
  };
}

export function logOutUser() {
  return {
    type: LOG_OUT_USER,
  };
}
