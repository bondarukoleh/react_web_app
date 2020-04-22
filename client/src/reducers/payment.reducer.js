import {BillingActions} from '../actions/payment.actions';

const initialState = {
  billing: null
};

export function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case BillingActions.billingFail:
      return {...state, billing: action.payload};
    default:
      return state;
  }
}