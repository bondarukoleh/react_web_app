import {AuthActions} from '../actions'

const initialState = {
  user: null
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case AuthActions.loggedUser:
      return {user: action.payload};
    case AuthActions.userIsNotLogged:
      return {user: null};
    default:
      return state;
  }
}