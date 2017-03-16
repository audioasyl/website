const config = {
  facebook: {
    clientID: process.env.AUDIOASYL_FACEBOOK_APP_ID,
    clientSecret: process.env.AUDIOASYL_FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:8000/auth/facebook/callback',
  },
};

export default config;
