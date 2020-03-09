const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = require('../config');
const mongoose = require('mongoose');
// in models module we defined a Model for users. Now we are getting it.
const UserModel = mongoose.model('users');



function useGoogleAuth(passportLib) {
  passportLib.serializeUser((userModel, done) => {
    // TODO: not very secure to pass id from DB, re-write further
    console.log('GOT IN SERILLLL');
    console.log(userModel);
    done(null, userModel.id) // after that user id is added as to req.session and encrypted by cookieSession with key
  });

  passportLib.deserializeUser((usersID, done) => {
    UserModel.findById(usersID).then(user => done(null, user), err => done(err)) // after that userModel added to req.user
  });

  passportLib.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback' // we can provide a full url here "https://herokuapp" or "http://localhost",
      // proxy: true // or set that we trust any proxy between our server and client
    },
    function (accessToken, refreshToken, profile, done) {
      UserModel.findOne({googleID: profile.id}).then((user) => {
        if (!user) {
          console.log(`Creating a ${profile.displayName} user`);
          new UserModel({googleID: profile.id, name: profile.displayName}).save().then((createdUser) => {
            console.log('User created');
            done(null, createdUser); // at this point serializeUser function called with createdUser
          }, done);
        } else {
          console.log('We found corresponding User');
          console.log(user);
          done(null, user); // at this point serializeUser function called with createdUser
        }
      }, (err) => {
        console.log(`Couldn't find User!`);
        done(`Ow, we're sorry, something goes wrong ${err.message}. Please give us a call if you have time.`)
      });
    }
  ));
}

module.exports = {useGoogleAuth};
