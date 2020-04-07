const express = require('express');
const router = express.Router();
const paths = require('./routes.paths');

router.get(paths.basic, (req, res) => {
  res.send({message: 'Hello buddy!'});
});

module.exports = {handler: router, path: paths.basic};
