const express = require('express');

const app = express();

require('./databaseUtils/config/jestDbConfig');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

module.exports = app;
