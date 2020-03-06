const Mongoose = require('./mongoose.client');

const db = {
  client: new Mongoose(),
};

module.exports = db;