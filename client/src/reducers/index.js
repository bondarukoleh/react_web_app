import {combineReducers} from 'redux';
import {authReducer} from './auth.reducer';
import {paymentReducer} from './payment.reducer';
import {reducer as surveyReducer} from "redux-form";

export const rootReducer = combineReducers({
  form: surveyReducer, // name should be "form", all forms of redux-form - will be connected to this property
  auth: authReducer,
  payment: paymentReducer
});