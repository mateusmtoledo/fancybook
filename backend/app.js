require('dotenv').config();
const express = require('express');
const path = require('path');
require('./services/passportConfig');
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
  }),
);

require('./database/config/mongoSetup');

const session = require('express-session');

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   setTimeout(() => {
//     next();
//   }, 3000);
// });

const signUpRouter = require('./routes/signUp');
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

app.use('/sign-up', signUpRouter);
app.use('/login', loginRouter);
app.use(
  '/users',
  passport.authenticate('jwt', { session: false }),
  usersRouter,
);
app.use(
  '/posts',
  passport.authenticate('jwt', { session: false }),
  postsRouter,
);

app.get('/', (req, res) => {
  res.send('Fancybook');
});

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err);
  if (err.statusCode) {
    res.status(err.statusCode).json((err.invalidFields && err) || err.message);
  } else if (err.http_code) {
    res.status(err.http_code).json(err.message);
  } else {
    res.status(500).json('Something went wrong');
  }
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
}

module.exports = app;
