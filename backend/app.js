require('dotenv').config();
const express = require('express');
const path = require('path');
require('./services/passportConfig');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: process.env.ORIGIN,
}));

require('./databaseUtils/config/mongoSetup');

const passport = require('passport');

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const signUpRouter = require('./routes/signUp');
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');

app.use('/sign-up', signUpRouter);
app.use('/login', loginRouter);
app.use('/users', passport.authenticate('jwt', { session: false }), usersRouter);

app.get('/', (req, res) => {
  res.send('Fancybook');
});

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Something went wrong');
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
}

module.exports = app;
