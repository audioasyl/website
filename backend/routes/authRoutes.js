export default function (app, passport) {
  app.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['email', 'public_profile', 'user_about_me', 'user_birthday', 'user_actions.music', 'user_events'],
    })
  );

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/', session: true }),
    (req, res) => {
      res.setHeader('Authorization', `Token=${req.user.token}`);
      return res.redirect('/');
    }
  );

  app.delete('/logout', (req, res) => {
    req.logOut();
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  });
}
