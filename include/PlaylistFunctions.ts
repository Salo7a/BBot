let MONGODB_CONNECTION_STRING;
try {
  const config = require("../config.json");
  MONGODB_CONNECTION_STRING = config.MONGODB_CONNECTION_STRING;
} catch (error) {
  MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
}

const {PlaylistSchema, mongoose} = require("../include/PlaylistSchema");
const Playlist = mongoose.model("Playlist", PlaylistSchema, "Playlist");
const connector = mongoose.connect(MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });


function findPlaylist(Name: any) {
  return Playlist.findOne({ Name });
}

module.exports = {
  findPlaylist,
  async FindOrCreate(Name: any, Songs: any) {
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
