const {onProd} = require('../helpers/common');

function checkEnvVars(config) {
  if (!config.GOOGLE_CLIENT_ID || !config.GOOGLE_CLIENT_SECRET) {
    throw new Error(`CLIENT ID AND SECRET SHOULD BE SET!`);
  }
}

const getConfig = () => {
  try {
    return onProd() ? require('./production') : require('./dev');
  } catch (e) {
    if(e.message.includes('Cannot find module')){
      throw Error(`Please create dev.js file, for DEV mode server config;`)
    }
    throw e;
  }
}
checkEnvVars(getConfig());

module.exports = getConfig();