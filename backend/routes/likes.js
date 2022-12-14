const express = require("express");
const Like = require("../models/Like");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res, next) => {
  const { postId } = req.params;
  const paginateOptions = {
    limit: 10,
    page: Number(req.query.page) >= 1 ? Number(req.query.page) : 1,
    sort: { date: "descending" },
    select: "author",
    populate: {
      path: "author",
      select: "firstName lastName fullName avatar",
    },
  };
  try {
    const [userHasLiked, likes] = await Promise.all([
      await Like.exists({ post: postId, author: req.user._id }),
      await Like.paginate({ post: postId }, paginateOptions),
    ]);
    res.json({
      userHasLiked: !!userHasLiked,
      likes: likes.docs,
      count: likes.totalDocs,
      hasNextPage: likes.hasNextPage,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { postId } = req.params;
  try {
    const userHasLiked = await Like.exists({
      post: postId,
      author: req.user._id,
    });
    if (userHasLiked) {
      res.json("User has already liked this post");
      return;
    }
    const like = await new Like({
      author: req.user._id,
      post: postId,
    }).save();
    await like.populate("author", "firstName lastName fullName avatar");
    res.json({
      like,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/", async (req, res, next) => {
  const { postId } = req.params;
  try {
    const deleted = await Like.findOneAndDelete({
      post: postId,
      author: req.user._id,
    });
    if (!deleted) {
      res.json("User has not liked this post");
      return;
    }
    res.json(deleted);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
