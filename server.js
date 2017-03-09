const Koa     = require('koa'),
      http    = require('http'),
      send    = require('koa-send'),
      serve   = require('koa-static'),
      convert = require('koa-convert');


const port = process.env.AUDIOASYL_PORT || 8000;
const hostname = process.env.AUDIOASYL_HOST || '127.0.0.1';

const app = new Koa();
const appUse = app.use;
app.use = x => appUse.call(app, convert(x)); // convert old middleware

app.use(serve('./dist'));

app.use(async (ctx, next) =>
  send(ctx, '/index.html')
    .then(() => next())
);

const httpServer = http.createServer(app.callback());
httpServer.listen(port, () => {
  console.info('==> Environment: ', app.env);
  console.info('==> ✅  Server is listening');
  console.info('==> 🌎  Go to http://%s:%s', hostname, port);
});
