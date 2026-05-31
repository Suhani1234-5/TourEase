const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    trim: true,
    maxlength: 2000
  },
  location: {
    type: String,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
