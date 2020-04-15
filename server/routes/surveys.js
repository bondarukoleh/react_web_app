const express = require('express');
const router = express.Router();
const paths = require('./routes.paths');

router.post('/', (req, res) => {
  // const {title, subject, body, recipients} = req.body;

  return res.send(req.user);
});

module.exports = {handler: router, path: paths.surveys};
