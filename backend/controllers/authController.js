export default function (app, passport) {
  app.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['email', 'public_profile', 'user_about_me', 'user_birthday', 'user_actions.music', 'user_events'],
    })
  );

  app.get('/auth/facebook/callback', (req, res, next) => {
    passport.authenticate('facebook', (err, user) => {
      if (err) { return next(err); }

      if (!user) { return res.redirect('/'); }

      req.logIn(user, erro => {
        if (erro) { return next(erro); }
        return res.redirect('/');
      });
    })(req, res, next);
  });

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
