const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const paths = require('./routes.paths');
const {isLoggedIn, hasCredits} = require('../middleware/authorization');
const {templates, Mailer} = require('../helpers/emails');

const Survey = mongoose.model('survey');

router.post('/', [isLoggedIn, hasCredits], async (req, res) => {
  let {title, subject, body, recipients} = req.body;
  console.log('GOT RECIPIENTS')
  console.log(recipients)

  recipients = recipients.split(',').map(email => ({email: email.trim()}))

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
    content: templates.surveyTemplate(body)
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
router.post('/webhook', (req, res) => {
  // const [ {
  //   email: 'example@test.com',
  //   timestamp: 1587679100,
  //   'smtp-id': '<14c5d75ce93.dfd.64b469@ismtpd-555>',
  //   event: 'click',
  //   category: 'cat facts',
  //   sg_event_id: 'iNPlSK-HuAKwn4GYYlv7qQ==',
  //   sg_message_id: '14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0',
  //   useragent: 'Mozilla/4.0 (compatible; MSIE 6.1; Windows XP; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
  //   ip: '255.255.255.255',
  //   url: 'http://www.sendgrid.com/'
  // }] = req.body;
  console.log(req.body)
  res.send({'HI': "YUYUYU"})
});

// TODO: move to the client side
router.get('/thanks', (req, res) => {
  res.send(`Thank you for the participating! We glad you like it!`);
});

router.get('/sorry', (req, res) => {
  res.send(`Thank you for the participating! We'll try to make it better!`);
});

module.exports = {handler: router, path: paths.surveys};
