import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { surveyReducer } from './surveyReducer';

export const rootReducer = combineReducers({
  survey: surveyReducer,
  auth: authReducer,
});