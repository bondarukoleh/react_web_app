const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const paths = require('./routes.paths');
const {isLoggedIn, hasCredits} = require('../middleware/authorization');

const Survey = mongoose.model('survey');

router.post('/', [isLoggedIn, hasCredits], (req, res) => {
  const {
    title,
    subject,
    body,
    recipients,
  } = req.body;

  const survey = new Survey({
    title,
    subject,
    body,
    recipients,
    _user: req.user.id,
    dateSent: Date.now(),
  });

  return res.send(req.user);
});

module.exports = {handler: router, path: paths.surveys};
