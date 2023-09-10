import { ChatInputCommandInteraction, Message, SlashCommandBuilder } from "discord.js";
import {Playlist} from "../include/Playlist";


module.exports = {
  data: new SlashCommandBuilder().setName("listremove").setDescription("Remove Songs From A Custom Playlist")
    .addStringOption((option) => option.setName("ids").setDescription("Indexes to be removed").setRequired(true)),
  cooldown: 3,
  aliases: ["listremove"],
  description: "Remove Songs From A Custom Playlist",
  async execute(interaction: ChatInputCommandInteraction, queryOptionName = "ids") {
    let ids = interaction.options.getString(queryOptionName);
    let args = ids?.split(" ") || []
    // @ts-ignore
    let list = await Playlist.findPlaylist(playlistName);
    if (!list) return interaction.reply("The Playlist Doesn't Exist").catch(console.error);
    // Start the playlist if playlist url was provided
    let num = 0;
    for (let i = 1; i < args.length; i++) {
      if (parseInt(args[i]) <= list.Songs.length && parseInt(args[i]) > 0) {
        list.Songs.splice(parseInt(args[i]) - 1, 1);
        num++;
      } else {
        await interaction.reply(`No song at index ${args[i]}`);
      }
    }
    await list.save();
    return interaction.reply(`${num} Songs Deleted Successfully From ${args[0]} Playlist`);
  }
};
