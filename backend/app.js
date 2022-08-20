require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: process.env.ORIGIN,
}));

// const mongoose = require('mongoose');

// const mongoDB = process.env.MONGODB_URL;
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Fancybook');
});

app.use((req, res, next) => {
  // 404
  next();
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // error
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

module.exports = app;
