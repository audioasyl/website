export default function (app, passport) {
  app.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['email', 'public_profile', 'user_about_me', 'user_birthday', 'user_actions.music', 'user_events'],
    })
  );

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/', session: true }),
    (req, res, next) => {
      req.login(req.user, err => {
        if (err) { return next(err); }
        return res.redirect('/');
      });
    }
  );

  app.delete('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    req.session.destroy(() => {
      res.clearCookie('connect.sid', { path: '/' });
      res.status(200).json({ mesg: 'Logged Out' });
    });
  });

  app.get('/auth_token', (req, res) => {
    if (req.isAuthenticated()) {
      res.status(200)
        .json({ token: req.user.token });
    } else {
      res.status(401).json({ mesg: 'Unauthorized !!!' });
    }
  });
}

export function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ mesg: 'Unauthorized !!!' });
}
