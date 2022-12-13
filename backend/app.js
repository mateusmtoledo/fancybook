require('dotenv').config();
const express = require('express');
const path = require('path');
require('./services/passportConfig');
const cors = require('cors');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN || 'http://localhost:3000',
  }),
);

require('./database/config/mongoSetup');

const session = require('express-session');

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'sessionsecret',
    resave: false,
    saveUninitialized: true,
  }),
);

const passport = require('passport');
const { isAuthenticated } = require('./middleware/authentication');

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const signUpRouter = require('./routes/signUp');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

app.get('/', (req, res) => {
  res.send('Fancybook');
});
app.use('/sign-up', signUpRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/users', isAuthenticated, usersRouter);
app.use('/posts', isAuthenticated, postsRouter);

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err);
  if (err.statusCode) {
    res
      .status(err.statusCode)
      .json(err.invalidFields || err.friendshipStatus ? err : err.message);
  } else if (err.http_code) {
    res.status(err.http_code).json(err.message);
  } else {
    res.status(500).json('Something went wrong');
  }
  res.status(500);
});

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT ?? 3001;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

module.exports = app;
