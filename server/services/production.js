const express = require('express');
const path = require('path')
const {onProd} = require('../helpers/common');

function serveProdBuild(app) {
  if (onProd()) {
    const buildPath = path.resolve(process.cwd(), 'client/build')
    const indexHtmlPath = path.join(buildPath, 'index.html')
    // if express get's something he doesn't know - take a look in build directory for that
    app.use(express.static(buildPath))
  
    // if express couldn't find anything from client/build - just serve index.html file
    app.get('*', (req, res) => {
      res.sendFile(indexHtmlPath)
    })
  }
}

module.exports = serveProdBuild;
