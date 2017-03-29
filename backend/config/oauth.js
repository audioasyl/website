const config = {
  facebook: {
    clientID: process.env.AUDIOASYL_FACEBOOK_APP_ID,
    clientSecret: process.env.AUDIOASYL_FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.AUDIOASYL_FACEBOOK_CALLBACK}/auth/facebook/callback`,
  },
};

export default config;
