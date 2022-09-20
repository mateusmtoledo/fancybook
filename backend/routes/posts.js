const express = require('express');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');

const router = express.Router();

const commentsRouter = require('./comments');
const likesRouter = require('./likes');

router.use('/:postId/comments', commentsRouter);
router.use('/:postId/likes', likesRouter);

router.get('/', async (req, res, next) => {
  const resultsPerPage = 8;
  const page = Number(req.query.page) >= 0 ? Number(req.query.page) : 0;
  const friendsIds = req.user.friendList
    .filter((friendship) => friendship.status === 'friends')
    .map((friendship) => friendship.user);
  try {
    const posts = await Post
      .find({ author: { $in: [...friendsIds, req.user._id] } })
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

router.post('/', [
  body('text', 'Text is required').trim().isLength({ min: 3 }).escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // TODO handle validation errors properly
      next(errors.array());
      return;
    }
    try {
      const post = await new Post({
        author: req.user._id,
        text: req.body.text,
      }).save();
      res.json({
        post,
      });
    } catch (err) {
      next(err);
    }
  },
]);

module.exports = router;
