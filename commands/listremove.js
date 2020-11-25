const { play } = require("../include/play");
const ytdl = require("ytdl-core");
const scdl = require("soundcloud-downloader");
const mongoose = require("mongoose");
const PlaylistSchema = require("../include/PlaylistSchema");
const Playlist = mongoose.model("Playlist", PlaylistSchema, "Playlist");
const { findPlaylist, FindOrCreate } = require("../include/PlaylistFunctions");
const { YOUTUBE_API_KEY, SOUNDCLOUD_CLIENT_ID, MONGODB_CONNECTION_STRING } = require("../util/EvobotUtil");
const connector = mongoose.connect(MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = {
  name: "Remove From Playlist",
  cooldown: 3,
  aliases: ["listremove"],
  description: "Remove Songs From A Custom Playlist",
  async execute(message, args) {
    const { channel } = message.member.voice;
    const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/;
    const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
    let list = await findPlaylist(args[0]);
    if (!list) return message.reply("The Playlist Doesn't Exist").catch(console.error);
    // Start the playlist if playlist url was provided
    let num = 0;
    for (let i = 1; i < args.length; i++) {
      if (args[i] <= args.length) {
        list.Songs.splice(args[i] + 1, 1);
        // list.SongsNames.splice(args[i]+1, 1);
        // list.SongsDuration.splice(args[i]+1, 1);
        num++;
      } else {
        message.reply(`No song at index ${args[i]}`);
      }
    }
    await list.save();
    message.reply(`${num} Songs Deleted Successfully From ${args[0]} Playlist`);
  }
};
