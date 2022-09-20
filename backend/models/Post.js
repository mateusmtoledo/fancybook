const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const PostSchema = new Schema({
  text: {
    type: String, required: true, minLength: 3, maxLength: 2048,
  },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
});

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', PostSchema);
