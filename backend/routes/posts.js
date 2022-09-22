const express = require('express');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');

const router = express.Router();

const commentsRouter = require('./comments');
const likesRouter = require('./likes');

router.use('/:postId/comments', commentsRouter);
router.use('/:postId/likes', likesRouter);

router.get('/', async (req, res, next) => {
  const paginateOptions = {
    limit: 8,
    page: Number(req.query.page) >= 1 ? Number(req.query.page) : 1,
    sort: { date: 'descending' },
    select: 'author text date',
    populate: {
      path: 'author',
      select: 'firstName lastName fullName avatar',
    },
  };
  const friendsIds = req.user.friendList
    .filter((friendship) => friendship.status === 'friends')
    .map((friendship) => friendship.user);
  try {
    const posts = await Post
      .paginate({
        author: { $in: [...friendsIds, req.user._id] },
      }, paginateOptions);
    res.json({
      posts: posts.docs,
      hasNextPage: posts.hasNextPage,
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
      await post.populate('author', 'firstName lastName fullName avatar');
      res.json({
        post,
      });
    } catch (err) {
      next(err);
    }
  },
]);

module.exports = router;
