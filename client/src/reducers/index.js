import {combineReducers} from 'redux';
import {authReducer} from './authReducer';
import {surveyReducer} from './surveyReducer';
// import {billingReducer} from './billingReducer';

export const rootReducer = combineReducers({
  survey: surveyReducer,
  auth: authReducer,
  // billing: billingReducer
});