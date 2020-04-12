import axios from 'axios';

export const BillingActions = {
  cardHolderNameChange: 'CARD_HOLDER_NAME_CHANGE',
  cardNumberChange: 'CARD_NUMBER_CHANGE',
  paymentAmountChange: 'PAYMENT_AMOUNT_CHANGE',
  billingSuccess: 'BILLING_SUCCESS',
  billingFail: 'BILLING_FAIL'
};

export const cardHolderNameChangeActionCreator = (cardHolderValue) => (dispatch) => {
  return dispatch({
    type: BillingActions.cardHolderNameChange,
    payload: cardHolderValue
  });
};

export const cardNumberChangeActionCreator = (cardNumberValue) => (dispatch) => {
  return dispatch({
    type: BillingActions.cardNumberChange,
    payload: cardNumberValue
  });
};

export const paymentAmountActionCreator = (paymentAmountValue) => (dispatch) => {
  return dispatch({
    type: BillingActions.paymentAmountChange,
    payload: paymentAmountValue
  });
};

export const fetchBillingResult = ({cardHolder, cardNumber, paymentAmount}) => async (dispatch) => {
  try {
    const {data} = await axios.post('/api/credit/billing', {cardNumber, cardHolder, paymentAmount});
    if(data.billingDone) {
      try {
        const addCreditResp = await axios.post('/api/credit/add', {
          creditAmount: data.creditAmount
        });
        if(addCreditResp.data && addCreditResp.data.error) {
          return dispatch({
            type: BillingActions.billingFail,
            payload: addCreditResp.data.error
          });
        }
        dispatch({
          type: BillingActions.billingSuccess,
          payload: addCreditResp.data
        });
        window.location = '/surveys' // TODO: Make it more pretty
      } catch (e) {
        console.log(`Couldn't add credit to user \n`, e); // TODO: Make global error
      }
    } else {
      return dispatch({
        type: BillingActions.billingFail,
        payload: false
      });
    }
    // if(status < 400) {
    //   return dispatch({
    //     type: BillingActions.billingSuccess,
    //     payload: data
    //   });
    // } else if(status < 500) {
    //   return dispatch({
    //     type: BillingActions.billingFail,
    //     payload: data
    //   });
    // }
  } catch (e) {
    console.log(`Couldn't bill credit user \n`, e);  // TODO: Make global error
  }
};