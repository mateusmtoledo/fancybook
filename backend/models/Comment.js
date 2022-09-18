const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  text: {
    type: String, required: true, minLength: 3, maxLength: 2048,
  },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
});

module.exports = mongoose.model('Comment', CommentSchema);
