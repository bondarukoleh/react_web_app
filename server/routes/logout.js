const express = require('express');
const router = express.Router();
const paths = require('./routes.paths');

router.get('/', (req, res) => {
  req.logout(); // function added as a user property by passport, allows to clear cookies from the client-browser
  res.redirect('/');
});

module.exports = {handler: router, path: paths.apiLogout};
