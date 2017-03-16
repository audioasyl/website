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

passport.deserializeUser((id, done) => {
  const user = findById(id);
  done(null, { user });
});

const app = express();

app.use(express.static('dist'));
app.use(cookieParser('audioasyl_session'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'audioasyl_session',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 2419200000, httpOnly: true },
}));

facebookStartegy(passport);

app.use(passport.initialize());
app.use(passport.session());

registerAuthRoutes(app, passport);


app.use((req, res) => {
  console.log(req.isAuthenticated(), req.user);
  return res.sendFile(`${__dirname}/index.html`)
});

app.listen(port, hostname, () => {
  console.info('==> ✅  Server is listening');
  console.info('==> 🌎  Go to http://%s:%s', hostname, port);
});
