import axios from 'axios';
import {AuthActions} from "./authActions";

export const BillingActions = {
  billingFail: 'BILLING_FAIL'
};

export const sendUserPaymentToken = (token) => async (dispatch) => {
  try {
    const {data} = await axios.post('/api/payment/token', token);
    if (data && data.error) {
      return dispatch({
        type: BillingActions.billingFail,
        payload: data
      });
    }
    dispatch({
      type: AuthActions.currentUser,
      payload: data
    });
  } catch (e) {
    console.log(`Couldn't bill credit user \n`, e);
    return dispatch({
      type: BillingActions.billingFail,
      payload: false
    });
  }
};