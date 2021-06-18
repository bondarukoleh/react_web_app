const {useGoogleAuth, useLocalStrategy} = require('./passport');
const pluginRoutes = require('./routes');
const serveProdBuild = require('./production');

module.exports = {
  useGoogleAuth,
  useLocalStrategy,
  pluginRoutes,
  serveProdBuild,
};
