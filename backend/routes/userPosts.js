const express = require('express');
const Post = require('../models/Post');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res, next) => {
  const resultsPerPage = 8;
  const page = Number(req.query.page) >= 0 ? Number(req.query.page) : 0;
  const { userId } = req.params;
  try {
    const posts = await Post
      .find({ author: userId })
      .sort({ date: 'descending' })
      .limit(resultsPerPage)
      .skip(resultsPerPage * page)
      .select('author text date')
      .populate('author', 'firstName lastName fullName avatar');
    res.json({
      posts,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
