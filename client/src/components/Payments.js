import React, {Component} from "react";
import {connect} from 'react-redux';
import StripeCheckout from "react-stripe-checkout";

const {REACT_APP_STRIPE_PUB_KEY} = process.env;

class Payments extends Component {
  stripePaymentCallback = (token) => {
    console.log(`Got authorization from stripe ${token}`)
  }

  render() {
    return (
      <StripeCheckout
        amount={100} // amount cents to pay
        token={this.stripePaymentCallback} // callback after authorization with card details in stripe vendor is done
        stripeKey={REACT_APP_STRIPE_PUB_KEY}
      />
    );
  }
}

const mapStateToProps = store => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Payments);