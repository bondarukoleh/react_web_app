const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const paths = require('./routes.paths');
const UserModel = mongoose.model('users');

router.get('/billing', (req, res) => {
  console.log('PARAMS FROM REQUEST')
  console.log(req.params)
  setTimeout(() => {
    return res.send({billingDone: true});
  }, 2000)
});

router.post('/add', async (req, res) => {
  console.log('BODY FROM REQUEST')
  console.log(req.body)
  // try {
  //   const user = await UserModel.findOne({googleID: req.user.googleID});
  //   await user.set({credit: Number(req.body.creditAmount)}).save();
  //   return res.redirect('/surveys')
  // } catch (e) {
  //   return res.send({error: `Couldn't update User credit, we will return the money!!!`});
  // }
  return res.redirect('/billing')
});

module.exports = {handler: router, path: paths.apiCredit};
