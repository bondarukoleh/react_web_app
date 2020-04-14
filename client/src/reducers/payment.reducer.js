import {BillingActions} from '../actions/paymentActions'

const initialState = {
  billing: null
};

export function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case BillingActions.billingFail:
      return {...state, billing: action.payload}
    default:
      return state;
  }
}