const express = require('express');
const Post = require('../models/Post');
const Like = require('../models/Like');

const router = express.Router({ mergeParams: true });

router.get('/', (req, res, next) => {
  const { postId } = req.params;
  const resultsPerPage = 8;
  const page = Number(req.query.page) >= 0 ? Number(req.query.page) : 0;
  const authorSelection = 'firstName lastName fullName avatar';
  Post.findById(postId).exec((err, post) => {
    if (!req
      .user
      .friendList
      .some((friendship) => friendship.status === 'friends'
          && friendship.user.equals(post.author))
    ) {
      res.status(401).json(new Error('Unauthorized'));
      return;
    }
    Like
      .find({ post: postId })
      .sort({ date: 'descending' })
      .limit(resultsPerPage)
      .skip(resultsPerPage * page)
      .select('author date')
      .populate('author', authorSelection)
      .exec((err, likes) => {
        if (err) {
          next(err);
          return;
        }
        res.json({
          likes,
        });
      });
  });
});

router.post('/', (req, res, next) => {
  const { postId } = req.params;
  Post.findById(postId).exec((err, post) => {
    if (!req
      .user
      .friendList
      .some((friendship) => friendship.status === 'friends'
          && friendship.user.equals(post.author))
    ) {
      res.status(401).json(new Error('Unauthorized'));
      return;
    }
    Like
      .findOne({ post: postId, author: req.user._id })
      .exec((err, like) => {
        if (err) {
          next(err);
          return;
        }
        if (like) {
          res.status(400).json(new Error('User has already liked this post'));
          return;
        }
        new Like({
          author: req.user._id,
          post: postId,
        }).save((err, like) => {
          if (err) {
            next(err);
            return;
          }
          res.json({
            like,
          });
        });
      });
  });
  // Post.findById(postId).exec((err, post) => {
  //   if (err) {
  //     next(err);
  //     return;
  //   }
  //   if (!req
  //     .user
  //     .friendList
  //     .some((friendship) => friendship.status === 'friends'
  //     && friendship.user.equals(post.author))
  //   ) {
  //     res.status(401).json(new Error('Unauthorized'));
  //     return;
  //   }
  //   if (post.likes.some((user) => user.equals(req.user._id))) {
  //     res.status(400).json(new Error('User has already liked post'));
  //     return;
  //   }
  //   post.likes.push(req.user._id);
  //   post.save((err, savedPost) => {
  //     if (err) {
  //       next(err);
  //       return;
  //     }
  //     const selection = 'firstName lastName fullName avatar';
  //     savedPost.populate('likes', selection, (err, populatedPost) => {
  //       res.json({
  //         likes: populatedPost.likes,
  //       });
  //     });
  //   });
  // });
});

module.exports = router;
