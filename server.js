import morgan from 'morgan';
import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { findById } from './backend/models/User';
import { facebookStartegy } from './backend/oauthStrategies';
import registerAuthRoutes from './backend/routes/authRoutes';

const port = process.env.PORT || 8000;
const hostname = process.env.HOST || 'localhost';

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  const user = await findById(id);
  console.log(user);
  done(null, { user });
});

const app = express();

app.use(express.static('dist'));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'audioasyl_session',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 2419200000, httpOnly: false },
}));

facebookStartegy(passport);

app.use(passport.initialize());
app.use(passport.session());

registerAuthRoutes(app, passport);

app.use((req, res, next) => {
  console.log(req.user);
  // console.log(res);
  next();
});

app.use((req, res) => res.sendFile(`${__dirname}/index.html`));

app.listen(port, hostname, () => {
  console.info('==> ✅  Server is listening');
  console.info('==> 🌎  Go to http://%s:%s', hostname, port);
});
