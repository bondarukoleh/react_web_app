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

export const fetchBillingResult = ({cardHolder, cardNumber, user}) => async (dispatch) => {
  const getBillingCredit = {
    method: 'get',
    url: '/api/credit/billing',
    params: {
      cardNumber, cardHolder
    },
  }

  try {
    const {status, data} = await axios(getBillingCredit);
    console.log('GOT FROM SERVER ', status, data)
    if(data.billingDone) {
      try {
        const {data} = await axios.post('/api/credit/add', {
          creditAmount: data.creditAmount
        });
        if(data.error) {
          return dispatch({
            type: BillingActions.billingFail,
            payload: false
          });
        }
        dispatch({
          type: BillingActions.billingSuccess,
          payload: data
        });
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