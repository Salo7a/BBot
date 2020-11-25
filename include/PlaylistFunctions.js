let MONGODB_CONNECTION_STRING;
try {
  const config = require("../config.json");
  MONGODB_CONNECTION_STRING = config.MONGODB_CONNECTION_STRING;
} catch (error) {
  MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
}

const mongoose = require("mongoose");
const PlaylistSchema = require("../include/PlaylistSchema.js");
const Playlist = mongoose.model("Playlist", PlaylistSchema, "Playlist");
const connector = mongoose.connect(MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });


function findPlaylist(Name) {
  return Playlist.findOne({ Name });
}

module.exports = {
  findPlaylist,
  async FindOrCreate(Name, Songs) {
    let playlist = await connector.then(async () => {
      return findPlaylist(Name);
    });

    if (!playlist) {
      return new Playlist({
        Name,
        Songs
      }).save();
    }

  }

};
