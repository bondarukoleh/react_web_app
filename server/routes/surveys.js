const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {URL} = require('url');
const {Path} = require('path-parser');
const paths = require('./routes.paths');
const {isLoggedIn, hasCredits} = require('../middleware/authorization');
const {templates, Mailer} = require('../helpers/emails');

const Survey = mongoose.model('survey');

router.post('/', [isLoggedIn, hasCredits], async (req, res) => {
  let {title, subject, body, recipients} = req.body;

  recipients = recipients.split(',').map(email => ({email: email.trim()}));

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
    fromEmail: 'bondarukqaqa@gmail.com',
    subject,
    recipients: recipients.map(({email}) => email),
    content: templates.surveyTemplate(survey)
  };

  const mailer = new Mailer(mailerConfig);
  try {
    await mailer.sendSurvey();
    await survey.save();
    req.user.credit -= 1;
    const user = await req.user.save();
    return res.send(user);
  } catch (error) {
    // Log friendly error
    console.error(error);

    if (error.response) {
      // Extract error msg
      const {message, code, response} = error;
      const {headers, body} = response;
      console.error(body);
    }
    return res.status(422).send({error: `Couldn't send the survey! ${error.message}`});
  }
});

// this url is added as webhook to sendgrid mail settings
router.post('/webhook', async (req, res) => {
  // TODO: rewrite this shame & debug
  let clickEvents = [];
  if (req.body.length) {
    clickEvents = req.body.filter(({event}) => event === 'click');
  }
  if (clickEvents.length) {
    clickEvents = clickEvents.map(({url, email}) => {
      const pathObj = new Path('/api/surveys/:surveyID/:answer');
      const urlObject = new URL(url);
      const parsedPath = pathObj.test(urlObject.pathname);
      if (parsedPath) {
        return {email, surveyID: parsedPath.surveyID, answer: parsedPath.answer};
      }
    });
  }
  clickEvents = clickEvents.filter(v => v && v); // filter undefined
  if (clickEvents.length) {
    clickEvents.map(({email, surveyID, answer}) => {
      Survey.updateOne(
        {
          _id: surveyID,
          recipients: {
            $elemMatch: {email: email, responded: false}
          }
        },
        {
          $inc: {[answer]: 1},
          $set: {'recipients.$.responded': true},
          lastResponded: new Date()
        }
      ).exec().catch(console.log);
    });
    return res.send({message: 'Thanks, got the hook data.'});
  }
  console.log('we got some unneeded data');
  res.send({message: 'no needed hook data received'});
});

// TODO: move to the client side
router.get('/:surveyID/:answer', (req, res) => {
  res.send(`Thank you for the participating! ${req.params.answer === 'yes'
    ? 'We glad you like it!'
    : `We'll try to make it better!`}`);
});

module.exports = {handler: router, path: paths.surveys};
