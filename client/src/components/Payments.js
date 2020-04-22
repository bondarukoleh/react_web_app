import React, {Component} from "react";
import {connect} from 'react-redux';
import StripeCheckout from "react-stripe-checkout";
import {sendUserPaymentToken} from '../actions/payment.actions';

const {REACT_APP_STRIPE_PUB_KEY} = process.env;

class Payments extends Component {
  stripePaymentCallback = (tokenObj) => {
    console.log(`Your token id ${tokenObj.id}, email - ${tokenObj.email}`);
    const {sendPaymentToken} = this.props;
    sendPaymentToken(tokenObj);
  };

  render() {
    return (
      <StripeCheckout
        amount={500} // amount cents to pay
        token={this.stripePaymentCallback} // callback after authorization with card details in stripe vendor is done
        stripeKey={REACT_APP_STRIPE_PUB_KEY}
        name="Emaily"
        description="5$ for 5 email credits"
      >
        <button className="btn">Add credits</button>
      </StripeCheckout>
    );
  }
}

const mapStateToProps = store => {
  return {
    user: store.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendPaymentToken: (token) => dispatch(sendUserPaymentToken(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payments);