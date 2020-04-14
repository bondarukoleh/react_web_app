import {combineReducers} from 'redux';
import {authReducer} from './auth.reducer';
import {surveyReducer} from './survey.reducer';
import {paymentReducer} from './payment.reducer';

export const rootReducer = combineReducers({
  survey: surveyReducer,
  auth: authReducer,
  payment: paymentReducer
});