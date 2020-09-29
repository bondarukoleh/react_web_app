const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {URL} = require('url');
const {Path} = require('path-parser');
const paths = require('./routes.paths');
const {isLoggedIn, hasCredits} = require('../middleware/authorization');
const {templates, Mailer} = require('../helpers/emails');

const Survey = mongoose.model('survey');
const isClickEvent = (eventObj) => eventObj.event === 'click' && eventObj.url;
const extractSurveyIdAndAnswer = ({url, email}) => {
  const urlObject = new URL(url);
  const parsedPath = new Path('/api/surveys/:surveyID/:answer').test(urlObject.pathname);
  if (parsedPath) {
    return {email, surveyID: parsedPath.surveyID, answer: parsedPath.answer};
  }
};
const updateDBSurvey = ({email, surveyID, answer}) => {
  // instead of finding survey by id, find a recipient by email, change him, then change it, and return whole
  // list or Surveys back - we will sent only one query, that will cover all the actions
  Survey.updateOne({_id: surveyID, recipients: {$elemMatch: {email, responded: false}}},
    {$inc: {[answer]: 1}, $set: {'recipients.$.responded': true}, lastResponded: Date.now()}
  ).exec()
    .catch(console.log);
};

router.post('/', [isLoggedIn, hasCredits], async (req, res) => {
  let {title, subject, body, recipients} = req.body;

  recipients = recipients.split(',').map(email => ({email: email.trim().toLowerCase()}));

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
  let clickEvents = [];
  if (req.body.length) {
    clickEvents = req.body.filter(isClickEvent);
  }
  if (clickEvents.length) {
    clickEvents = clickEvents.map(extractSurveyIdAndAnswer).filter(v => v && v); // filter undefined
  }
  if (clickEvents.length) {
    try {
      clickEvents.map(updateDBSurvey);
    } catch (e) {
      return res.status(500).send({message: e});
    }
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

router.get('/', isLoggedIn, async (req, res) => {
  let surveys = [];
  try {
    surveys = await Survey.find({_user: req.user.id}).select({recipients: false});
    surveys = surveys.map(survey => ({
      body: survey.body,
      dateSent: survey.dateSent,
      lastResponded: survey.lastResponded,
      no: survey.no,
      subject: survey.subject,
      title: survey.title,
      yes: survey.yes,
      id: survey._id
    }));
  } catch (e) {
    res.status(500).send({error: `Couldn't get the surveys`});
  }
  res.send(surveys);
});

router.delete('/:id', isLoggedIn, async (req, res) => {
  const survey = await Survey.findByIdAndRemove({_id: req.params.id});
  if(!survey) return res.status(404).send({error: `Survey with id: "${req.params.id}" is not found.`});
  return res.send({id: survey._id});
});

module.exports = {handler: router, path: paths.surveys};
