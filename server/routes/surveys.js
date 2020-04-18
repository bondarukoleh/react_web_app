const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const paths = require('./routes.paths');
const {isLoggedIn, hasCredits} = require('../middleware/authorization');
const {templates, Mailer} = require('../helpers/emails');

const Survey = mongoose.model('survey');

router.post('/', [isLoggedIn, hasCredits], async (req, res) => {
  const {title, subject, body, recipients} = req.body;

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

  const mailerConfig = {
    romEmail: 'bondarukqaqa@gmail.com',
    subject,
    recipients,
    content: templates.surveyTemplate(body)
  };

  const mailer = new Mailer(mailerConfig);
  try {
    await mailer.sendSurvey();
    return res.status(201).send({message: 'Done!'});
  } catch (error) {
    // Log friendly error
    console.error(error);

    if (error.response) {
      // Extract error msg
      const {message, code, response} = error;
      const {headers, body} = response;
      console.error(body);
    }
    return res.status(500).send({error: `Couldn't send the survey! ${error.message}`});
  }
});

module.exports = {handler: router, path: paths.surveys};
