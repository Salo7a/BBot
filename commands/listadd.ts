import { Message, SlashCommandBuilder } from "discord.js";
import { Song } from "../structs/Song";
const scdl = require("soundcloud-downloader").default;
import { Playlist } from "../include/Playlist";

module.exports = {
  data: new SlashCommandBuilder().setName("listadd").setDescription("Adds Songs To A Custom Playlist"),
  cooldown: 10,
  aliases: ["listadd"],
  description: "Adds Songs To A Custom Playlist",
  async execute(message: Message, args: string[]) {
    const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/;
    const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
    // @ts-ignore
    let list = await Playlist.findPlaylist(args[0]);
    if (!list) {
      try {
        // @ts-ignore
        list = await Playlist.FindOrCreate(args[0], []);
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
            song = await Song.from(args[i], args[i]);
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
