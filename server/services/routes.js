const {auth, basic, payment, logout, currentUser, surveys} = require('../routes');

module.exports = function (app) {
  app.use(auth.path, auth.handler);
  app.use(basic.path, basic.handler);
  app.use(payment.path, payment.handler);
  app.use(logout.path, logout.handler);
  app.use(currentUser.path, currentUser.handler);
  app.use(surveys.path, surveys.handler);
};