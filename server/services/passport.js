const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = require('../config');

function useGoogleAuth(passportLib) {
  passportLib.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(`We've got a accessToken for user ${accessToken}`);
      console.log(`We've got a refreshToken for user ${refreshToken}`);
      console.log(`We've got a profile for user:`);
      console.log(profile);
      done();
    }
  ));
}

module.exports = {useGoogleAuth};
