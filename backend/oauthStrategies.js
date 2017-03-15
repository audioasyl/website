import FacebookStartegy from 'passport-facebook';
import config from './config/oauth';

export const facebookStartegy = passport =>
  passport.use(new FacebookStartegy({
    clientID: config.facebook.clientID,
    callbackURL: config.facebook.callbackURL,
    clientSecret: config.facebook.clientSecret,
  }), (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, profile);
    return done(null, {});
  });
