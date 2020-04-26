const mongooseClient = require('mongoose');
const {DB_USER: user, DB_PASS: password, DB_NAME: name, DB_HOST: host} = require('../config');
const defaultOption = {retryWrites: true, w: 'majority', useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false};

const getDbUrl = () => `mongodb+srv://${user}:${password}@${host}`;

class Mongoose {
  constructor({dbUrl = getDbUrl(), options = defaultOption} = {}) {
    this.mongoose = mongooseClient;
    this.dbUrl = dbUrl;
    this.options = options;
    this.connection = null;
    this.connectionUrl = null;
  }

  async connect(database = name) {
    try {
      this.connectionUrl = `${this.dbUrl}/${database}`;
      console.log(`Connecting to: ${this.connectionUrl}, with options: %j`, this.options);
      this.connection = await this.mongoose.connect(this.connectionUrl, this.options);
      console.log(`DB connected: ${this.dbUrl}`);
    } catch (e) {
      console.log(`Fail to connect to DB: ${e.message}`);
      throw new Error(`Error while connecting to DB: "${e.message}"`);
    }
    return this.connection;
  }

  async disconnect() {
    try {
      console.log(`Disconnecting from: ${this.dbUrl}, with options: %j`, this.options);
      await this.connection.connection.close();
      console.log(`BD disconnected: ${this.dbUrl}`);
    } catch (e) {
      console.log(`Fail to disconnect to DB: ${e.message}`);
      throw new Error(`Error while connecting to DB: "${e.message}"`);
    }
  }
}

module.exports = Mongoose;
