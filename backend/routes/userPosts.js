const express = require('express');
const Post = require('../models/Post');

const router = express.Router({ mergeParams: true });

router.get('/', (req, res, next) => {
  const resultsPerPage = 8;
  const page = Number(req.query.page) >= 0 ? Number(req.query.page) : 0;
  const { userId } = req.params;

  Post.find({ author: userId })
    .sort({ date: 'descending' })
    .limit(resultsPerPage)
    .skip(resultsPerPage * page)
    .exec((err, posts) => {
      if (err) {
        next(err);
        return;
      }
      res.json({ posts });
    });
});

module.exports = router;
