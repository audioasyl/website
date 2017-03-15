const config = {
  facebook: {
    clientID: process.env.AUDIOASYL_FACEBOOK_APP_ID,
    clisntSecret: process.env.AUDIOASYL_FACEBOOK_APP_SECRET,
    callbackURL: process.env.AUDIOASYL_FACEBOOK_CALLBACK_URL || 'http://127.0.0.1:8000',
  },
};

export default config;
