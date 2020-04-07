import axios from 'axios';

export const AuthActions = {
  currentUser: 'CURRENT_USER'
};

export const fetchCurrentUserActionCreator = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/current_user');
    return dispatch({
      type: AuthActions.currentUser,
      payload: response.data
    });
  } catch (e) {
    console.log(`Couldn't fetch user \n`, e)
  }
}