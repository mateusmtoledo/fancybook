const express = require('express');

const router = express.Router();

router.post('/', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
      return;
    }
    res.json('Succesfully signed out');
  });
});

module.exports = router;
