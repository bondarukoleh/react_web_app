const {NODE_ENV} = process.env;

const onProdRegExp = /^prod/i;
const config = onProdRegExp.test(NODE_ENV) ? require('./production') : require('./dev');

function checkEnvVars(config) {
  if (!config.GOOGLE_CLIENT_ID || !config.GOOGLE_CLIENT_SECRET) {
    throw new Error(`CLIENT ID AND SECRET SHOULD BE SET!`);
  }
}

checkEnvVars(config);

module.exports = config;