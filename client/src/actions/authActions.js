import axios from 'axios';

export const AuthActions = {
  fetch_user: 'FETCH_USER'
};

export function getLoggedUser() {
  return function (dispatch) {
    axios.get('/api/current_user')
      .then((res) => dispatch({
        type: AuthActions.fetch_user,
        payload: res
      }))
      .catch(e => console.log(`Couldn't fetch user \n`, e));
  };
}