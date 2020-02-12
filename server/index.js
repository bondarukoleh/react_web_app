const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = require('./config');

const app = express();

// draft
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(`We've got a accessToken for user ${accessToken}`);
    console.log(`We've got a refreshToken for user ${refreshToken}`);
    console.log(`We've got a profile for user ${profile}`);
    console.log(`We've got a cb for user ${cb}`);
    return cb();
  }
));

app.get('/', (req, res) => {
  res.send({message: 'Hello buddy!'})
});

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback', (req, res) => {
  console.log(`Got a callback from google with parameters ${req.params}`);
  res.send(`Got ${req.params} from google.`);
  /*passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }*/
});

function getServer(port = process.env.PORT || 3000) {
  return app.listen(port, () => console.log(`App is listening on port ${port}.`));
}

module.exports = process.env.NODE_ENV === 'test' ? getServer : getServer();