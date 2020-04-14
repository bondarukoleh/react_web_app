const {auth, payment, logout, currentUser} = require('../routes');

module.exports = function (app) {
  app.use(auth.path, auth.handler);
  app.use(payment.path, payment.handler);
  app.use(logout.path, logout.handler);
  app.use(currentUser.path, currentUser.handler);
};