import { Map } from 'immutable';

import {
  POST_MENU_START,
  POST_MENU_SUCCESS,
  POST_MENU_ERROR,
  GET_ALL_USERS_START,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_ERROR,
} from 'actions/admin';

const initialState = Map({
  // postMenu
  postMenuLoading: false,
  postMenuError: null,
  postMenuSuccess: null,
});

const actionsMap = {

  // POST_MENU actions
  [POST_MENU_START]: (state) => {
    return state.merge({
      postMenuLoading: true,
      postMenuError: null,
    });
  },
  [POST_MENU_ERROR]: (state, action) => {
    return state.merge(Map({
      postMenuLoading: false,
      postMenuError: action.data,
    }));
  },
  [POST_MENU_SUCCESS]: (state, action) => {
    return state.merge(Map({
      postMenuLoading: false,
      postMenuSuccess: action.data,
    }));
  },
  [GET_ALL_USERS_START]: (state) => {
    return state.merge(Map({
      getAllUsersLoading: true,
      getAllUsersError: null,
    }));
  },
  [GET_ALL_USERS_ERROR]: (state, action) => {
    return state.merge(Map({
      getAllUsersLoading: false,
      getAllUsersError: action.data,
    }));
  },
  [GET_ALL_USERS_SUCCESS]: (state, action) => {
    return state.merge(Map({
      getAllUsersSuccess: action.data,
      getAllUsersLoading: false,
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
