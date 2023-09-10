import { Message, SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from "discord.js";
import {Playlist} from "../include/Playlist";

module.exports = {
  data: new SlashCommandBuilder().setName("listview").setDescription("Explore Saved Playlists").addStringOption((option) => option.setName("listname").setDescription("Playlist's name").setRequired(false)),
  cooldown: 10,
  aliases: ["listview"],
  description: "Explore Saved Playlists",
  async execute(interaction: ChatInputCommandInteraction, queryOptionName = "listname") {
    let playlistName = interaction.options.getString(queryOptionName);
    if (playlistName) {
      // @ts-ignore
      let list = await Playlist.findPlaylist(playlistName);
      if (!list) return interaction.reply("Couldn't Get Playlist").catch(console.error);
      const embed = new EmbedBuilder()
        .setTitle(`${list.Name} Playlist`)
        .setThumbnail(interaction.guild!.iconURL())
        .setColor("#F8AA2A")
        .setTimestamp();
      for (let i = 0; i < list.Songs.length; i++) {
        console.log(`${playlistName} ${i + 1} - ${list.Songs[i].title}`);
        if (i<=25)
        embed.addFields({name: `${i + 1} - ${list.Songs[i].title}`, value: list.Songs[i].duration});
      }
      interaction.channel!.send({ embeds: [embed] });
    } else {
      const embed = new EmbedBuilder()
        .setTitle(`All Playlists`)
        .setThumbnail(interaction.guild!.iconURL())
        .setColor("#F8AA2A")
        .setTimestamp();
      // @ts-ignore
      let lists = await Playlist.findAllPlaylists();
      if (lists) {
        let i = 0;
        for (let list of lists) {
          i++;
          if (i <= 25) embed.addFields({name: list.Name, value: `${list.Songs.length} Songs`});
        }
      } else  {
        embed.addFields({name: "None", value: 'None'});
      }

      interaction.reply({ embeds: [embed] });
    }
  }
};
