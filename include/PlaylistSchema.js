const mongoose = require('mongoose')

const PlaylistSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, 'Playlist Name is required']
  },
  Songs: {
    type: Array,
    required: [true, 'Songs Array is required']
  }
})

module.exports = PlaylistSchema