import { Message } from "discord.js";

const { findPlaylist } = require("../include/PlaylistFunctions");

module.exports = {
  name: "Remove From Playlist",
  cooldown: 3,
  aliases: ["listremove"],
  description: "Remove Songs From A Custom Playlist",
  async execute(message: Message, args: string[]) {

    let list = await findPlaylist(args[0]);
    if (!list) return message.reply("The Playlist Doesn't Exist").catch(console.error);
    // Start the playlist if playlist url was provided
    let num = 0;
    for (let i = 1; i < args.length; i++) {
      if (parseInt(args[i]) <= list.Songs.length && parseInt(args[i]) > 0) {
        list.Songs.splice(parseInt(args[i]) - 1, 1);
        num++;
      } else {
        message.reply(`No song at index ${args[i]}`);
      }
    }
    await list.save();
    return message.reply(`${num} Songs Deleted Successfully From ${args[0]} Playlist`);
  }
};
