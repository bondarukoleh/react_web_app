const express = require('express');
const router = express.Router();
const passport = require('passport');
const urls = require('./routes.urls');

function plugAuth(app) {
  app.get('/auth/google/', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback', passport.authenticate('google'));
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
