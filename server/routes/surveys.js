const express = require('express');
const router = express.Router();
const paths = require('./routes.paths');
const {isLoggedIn, hasCredits} = require('../middleware/authorization');

router.post('/', [isLoggedIn, hasCredits], (req, res) => {
  const {
    title,
    subject,
    body,
    recipients,
    answerYes,
    answerNo,
    _user,
    dateSent,
    lastResponded
  } = req.body;

  return res.send(req.user);
});

module.exports = {handler: router, path: paths.surveys};
