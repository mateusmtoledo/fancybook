const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  text: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Post', PostSchema);
