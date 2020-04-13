// import {BillingActions} from '../actions/userBillingActions';
//
// const initialState = {
//   cardHolderName: '',
//   cardNUmber: '',
//   paymentAmount: '',
//   done: null
// };
//
// export function billingReducer(state = initialState, action) {
//   switch (action.type) {
//     case BillingActions.cardHolderNameChange:
//       return {...state, cardHolderName: action.payload};
//     case BillingActions.cardNumberChange:
//       return {...state, cardNUmber: action.payload};
//     case BillingActions.paymentAmountChange:
//       return {...state, paymentAmount: action.payload};
//     case BillingActions.billingSuccess:
//       return {...state, done: action.payload};
//     case BillingActions.billingFail:
//       return {...state, done: action.payload};
//     default:
//       return state;
//   }
// }