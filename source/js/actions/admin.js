import { firebaseCurrentUser } from 'api/auth';


export const POST_MENU_START = 'POST_MENU_START';
export const POST_MENU_SUCCESS = 'POST_MENU_SUCCESS';
export const POST_MENU_ERROR = 'POST_MENU_ERROR';


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
    firebaseCurrentUser().getIdToken(true).then((idToken) => {
      fetch(`https://yamzor-2.firebaseio.com/menu.json?auth=${ idToken }`, {
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
