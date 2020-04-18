const {onProd} = require('../helpers/common');

function checkEnvVars(config) {
  if (!config.GOOGLE_CLIENT_ID || !config.GOOGLE_CLIENT_SECRET) {
    throw new Error(`CLIENT ID AND SECRET SHOULD BE SET!`);
  }
}

const config = onProd() ? require('./production') : require('./dev');
checkEnvVars(config);

module.exports = config;