const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const paths = require('./routes.paths');
const {isLoggedIn, hasCredits} = require('../middleware/authorization');
const {mail: {Mailer, templates}} = require('../services')

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

  /* sendgrid - will add an uniq id to every link from the email we send thru him, so when user click it - we know
  * which distinguish user has done it. We could also add the id (connected to particular user) to url query and
  *  figure out who clicked it. Links that inform application that something just happened called webhooks, or web
  *  callbacks or reverse API */

  const mailer = new Mailer({title, subject, recipients, content: templates.surveyTemplate(body)});


  return res.send(req.user);
});

module.exports = {handler: router, path: paths.surveys};
