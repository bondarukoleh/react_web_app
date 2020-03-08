const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const {client} = require('./db');
const {useGoogleAuth, pluginRoutes} = require('./services');
const {COOKIE_KEY} = require('./config');

const app = express();

client.connect().then(() => console.log('DB connected'), (e) => console.log(`DB is not connected!!!\n"${e.message}"`));

// services
// 30 days * 24 hours in day * 60 minutes in hour * 60 seconds in minute * 1000 milliseconds in second = 2592000000
app.use(cookieSession({maxAge: 2592000000, keys: [COOKIE_KEY]}));
useGoogleAuth(passport);
app.use(passport.initialize());
app.use(passport.session());
pluginRoutes(app);
// routes

function getServer(port = process.env.PORT || 3000) {
  return app.listen(port, () => console.log(`App is listening on port ${port}.`));
}

module.exports = process.env.NODE_ENV === 'test' ? getServer : getServer();