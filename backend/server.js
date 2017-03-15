import pg from 'pg';
import Koa from 'koa';
import http from 'http';
import send from 'koa-send';
import serve from 'koa-static';
import passport from 'passport';
import convert from 'koa-convert';
import routes from './routes';
import createPool from './config/db';
import { facebookStartegy } from './oauthStrategies';

const pool = createPool(pg);
facebookStartegy(passport);

const port = process.env.PORT || 8000;
const hostname = process.env.HOST || '127.0.0.1';

const app = new Koa();
const appUse = app.use;

app.use = x => appUse.call(app, convert(x)); // convert old middleware

app.use(serve('./dist'));

routes(app, passport);

app.use(async function (ctx, next) {
  return send(ctx, '/index.html')
    .then(() => next());
});

const httpServer = http.createServer(app.callback());
httpServer.listen(port, () => {
  console.info('==> Environment: ', app.env);
  console.info('==> ✅  Server is listening');
  console.info('==> 🌎  Go to http://%s:%s', hostname, port);
});
