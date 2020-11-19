const { play } = require("../include/play");
const ytdl = require("ytdl-core");
const scdl = require("soundcloud-downloader");
const mongoose = require('mongoose')
const PlaylistSchema = require('../include/PlaylistSchema')
const Playlist = mongoose.model('Playlist', PlaylistSchema, 'Playlist')
const {findPlaylist, FindOrCreate} = require("../include/PlaylistFunctions")
let YOUTUBE_API_KEY, SOUNDCLOUD_CLIENT_ID,connectionString;
try {
  const config = require("../config.json");
  connectionString = config.connectionString;
} catch (error) {
  connectionString = process.env.connectionString;
}
const connector = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true })
module.exports = {
  name: "Remove From Playlist",
  cooldown: 3,
  aliases: ["listremove"],
  description: "Remove Songs From A Custom Playlist",
  async execute(message, args) {
    const { channel } = message.member.voice;
    const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/;
    const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
    let list = await FindOrCreate(args[0]);
    if (!list ) return message.reply("Playlist Doesn't Exist And Couldn't Be Created").catch(console.error);
    // Start the playlist if playlist url was provided
    let num = 0;
    for (let i = 1; i < args.length; i++) {
      if (args[i] <= args.length){
        list.Songs.splice(args[i]+1, 1);
        num++;
      }else {
        message.reply(`No song at index ${args[i]}`)
      }
    }
    await list.save();
    message.reply(`${num} Songs Deleted Successfully From ${args[0]} Playlist`)
  }
};
