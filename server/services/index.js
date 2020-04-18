const {useGoogleAuth} = require('./passport');
const pluginRoutes = require('./routes');
const serveProdBuild = require('./production');
const {Mailer, templates} = require('./emails')

module.exports = {
  useGoogleAuth,
  pluginRoutes,
  serveProdBuild,
  mail: {Mailer, templates}
};
