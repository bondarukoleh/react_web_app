import axios from 'axios';

export const AuthActions = {
  loggedUser: 'LOGGED_USER',
  userIsNotLogged: 'NOT_LOGGED_USER'
};

export function getLoggedUser() {
  return function (dispatch) {
    axios.get('/api/current_user')
      .then((res) => {
        console.log('GOT RESPONSE');
        console.log(res);

        return dispatch({
          type: AuthActions.loggedUser,
          payload: res
        });
      })
      .catch(e => console.log(`Couldn't fetch user \n`, e));
  };
}