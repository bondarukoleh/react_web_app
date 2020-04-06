import axios from 'axios';

export const AuthActions = {
  currentUser: 'CURRENT_USER'
};

export function fetchCurrentUserActionCreator() {
  return function (dispatch) {
    axios.get('/api/current_user')
      .then((res) => {
        return dispatch({
          type: AuthActions.currentUser,
          payload: res.data
        });
      })
      .catch(e => console.log(`Couldn't fetch user \n`, e));
  };
}