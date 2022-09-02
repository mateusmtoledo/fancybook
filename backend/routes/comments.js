const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

const router = express.Router({ mergeParams: true });

router.get('/', (req, res, next) => {
  const { postId } = req.params;
  Post.findById(postId, (err, post) => {
    if (err) {
      next(err);
      return;
    }
    const usersAreFriends = req.user.friendList
      .some((friendship) => friendship.status === 'friends'
        && friendship.user.equals(post.author._id));
    if (!usersAreFriends) {
      res.status(401).send('Unauthorized');
      return;
    }
    Comment.find({ post: postId }, (err, comments) => {
      if (err) {
        next(err);
        return;
      }
      res.json({ comments });
    });
  });
});

module.exports = router;
