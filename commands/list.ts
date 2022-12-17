import { DiscordGatewayAdapterCreator, joinVoiceChannel } from "@discordjs/voice";
import { Message } from "discord.js";
import { bot } from "../index";
import { MusicQueue } from "../structs/MusicQueue";
import { Song } from "../structs/Song";
import { i18n } from "../utils/i18n";
const { findPlaylist } = require("../include/PlaylistFunctions");

module.exports = {
  name: "SavedPlaylist",
  cooldown: 60,
  aliases: ["list"],
  description: "Plays audio from a Saved Playlist",
  permissions: ["CONNECT", "SPEAK", "ADD_REACTIONS", "MANAGE_MESSAGES"],
  async execute(message: Message, args: string[]) {
    const { channel } = message.member!.voice;
    let newQueue = null;
    if (!channel) return message.reply(i18n.__("play.errorNotChannel")).catch(console.error);

    const queue = bot.queues.get(message.guild!.id);

    if (queue && channel.id !== queue.connection.joinConfig.channelId)
      return message
        .reply(i18n.__mf("play.errorNotInSameChannel", { user: bot.client.user!.username }))
        .catch(console.error);

    if (!args.length) return message.reply(i18n.__mf("play.usageReply", { prefix: bot.prefix })).catch(console.error);

    if (!queue){
      newQueue = new MusicQueue({
        message,
        connection: joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator as DiscordGatewayAdapterCreator
        })
      });
      bot.queues.set(message.guild!.id, newQueue);
    }
    const playlistName = args[0];

    const loadingReply = await message.reply("⏳ Loading...");

    let list = await findPlaylist(playlistName);
    if (!list) return message.reply("Playlist Doesn't Exist").catch(console.error);
    try {
      for (const s of list.Songs) {
        let url = s;

        let song = null;

        try {
          song = await Song.from(url, args.join(" "));
        } catch (error) {
          console.error(error);
          return message.reply(i18n.__("common.errorCommand")).catch(console.error);
        }
        if (queue ) {
          queue.enqueue(song);
        } else if (newQueue) {
          newQueue.enqueue(song);
        }
      }
    } catch (e) {
      console.error(e);
      return message.reply(i18n.__("common.errorCommand")).catch(console.error);
    } finally {
      await loadingReply.delete();
      message.reply(`Playlist ${args[0]} Has Been Added To The Queue`).catch(console.error);
    }
  }
};
