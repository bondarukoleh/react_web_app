const express = require('express');
const passport = require('passport');
const {addAuthRoutes} = require('./routes');
const {useGoogleAuth} = require('./services');
const {client} = require('./db');

const app = express();

client.connect().then(() => console.log('DB connected'), (e) => console.log(`DB is not connected!!!\n"${e.message}"`));

useGoogleAuth(passport);

// routes
app.get('/', (req, res) => {
  res.send({message: 'Hello buddy!'});
});

addAuthRoutes(app);

function getServer(port = process.env.PORT || 3000) {
  return app.listen(port, () => console.log(`App is listening on port ${port}.`));
}

module.exports = process.env.NODE_ENV === 'test' ? getServer : getServer();