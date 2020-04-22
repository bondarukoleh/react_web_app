import {SurveyActions} from '../actions/survey.actions';

const initialState = {
  surveySend: null
};

export function surveyReducer(state = initialState, action) {
  switch (action.type) {
    case SurveyActions.surveySendFail:
      return {...state, surveySend: action.payload};
    case SurveyActions.surveySendSuccess:
      return {...state, surveySend: action.payload};
    default:
      return state;
  }
}