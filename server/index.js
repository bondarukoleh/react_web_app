const express = require('express');

const app = express();

app.get('/', (req, res) => {
  console.log('Got a get request.');
  res.send({message: 'Hello buddy!'})
});

function getServer(port = process.env.PORT || 3000) {
  return app.listen(port, () => console.log(`App is listening on port ${port}.`));
}

module.exports = process.env.NODE_ENV === 'test' ? getServer : getServer();