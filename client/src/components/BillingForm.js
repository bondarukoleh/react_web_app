// TODO: Will be replaced with Payments.js

// import React, {Component} from "react";
// import {connect} from 'react-redux';
// import {
//   fetchBillingResult,
//   cardHolderNameChangeActionCreator,
//   cardNumberChangeActionCreator,
//   paymentAmountActionCreator
// } from "../actions/userBillingActions";
//
// class BillingForm extends Component {
//   handleSubmit = (e) => {
//     const {performPayment, cardHolder, cardNumber, paymentAmount} = this.props;
//     e.preventDefault();
//     performPayment({cardHolder, cardNumber, paymentAmount});
//   };
//
//   handleInputChange = (e) => {
//     const {id, value} = e.currentTarget;
//     this.props[`${id}Change`](value); // TODO: think about more elegant solution
//   };
//
//   validateForm = () => {
//     const {cardHolder, cardNumber, paymentAmount} = this.props;
//     return !(cardHolder.trim().length > 0
//       && cardNumber.trim().length > 0
//       && paymentAmount.trim().length > 0); // disabled = true, so we need false from here
//   };
//
//   render() {
//     const {cardHolder, cardNumber, paymentAmount, billingDone} = this.props;
//     return (
//       <React.Fragment>
//         {billingDone && billingDone.error && <h4 style={{color: 'red'}}>{billingDone.error}</h4>}
//         <h6>Billing form mock. We'll not charge you any monet, no worries.</h6>
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             Card Holder Name (any):
//             <input className="none_yet"
//                    placeholder="Enter your name..."
//                    id="cardHolder"
//                    onChange={this.handleInputChange} value={cardHolder}/>
//           </label>
//           <label>
//             Card Number (any):
//             <input className="none_yet"
//                    placeholder="Enter your card number..."
//                    id="cardNumber"
//                    onChange={this.handleInputChange} value={cardNumber}></input>
//           </label>
//           <label>
//             Payment amount ($):
//             <input className="none_yet"
//                    placeholder="Enter dollars amount..."
//                    id="paymentAmount"
//                    onChange={this.handleInputChange} value={paymentAmount}></input>
//           </label>
//           <button type="submit"
//                   className="none_yet"
//                   disabled={this.validateForm()}>
//             Click to pay a credit
//           </button>
//         </form>
//       </React.Fragment>
//     );
//   }
// }
//
// const mapStateToProps = store => {
//   return {
//     cardHolder: store.billing.cardHolderName,
//     cardNumber: store.billing.cardNUmber,
//     paymentAmount: store.billing.paymentAmount,
//     billingDone: store.billing.done,
//   };
// };
//
// const mapDispatchToProps = dispatch => {
//   return {
//     cardHolderChange: (newName) => dispatch(cardHolderNameChangeActionCreator(newName)),
//     cardNumberChange: (newValue) => dispatch(cardNumberChangeActionCreator(newValue)),
//     paymentAmountChange: (newValue) => dispatch(paymentAmountActionCreator(newValue)),
//     performPayment: (userData) => dispatch(fetchBillingResult(userData)),
//   };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(BillingForm);