const express = require('express');
const Like = require('../models/Like');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res, next) => {
  const { postId } = req.params;
  const resultsPerPage = 8;
  const page = Number(req.query.page) >= 0 ? Number(req.query.page) : 0;
  const authorSelection = 'firstName lastName fullName avatar';
  try {
    const [
      likeCount,
      userHasLiked,
      likes,
    ] = await Promise.all([
      await Like.countDocuments({ post: postId }),
      await Like
        .exists({ post: postId, author: req.user._id }),
      await Like
        .find({ post: postId })
        .sort({ date: 'descending' })
        .limit(resultsPerPage)
        .skip(resultsPerPage * page)
        .select('author date')
        .populate('author', authorSelection),
    ]);
    res.json({
      likes: likes.map((like) => like.author),
      count: likeCount,
      userHasLiked,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const { postId } = req.params;
  try {
    const userHasLiked = await Like
      .exists({ post: postId, author: req.user._id });
    if (userHasLiked) {
      const err = new Error('User has already liked this post');
      err.statusCode = 400;
      throw err;
    }
    const like = await new Like({
      author: req.user._id,
      post: postId,
    }).save();
    res.json({
      like,
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/', async (req, res, next) => {
  const { postId } = req.params;
  try {
    const deleted = await Like
      .findOneAndDelete({ post: postId, author: req.user._id });
    if (!deleted) {
      const err = new Error('User has not liked post');
      err.statusCode = 400;
      throw err;
    }
    res.json(deleted);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
