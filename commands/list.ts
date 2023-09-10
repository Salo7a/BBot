import { DiscordGatewayAdapterCreator, joinVoiceChannel } from "@discordjs/voice";
import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
  SlashCommandBuilder,
  TextChannel
} from "discord.js";
import { bot } from "../index";
import { MusicQueue } from "../structs/MusicQueue";
import { Song } from "../structs/Song";
import { i18n } from "../utils/i18n";

import { Playlist } from "../include/Playlist";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("Plays audio from a Saved Playlist")
    .addStringOption((option) => option.setName("listname").setDescription("Playlist's name").setRequired(true)),
  cooldown: 60,
  aliases: ["list"],
  description: "Plays audio from a Saved Playlist",
  permissions: [
    PermissionsBitField.Flags.Connect,
    PermissionsBitField.Flags.Speak,
    PermissionsBitField.Flags.AddReactions,
    PermissionsBitField.Flags.ManageMessages
  ],
  async execute(interaction: ChatInputCommandInteraction, queryOptionName = "listname") {
    let playlistName = interaction.options.getString(queryOptionName);
    const guildMemer = interaction.guild!.members.cache.get(interaction.user.id);
    const { channel } = guildMemer!.voice;

    if (!channel)
      return interaction.reply({ content: i18n.__("playlist.errorNotChannel"), ephemeral: true }).catch(console.error);


    const queue = bot.queues.get(interaction.guild!.id);

    if (queue && channel.id !== queue.connection.joinConfig.channelId)
      if (interaction.replied)
        return interaction
          .editReply({ content: i18n.__mf("play.errorNotInSameChannel", { user: interaction.client.user!.username }) })
          .catch(console.error);
      else
        return interaction
          .reply({
            content: i18n.__mf("play.errorNotInSameChannel", { user: interaction.client.user!.username }),
            ephemeral: true
          })
          .catch(console.error);


    if (!playlistName) return interaction.reply(i18n.__mf("play.usageReply", { prefix: bot.prefix })).catch(console.error);

    const loadingReply = await interaction.reply("⏳ Loading...");

    let playlist = [];
    try {
      // @ts-ignore
      let list = await Playlist.findPlaylist(playlistName);
      if (!list) return interaction.editReply("Playlist Doesn't Exist").catch(console.error);
      for (const s of list.Songs) {
        let song = null;
        try {
          song = await Song.from(s.url);
          playlist.push(song);
        } catch (error) {
          console.error(error);
          interaction.editReply(`${s.title} Not Found`).catch(console.error);
        }
      }
    } catch (error) {
      console.error(error);
      if (interaction.replied)
        return interaction.editReply({ content: i18n.__("playlist.errorNotFoundPlaylist") }).catch(console.error);
      else
        return interaction
          .reply({ content: i18n.__("playlist.errorNotFoundPlaylist"), ephemeral: true })
          .catch(console.error);
    }

    if (queue) {
      queue.songs.push(...playlist);
    } else {
      const newQueue = new MusicQueue({
        interaction,
        textChannel: interaction.channel! as TextChannel,
        connection: joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator as DiscordGatewayAdapterCreator
        })
      });

      bot.queues.set(interaction.guild!.id, newQueue);
      newQueue.songs.push(...playlist);

      newQueue.enqueue(playlist[0]);
    }

    let playlistEmbed = new EmbedBuilder()
      .setTitle(`${playlistName}`)
      .setDescription(playlist.map((song: Song, index: number) => `${index + 1}. ${song.title}`).join("\n").slice(0, 4095))
      .setColor("#F8AA2A")
      .setTimestamp();

    if (interaction.replied)
      return interaction.editReply({
        content: i18n.__mf("playlist.startedPlaylist", { author: interaction.user.id }),
        embeds: [playlistEmbed]
      });
    interaction
      .reply({
        content: i18n.__mf("playlist.startedPlaylist", { author: interaction.user.id }),
        embeds: [playlistEmbed]
      })
      .catch(console.error);
    // interaction.reply(`Playlist ${playlistName} Has Been Added To The Queue`).catch(console.error);
  }
};
