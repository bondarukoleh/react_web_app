const express = require('express');
const router = express.Router();
const paths = require('./routes.paths');

router.get('/', (req, res) => {
  return res.send(req.user);
  // req.user - userModel added by passport
  // req.session - user id that added by passport when we serialize a user when he logs in
});

module.exports = {handler: router, path: paths.apiCurrentUser};
