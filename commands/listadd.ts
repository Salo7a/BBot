import { Message } from "discord.js";

const ytdl = require("ytdl-core");
const scdl = require("soundcloud-downloader").default;
const { findPlaylist } = require("../include/PlaylistFunctions");

module.exports = {
  name: "Add To Playlist",
  cooldown: 10,
  aliases: ["listadd"],
  description: "Adds Songs To A Custom Playlist",
  async execute(message: Message, args: string[]) {
    const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/;
    const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
    let list = await findPlaylist(args[0]);
    if (!list) {
      try {
        list = await new Playlist({
          Name: args[0],
          Songs: []
        });
      } catch (error) {
        console.error(error);
        return message.reply("Playlist Doesn't Exist And Couldn't Be Created").catch(console.error);
      }
    }

    // Start the playlist if playlist url was provided
    let num = 0;
    for (let i = 1; i < args.length; i++) {
      if (videoPattern.test(args[i]) || scRegex.test(args[i])) {
        let songInfo = null;
        let song = null;
        if (videoPattern.test(args[i])) {
          try {
            songInfo = await ytdl.getInfo(args[i]);
            song = {
              title: songInfo.videoDetails.title,
              url: songInfo.videoDetails.video_url,
              duration: songInfo.videoDetails.lengthSeconds
            };
          } catch (error: any) {
            console.error(error);
            message.reply(error.message).catch(console.error);
          }
        } else if (scRegex.test(args[i])) {
          try {
            const trackInfo = await scdl.getInfo(args[i]);
            song = {
              title: trackInfo.title,
              url: trackInfo.permalink_url,
              duration: Math.ceil(trackInfo.duration / 1000)
            };
          } catch (error: any) {
            console.error(error);
            message.reply(error.message).catch(console.error);
          }
        }
        if (song) {
          list.Songs.push(song);
          // list.SongsNames.push(song.title);
          // list.SongsDuration.push(song.duration);
          message.channel.send(`${song.title} Added To ${args[0]}`);
          num++;
        }

      }
    }
    await list.save();
    message.reply(`${num} Songs Saved Successfully To ${args[0]} Playlist`);
  }
};