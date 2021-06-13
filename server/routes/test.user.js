const express = require('express');
const router = express.Router();
const paths = require('./routes.paths');
const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

router.post('/',
  passport.authenticate('local', { successRedirect: '/Surveys',
    failureRedirect: '/login'})
);

module.exports = {handler: router, path: paths.apiTestUser};
