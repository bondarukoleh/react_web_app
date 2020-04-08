const express = require('express');
const router = express.Router();
const passport = require('passport');
const paths = require('./routes.paths');

function plugAuth(app) {
  app.get(paths.auth.google, passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get(paths.auth.googleCallback, passport.authenticate('google'), (req, res) => {
      return res.redirect('/surveys');
    }
  );

  app.get(paths.api.currentUser, (req, res) => {
    return res.send(req.user);
    // req.user - userModel added by passport
    // req.session - user id that added by passport when we serialize a user when he logs in
  });

  app.get(paths.api.logout, (req, res) => {
    req.logout(); // function added as a user property by passport, allows to clear cookies from the client-browser
    res.redirect('/');
  });
}


module.exports = {handler: router, url: paths.auth.google, plugAuth};
