const express = require('express');
const router = express.Router();
const paths = require('./routes.paths');
const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

router.post('/',
  passport.authenticate('local', {failureRedirect: '/login'}), (req, res) => {return res.send(200);}
);

module.exports = {handler: router, path: paths.apiTestUser};
