let connectionString;
try {
  const config = require("../config.json");
  connectionString = config.connectionString;
} catch (error) {
  connectionString = process.env.connectionString;
}

const mongoose = require('mongoose')
const PlaylistSchema = require('../include/PlaylistSchema.js')
const Playlist = mongoose.model('Playlist', PlaylistSchema, 'Playlist')
const connector = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true })


function findPlaylist(Name) {
  return Playlist.findOne({ Name });
}

module.exports= {
  findPlaylist,
  async FindOrCreate(Name, Songs) {
    let playlist = await connector.then(async () => {
      return findPlaylist(Name)
    })

    if (!playlist) {
      return new Playlist({
        Name,
        Songs
      }).save()
    }

}

}
