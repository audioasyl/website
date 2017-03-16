import { Strategy as FacebookStrategy } from 'passport-facebook';
import { createUser, findByProviderId, findById } from './models/User';
import config from './config/oauth';

export const facebookStartegy = passport =>
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    callbackURL: config.facebook.callbackURL,
    clientSecret: config.facebook.clientSecret,
    profileFields: ['id', 'emails', 'name', 'photos'],
  }, async (accessToken, refreshToken, profile, done) => {
    let user = await findByProviderId(profile.id);

    if (!user) {
      const result = await createUser({ ...profile, accessToken });
      user = result && await findById(result.id);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  }));
