import {AuthActions} from '../actions/authActions'

const initialState = {
  user: null
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case AuthActions.currentUser:
      return {user: action.payload};
    default:
      return state;
  }
}