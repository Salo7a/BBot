const { play } = require("../include/play");
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const scdl = require("soundcloud-downloader");
const mongoose = require("mongoose");
const PlaylistSchema = require("../include/PlaylistSchema");
const Playlist = mongoose.model("Playlist", PlaylistSchema, "Playlist");
const { findPlaylist, FindOrCreate } = require("../include/PlaylistFunctions");
const { YOUTUBE_API_KEY, SOUNDCLOUD_CLIENT_ID, MONGODB_CONNECTION_STRING } = require("../util/EvobotUtil");
const connector = mongoose.connect(MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = {
  name: "SavedPlaylist",
  cooldown: 60,
  aliases: ["list"],
  description: "Plays audio from a Saved Playlist",
  async execute(message, args) {
    const { channel } = message.member.voice;
    let serverQueue = message.client.queue.get(message.guild.id);
    if (!channel) return message.reply("You need to join a voice channel first!").catch(console.error);
    if (serverQueue && channel !== message.guild.me.voice.channel)
      return message.reply(`You must be in the same channel as ${message.client.user}`).catch(console.error);

    if (!args.length)
      return message
        .reply(`Usage: ${message.client.prefix}playlist Playlist Name`)
        .catch(console.error);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.reply("Cannot connect to voice channel, missing permissions");
    if (!permissions.has("SPEAK"))
      return message.reply("I cannot speak in this voice channel, make sure I have the proper permissions!");

    const search = args.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/;
    const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
    let list = await findPlaylist(args[0]);
    if (!list) return message.reply("Playlist Doesn't Exist").catch(console.error);
    // Start the playlist if playlist url was provided
    let queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true
    };
    if (serverQueue) {
      queueConstruct = serverQueue;
    }
    for (const s of list.Songs) {
      let url = s;

      let songInfo = null;
      let song = null;

      // if (videoPattern.test(url)) {
      //   try {
      //     songInfo = await ytdl.getInfo(url);
      //     song = {
      //       title: songInfo.videoDetails.title,
      //       url: songInfo.videoDetails.video_url,
      //       duration: songInfo.videoDetails.lengthSeconds
      //     };
      //   } catch (error) {
      //     console.error(error);
      //     message.reply(error.message).catch(console.error);
      //   }
      // } else if (scRegex.test(url)) {
      //   try {
      //     const trackInfo = await scdl.getInfo(url, SOUNDCLOUD_CLIENT_ID);
      //     song = {
      //       title: trackInfo.title,
      //       url: trackInfo.permalink_url,
      //       duration: Math.ceil(trackInfo.duration / 1000)
      //     };
      //   } catch (error) {
      //     console.error(error);
      //     message.reply(error.message).catch(console.error);
      //   }
      // } else {
      //    return message.reply(`Incorrect URL ${s}`).catch(console.error);
      // }
      // serverQueue = await message.client.queue.get(message.guild.id);
      // if (serverQueue && serverQueue.songs.length !== 0) {
      //   serverQueue.songs.push(s);
      //   serverQueue.textChannel
      //     .send(`✅ **${s.title}** has been added to the queue`)
      //     .catch(console.error);
      // } else {
      message.channel.send(`✅ **${s.title}** has been added to the queue`).catch(console.error);
      queueConstruct.songs.push(s);
      message.client.queue.set(message.guild.id, queueConstruct);
      // }


    }
    try {
      message.channel.send(`Playlist ${args[0]} Has Been Added To The Queue`).catch(console.error);
      if (!serverQueue) {
        queueConstruct.connection = await channel.join();
        await queueConstruct.connection.voice.setSelfDeaf(true);
        await play(queueConstruct.songs[0], message);
      }
    } catch (error) {
      console.error(error);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      message.channel.send(`Could not join the channel: ${error}`).catch(console.error);
    }
  }
};
