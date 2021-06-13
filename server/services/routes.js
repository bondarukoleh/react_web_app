const {auth, payment, logout, currentUser, surveys, testUser} = require('../routes');

module.exports = function (app) {
  app.use(auth.path, auth.handler);
  app.use(payment.path, payment.handler);
  app.use(logout.path, logout.handler);
  app.use(currentUser.path, currentUser.handler);
  app.use(surveys.path, surveys.handler);
  app.use(testUser.path, testUser.handler);
};
