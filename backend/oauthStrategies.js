import { Strategy as FacebookStrategy } from 'passport-facebook';
import { createUser, findByProviderId, updateOauthToken } from './models/User';
import config from './config/oauth';

export const facebookStartegy = passport =>
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    callbackURL: config.facebook.callbackURL,
    clientSecret: config.facebook.clientSecret,
    profileFields: ['id', 'emails', 'name', 'photos'],
  }, async (accessToken, refreshToken, profile, done) => {
    let result = await findByProviderId(profile.id);
    let user = result[0];

    if (!user) {
      result = await createUser({ ...profile, accessToken });
      user = result[0];
    } else {
      updateOauthToken(user.id, accessToken);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  }));
