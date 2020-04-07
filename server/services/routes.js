const {auth, basic} = require('../routes');

module.exports = function(app) {
  // app.use(auth.url, auth.handler);
  auth.plugAuth(app);
  app.use(basic.path, basic.handler);
};