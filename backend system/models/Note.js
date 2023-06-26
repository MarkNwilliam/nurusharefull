const mongoose = require('mongoose');
const shortid = require('shortid');

const NoteSchema = mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  title: {
    type: String,
    required: true
  },
  uploader: {
    type: String,
    //required: true
  },
  topic: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fileURL: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: false,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Note', NoteSchema);
