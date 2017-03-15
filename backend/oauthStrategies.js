const FacebookStartegy = require('passport-facebook');
const config = require('./config/oauth');
const passport = require('passport');


export const facebookStartegy = () =>
  passport.use(new FacebookStartegy({
    clientID: config.facebook.clientID,
    callbackURL: config.facebook.callbackURL,
    clientSecret: config.facebook.clientSecret,
  }), (accessToken, refreshToken, profile, done) => {});
