const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const PlaylistSchema = require("../include/PlaylistSchema");
const Playlist = mongoose.model("Playlist", PlaylistSchema, "Playlist");
const { findPlaylist } = require("../include/PlaylistFunctions");
const { YOUTUBE_API_KEY, SOUNDCLOUD_CLIENT_ID, MONGODB_CONNECTION_STRING } = require("../util/EvobotUtil");
const connector = mongoose.connect(MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = {
  name: "ViewPlaylists",
  cooldown: 10,
  aliases: ["listview"],
  description: "Explore Saved Playlists",
  async execute(message, args) {
    if (args[0]) {
      let list = await findPlaylist(args[0]);
      if (!list) return message.reply("Couldn't Get Playlist").catch(console.error);
      const embed = new MessageEmbed()
        .setTitle(`${list.Name} Playlist`)
        .setThumbnail(message.guild.iconURL())
        .setColor("#F8AA2A")
        .setTimestamp();
      for (let i = 0; i < list.Songs.length; i++) {
        console.log(`${args[0]} ${i + 1} - ${list.Songs[i].title}`);
        embed.addField(`${i + 1} - ${list.Songs[i].title}`, list.Songs[i].duration);
      }
      message.channel.send(embed);
    } else {
      const embed = new MessageEmbed()
        .setTitle(`All Playlists`)
        .setThumbnail(message.guild.iconURL())
        .setColor("#F8AA2A")
        .setTimestamp();
      let lists = await Playlist.find();
      for (let list of lists) {
        embed.addField(list.Name, `${list.Songs.length} Songs`);
      }
      message.channel.send(embed);
    }
  }
};
