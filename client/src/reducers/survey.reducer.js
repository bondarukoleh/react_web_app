import {SurveyActions} from '../actions/survey.actions';

const initialState = {
  surveySend: null,
  fetchSurveys: null
};

export function surveyReducer(state = initialState, action) {
  switch (action.type) {
    case SurveyActions.surveySendFail:
      return {...state, surveySend: action.payload};
    case SurveyActions.surveySendSuccess:
      return {...state, surveySend: action.payload};
    case SurveyActions.fetchSurveysSuccess:
      return {...state, fetchSurveys: action.payload};
    case SurveyActions.fetchSurveysFail:
      return {...state, fetchSurveys: action.payload};
    case SurveyActions.deleteSurveySuccess:
      return {...state, deleteSurvey: action.payload};
    case SurveyActions.deleteSurveyFail:
      return {...state, deleteSurvey: action.payload};
    default:
      return state;
  }
}