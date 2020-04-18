const {useGoogleAuth} = require('./passport');
const pluginRoutes = require('./routes');
const serveProdBuild = require('./production');

module.exports = {
  useGoogleAuth,
  pluginRoutes,
  serveProdBuild,
};
