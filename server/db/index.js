const Mongoose = require('./mongoose.client');

const db = {
  client: new Mongoose(),
  models: require('./models'),
};

module.exports = db;