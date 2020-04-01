const express = require('express');
const router = express.Router();
const passport = require('passport');
const urls = require('./routes.urls');

function plugAuth(app) {
  app.get('/auth/google/', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    return res.send(`Hi ${req.user.name}, nice to see you!`);
  });

  app.get('/api/current_user', (req, res) => {
    return res.send(req.user);
    // req.user - userModel added by passport
    // req.session - user id that added by passport when we serialize a user when he logs in
  });

  app.get('/api/logout', (req, res) => {
    req.logout(); // function added as a user property by passport, allows to clear cookies from the client-browser
    res.send(`You are logged out. ${req.user}`);
  });
}

// router.get('/', passport.authenticate('google', {
//   scope: ['profile', 'email']
// }));
//
// router.get('/callback', passport.authenticate('google'));
// router.get('/callback', (req, res) =>  {
//   return res.send('YOU ARE IN CALLBACK')
// });


module.exports = {handler: router, url: urls.authGoogle, plugAuth};
