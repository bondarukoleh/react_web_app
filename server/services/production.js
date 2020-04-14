const express = require('express');
const path = require('path')
const {onProd} = require('../helpers/common');

function serveProdBuild(app) {
  if (onProd()) {
    const indexHtmlPath = path.resolve(process.cwd(), 'client/build/index.html')
    // if express get's something he doesn't know - take a look in build directory for that
    app.use(express.static('../../client/build'))

    // if express couldn't find anything from client/build - just serve index.html file
    app.get('*', (req, res) => {
      res.sendFile(indexHtmlPath)
    })
  }
}

module.exports = serveProdBuild;
