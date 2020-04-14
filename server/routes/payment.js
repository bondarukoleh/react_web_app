const express = require('express');
const router = express.Router();

const paths = require('./routes.paths');
const {isLoggedIn} = require('../middleware/authorization')
const {STRIPE_SEC_KEY} = require('../config');

router.post('/token', isLoggedIn, async (req, res) => {
  const stripe = require('stripe')(STRIPE_SEC_KEY);
  const {id} = req.body;

  const chargeRequest = {
    amount: 500,
    currency: 'usd',
    source: id,
    description: `Charging user "${req.user.name}" with 5$`,
  };

  // creating charge for user
  let chargeObj = null;
  try {
    chargeObj = await stripe.charges.create(chargeRequest);
  } catch (e) {
    return res.status(500).send({error: `Couldn't charge the money, please try again later.`});
  }

  // updating user credits after success charge
  try {
    // since we are using mongo and passport, we can access user model via req.user and all methods like .save()
    req.user.credit += chargeObj.amount * 0.01;
    const user = await req.user.save(); // by convention - we use updated latest version of the model, not just req.user
    return res.send(user);
  } catch (e) {
    return res.status(500).send({error: `Couldn't update User credit, we will return you the money!`});
  }
});

module.exports = {handler: router, path: paths.apiPayment};
