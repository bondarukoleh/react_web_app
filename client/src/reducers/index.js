import {combineReducers} from 'redux';
import {authReducer} from './auth.reducer';
import {paymentReducer} from './payment.reducer';
import {surveyReducer} from './survey.reducer';
import {reducer as surveyFormReducer} from "redux-form";

export const rootReducer = combineReducers({
  form: surveyFormReducer, // name should be "form", all forms of redux-form - will be connected to this property
  auth: authReducer,
  payment: paymentReducer,
  survey: surveyReducer,
});