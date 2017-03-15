export default {
  facebook: {
    clientID: process.env.AUDIOASYL_FACEBOOK_CLIENT,
    clisntSecret: process.env.AUDIOASYL_FACEBOOK_SECRET,
    callbackURL: process.env.AUDIOASYL_FACEBOOK_CALLBACK_URL || 'http://127.0.0.1:8000',
  },
};
