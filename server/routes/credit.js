const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const paths = require('./routes.paths');
const UserModel = mongoose.model('users');

router.post('/billing', (req, res) => {
  setTimeout(() => {
    return res.send({billingDone: true, creditAmount: req.body.paymentAmount});
  }, 2000)
});

router.post('/add', async (req, res) => {
  try {
    const user = await UserModel.findOne({googleID: req.user.googleID});
    const newCreditsAmount = user.credit + Number(req.body.creditAmount);
    await user.set({credit: newCreditsAmount}).save();
    // return res.redirect('/surveys') // TODO: figure out why it's not working
    return res.send({addedCredits: newCreditsAmount})
  } catch (e) {
    return res.send({error: `Couldn't update User credit, we will return the money!!!`});
  }
});

module.exports = {handler: router, path: paths.apiCredit};
