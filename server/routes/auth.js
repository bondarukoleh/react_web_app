const passport = require('passport');

function addAuthRoutes(app) {
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback', passport.authenticate('google'));
}

module.exports = {addAuthRoutes};
