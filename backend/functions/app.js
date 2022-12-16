require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
require('../services/passportConfig');
const cors = require('cors');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN || 'http://localhost:3000',
  }),
);

require('../database/config/mongoSetup');

const session = require('express-session');
const MongoStore = require('connect-mongo');

const store =
  process.env.NODE_ENV === 'test'
    ? undefined
    : MongoStore.create({
        mongoUrl: process.env.MONGODB_URL,
      });

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'sessionsecret',
    resave: false,
    saveUninitialized: true,
    store,
  }),
);

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const apiRoutes = require('../routes/apiRoutes');

app.use(process.env.NODE_ENV === 'test' ? '/' : '/api', apiRoutes);

app.use(express.static(path.join(__dirname, '../frontend', 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
});

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT ?? 3001;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

module.exports.app = app;
module.exports.handler = serverless(app);
