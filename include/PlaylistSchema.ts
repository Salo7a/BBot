import mongoose from 'mongoose';
const { Schema } = mongoose;

const PlaylistSchema = new Schema({
  Name: {
    type: String,
    required: [true, "Playlist Name is required"]
  },
  Songs: {
    type: Array,
    required: [true, "Songs Array is required"]
  },
  SongsNames: {
    type: Array,
    required: [true, "Songs Names Array is required"]
  },
  SongsDuration: {
    type: Array,
    required: [true, "Songs Names Array is required"]
  }
});

export {PlaylistSchema, mongoose};