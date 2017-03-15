import router from 'koa-router';

export default function (app, passport) {
  app.use(router(app));
  app.get('/auth/facebook', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/',
  }));
}
