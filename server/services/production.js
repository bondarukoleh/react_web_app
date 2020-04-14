const express = require('express');
const path = require('path')
const {onProd} = require('../helpers/common');

function serveProdBuild(app) {
  if (onProd()) {
    const indexHtmlPath = path.resolve(process.cwd(), 'client/build/index.html')
    // if express get's request to some asset - take a look in build directory for that
    app.use(express.static('../../client/build'))

    // if express get's something he doesn't know - just serve index.html
    app.get('*', (req, res) => {
      res.sendFile(indexHtmlPath)
    })
  }
}

module.exports = serveProdBuild;
