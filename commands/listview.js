const { MessageEmbed } = require("discord.js");
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
  name: "View Playlists",
  cooldown: 3,
  aliases: ["listview"],
  description: "Remove Songs From A Custom Playlist",
  async execute(message, args) {
    const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/;
    const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
    if (args[0]){
      let list = await findPlaylist(args[0]);
      if (!list ) return message.reply("Couldn't Get Playlist").catch(console.error);
      const embed = new MessageEmbed()
        .setTitle(`${list.Name} Playlist`)
        .setThumbnail(message.guild.iconURL())
        .setColor("#F8AA2A")
        .setTimestamp();
      // Start the playlist if playlist url was provided
      for (let i = 0; i < list.Songs.length; i++) {
        console.log(`${args[0]} ${i + 1} - ${list.SongsNames[i]}`)
        embed.addField(`${i+1} - ${list.SongsNames[i]}`, list.SongsDuration[i])
      }
      message.channel.send(embed);
    } else {
      const embed = new MessageEmbed()
        .setTitle(`All Playlists`)
        .setThumbnail(message.guild.iconURL())
        .setColor("#F8AA2A")
        .setTimestamp();
      let lists = await Playlist.find();
      for (let list of lists){
        embed.addField(list.Name, `${list.Songs.length} Songs`)
      }
      message.channel.send(embed);
    }
  }
};
