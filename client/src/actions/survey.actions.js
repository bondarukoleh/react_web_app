import axios from 'axios';
import {AuthActions} from "./auth.actions";
import {BillingActions} from "./payment.actions";

export const SurveyActions = {
  surveySendFail: 'SURVEY_SEND_FAIL',
  surveySendSuccess: 'SURVEY_SEND_SUCCESS'
};

export const senSurveyActionCreator = (survey) => async (dispatch) => {
  try {
    const {data} = await axios.post('/api/surveys', survey);
    if (data && data.error) {
      return dispatch({
        type: SurveyActions.surveySendFail,
        payload: data
      });
    }
    dispatch({
      type: AuthActions.currentUser,
      payload: data
    });
    dispatch({
      type: SurveyActions.surveySendSuccess,
      payload: true
    });
  } catch (e) {
    console.log(`Couldn't send the survey \n`, e);
    return dispatch({
      type: BillingActions.surveySendFail,
      payload: false
    });
  }
};