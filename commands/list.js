const { play } = require("../include/play");
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const scdl = require("soundcloud-downloader");

let YOUTUBE_API_KEY, SOUNDCLOUD_CLIENT_ID;
try {
  const config = require("../config.json");
  YOUTUBE_API_KEY = config.YOUTUBE_API_KEY;
  SOUNDCLOUD_CLIENT_ID = config.SOUNDCLOUD_CLIENT_ID;
} catch (error) {
  YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  SOUNDCLOUD_CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;
}
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);
let list = {
  "Spacetoon": ["https://soundcloud.com/3lamona/hunter","https://www.youtube.com/watch?v=aVps7M4DH4s", "https://www.youtube.com/watch?v=0fKox9_pGK8"]
}
module.exports = {
  name: "SavedPlaylist",
  cooldown: 3,
  aliases: ["list"],
  description: "Plays audio from a Saved Playlist",
  async execute(message, args) {
    const { channel } = message.member.voice;

    const serverQueue = message.client.queue.get(message.guild.id);
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
    const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;


    if (!list.hasOwnProperty(args[0]) ) return message.reply("Playlist Doesn't Exist").catch(console.error);
    // Start the playlist if playlist url was provided
    for (let s in list["Spacetoon"]){
      const url = s;
      const urlValid = videoPattern.test(s);
      const queueConstruct = {
        textChannel: message.channel,
        channel,
        connection: null,
        songs: [],
        loop: false,
        volume: 100,
        playing: true
      };

      let songInfo = null;
      let song = null;

      if (urlValid) {
        try {
          songInfo = await ytdl.getInfo(url);
          song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
            duration: songInfo.videoDetails.lengthSeconds
          };
        } catch (error) {
          console.error(error);
          return message.reply(error.message).catch(console.error);
        }
      } else if (scRegex.test(url)) {
        try {
          const trackInfo = await scdl.getInfo(url, SOUNDCLOUD_CLIENT_ID);
          song = {
            title: trackInfo.title,
            url: trackInfo.permalink_url,
            duration: Math.ceil(trackInfo.duration / 1000)
          };
        } catch (error) {
          console.error(error);
          return message.reply(error.message).catch(console.error);
        }
      } else {
        return message.reply(`Incorrect URL ${s}`).catch(console.error);
      }

      if (serverQueue) {
        serverQueue.songs.push(song);
        return serverQueue.textChannel
          .send(`✅ **${song.title}** has been added to the queue by ${message.author}`)
          .catch(console.error);
      }

      queueConstruct.songs.push(song);
      message.client.queue.set(message.guild.id, queueConstruct);

      try {
        queueConstruct.connection = await channel.join();
        await queueConstruct.connection.voice.setSelfDeaf(true);
        play(queueConstruct.songs[0], message);
      } catch (error) {
        console.error(error);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send(`Could not join the channel: ${error}`).catch(console.error);
      }
    }

  }
};
