const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const LikeSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  date: { type: Date, default: Date.now },
});

LikeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Like', LikeSchema);
