const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const {client} = require('./db');
const {useGoogleAuth, pluginRoutes, serveProdBuild, useLocalStrategy} = require('./services');
const {COOKIE_KEY} = require('./config');

const app = express();

client.connect().then(() => console.log('DB connected'), (e) => console.log(`DB is not connected!!!\n"${e.message}"`));

// services
// 30 days * 24 hours in day * 60 minutes in hour * 60 seconds in minute * 1000 milliseconds in second = 2592000000
app.use(cookieSession({maxAge: 2592000000, keys: [COOKIE_KEY]}));
useGoogleAuth(passport);
useLocalStrategy(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
pluginRoutes(app);

// serve frontend on production
serveProdBuild(app);

function getServer(port = process.env.PORT || 8080) {
  return app.listen(port, () => console.log(`App is listening on port ${port}.`));
}

module.exports = process.env.NODE_ENV === 'test' ? getServer : getServer();
