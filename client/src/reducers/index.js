import {combineReducers} from 'redux';
import {authReducer} from './auth.reducer';
import {paymentReducer} from './payment.reducer';
import {reducer as surveyReducer} from "redux-form";

export const rootReducer = combineReducers({
  form: surveyReducer, // name should be "form", my god
  auth: authReducer,
  payment: paymentReducer
});