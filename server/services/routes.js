const {auth, basic, credit, logout, currentUser, surveys} = require('../routes');

module.exports = function (app) {
  app.use(auth.path, auth.handler);
  app.use(basic.path, basic.handler);
  app.use(credit.path, credit.handler);
  app.use(logout.path, logout.handler);
  app.use(currentUser.path, currentUser.handler);
  app.use(surveys.path, surveys.handler);
};