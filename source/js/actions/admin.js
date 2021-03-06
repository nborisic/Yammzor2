import { getIdToken } from 'api/auth';
import { dbRef } from 'utils/global';


export const POST_MENU_START = 'POST_MENU_START';
export const POST_MENU_SUCCESS = 'POST_MENU_SUCCESS';
export const POST_MENU_ERROR = 'POST_MENU_ERROR';

export const GET_ALL_USERS_START = 'GET_ALL_USERS_START';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_ERROR = 'GET_ALL_USERS_ERROR';

export const UPDATE_ROLE_START = 'UPDATE_ROLE_START';
export const UPDATE_ROLE_SUCCESS = 'UPDATE_ROLE_SUCCESS';
export const UPDATE_ROLE_ERROR = 'UPDATE_ROLE_ERROR';

export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_ERROR = 'DELETE_USER_SUCCESS';


function postMenuStart() {
  return {
    type: POST_MENU_START,
  };
}

function postMenuSuccess(data) {
  return {
    type: POST_MENU_SUCCESS,
    data,
  };
}

function postMenuError(error) {
  return {
    type: POST_MENU_ERROR,
    error,
  };
}


export function submitMenu(menuObject) {
  return function (dispatch) {
    dispatch(postMenuStart());
    getIdToken().then((idToken) => {
      fetch(`${ dbRef }/menu.json?auth=${ idToken }`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuObject),
      });
    })
    .then(
      () => {
        const formSubmitSuccess = 'Forma uspesno poslata!';
        dispatch(postMenuSuccess(formSubmitSuccess));
      }
    )
    .catch(
      () => {
        const formSubmitError = 'Ups, nesto je poslo po zlu.. forma nije poslata';
        dispatch(postMenuError(formSubmitError));
      }
    );
  };
}

function getAllUsersStart() {
  return {
    type: GET_ALL_USERS_START,
  };
}

function getAllUsersSuccess(data) {
  return {
    type: GET_ALL_USERS_SUCCESS,
    data,
  };
}

function getAllUsersError(error) {
  return {
    type: GET_ALL_USERS_ERROR,
    error,
  };
}

export function getAllUsers() {
  return function (dispatch) {
    dispatch(getAllUsersStart());
    getIdToken().then((idToken) => {
      fetch(`${ dbRef }/users.json?auth=${ idToken }`)
      .then((response) => {
        return response.json();
      }
    ).then(
      (result) => {
        dispatch(getAllUsersSuccess(result));
      }
    ).catch(
        (error) => {
          dispatch(getAllUsersError(error));
        }
      );
    });
  };
}

function updateRoleStart() {
  return {
    type: UPDATE_ROLE_START,
  };
}

function updateRoleSuccess(data) {
  return {
    type: UPDATE_ROLE_SUCCESS,
    data,
  };
}

function updateRoleError(error) {
  return {
    type: UPDATE_ROLE_ERROR,
    error,
  };
}


export function updateRole(value, name) {
  const roleObj = { 'role': `${ value }` };
  return function (dispatch) {
    dispatch(updateRoleStart());
    getIdToken().then(idToken => {
      fetch(`${ dbRef }/users/${ name }.json?auth=${ idToken }`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roleObj),
      });
    })
    .then(
      () => {
        const successMessage = 'Uspesno promenjena rola';
        dispatch(updateRoleSuccess(successMessage));
      }
    )
    .catch(
      () => {
        const errorMessage = 'Greska pri promeni role';
        dispatch(updateRoleError(errorMessage));
      }
    );
  };
}

function deleteUserSuccess(message) {
  return {
    type: DELETE_USER_SUCCESS,
    message,
  };
}

function deleteUserError(message) {
  return {
    type: DELETE_USER_ERROR,
    message,
  };
}


export function deleteUser(uid) {
  return function (dispatch) {
    getIdToken().then(idToken => {
      fetch(`${ dbRef }/users/${ uid }.json?auth=${ idToken }`, {
        method: 'DELETE',
      });
    })
    .then(
      () => {
        const successMessage = 'Obrisa coveka';
        dispatch(deleteUserSuccess(successMessage));
      }
    )
    .catch(
      () => {
        const errorMessage = 'Brisanje neupsesno';
        dispatch(deleteUserError(errorMessage));
      }
    );
  };
}
