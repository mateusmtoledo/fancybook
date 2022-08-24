const express = require('express');
require('./services/passportConfig');

const app = express();

require('./databaseUtils/config/jestDbConfig');

const passport = require('passport');

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

module.exports = app;
