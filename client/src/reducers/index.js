import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { surveyReducer } from './survey';

export const rootReducer = combineReducers({
  survey: surveyReducer,
  auth: authReducer,
});