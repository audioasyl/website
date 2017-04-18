import morgan from 'morgan';
import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { findById } from './backend/models/User';
import redisStore from './backend/config/redisStore';
import renderOnServer from './backend/serverSideRenderer';
import { facebookStartegy } from './backend/oauthStrategies';
import registerAuthRoutes from './backend/controllers/authController';
import registerFavouriteTagsRoutes from './backend/controllers/likedTagItemsController';

import { hostname, port } from './app/config/api';

const logType = process.env.AUDIOASYL_LOG_TYPE || 'dev';
const sessionSecret = process.env.AUDIOASYL_SESSION_SECRET || 'audioasyl_session';

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  const result = await findById(id);
  done(null, result[0]);
});

const app = express();

app.use(morgan(logType));
app.use(express.static('dist'));
app.use(cookieParser(sessionSecret));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  resave: true,
  secret: sessionSecret,
  saveUninitialized: true,
  store: redisStore(session),
  cookie: { maxAge: 2419200000, httpOnly: true },
}));

facebookStartegy(passport);

app.use(passport.initialize());
app.use(passport.session());

registerAuthRoutes(app, passport);
registerFavouriteTagsRoutes(app);

app.use('*', (req, res) => {
  console.log('qweeeeeeeeqewqeqeqeqe');
  renderOnServer(req, res);
});
// app.use('/', (req, res) => res.sendFile(path.join(process.cwd(), 'index.html')));

app.listen(port, hostname, () => {
  /* eslint-disable */
  console.info('==> ✅  Server is listening');
  console.info('==> 🌎  Go to http://%s:%s', hostname, port);
});
