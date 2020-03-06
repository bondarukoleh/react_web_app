const express = require('express');
const router = express.Router();
const urls = require('./routes.urls');

router.get('/', (req, res) => {
  res.send({message: 'Hello buddy!'});
});

module.exports = {handler: router, url: urls.basic};
