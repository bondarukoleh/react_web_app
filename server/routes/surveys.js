const express = require('express');
const router = express.Router();
const paths = require('./routes.paths');

router.get('/', (req, res) => {
  res.send({message: 'This is surveys from API'});
});

module.exports = {handler: router, path: paths.surveys};
