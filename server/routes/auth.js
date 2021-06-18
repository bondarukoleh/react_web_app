const express = require('express');
const router = express.Router();
const passport = require('passport');
const paths = require('./routes.paths');

router.get('/', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/surveys')
});

module.exports = {handler: router, path: paths.authGoogle};
