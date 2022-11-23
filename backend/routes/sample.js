const express = require('express');
const insertSampleUser = require('../database/utils/insertSampleUser');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const newSampleUser = await insertSampleUser();
  req.body.email = newSampleUser.email;
  req.body.password = newSampleUser.username;
  next();
});

module.exports = router;
