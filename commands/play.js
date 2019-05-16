const { Util } = require("discord.js")
const { YOUTUBE_API_KEY } = require("../config.json")
const ytdl = require("ytdl-core")
const ytdlDiscord = require("ytdl-core-discord")
const YouTubeAPI = require("simple-youtube-api")
const youtube = new YouTubeAPI(YOUTUBE_API_KEY)

module.exports = {
  name: "play",
  description: "Plays audio from YouTube",
  async execute(message, args) {
    const { channel } = message.member.voice

    if (!args.length) return message.reply("Usage: /play <YouTube URL | Video Name>").catch(console.error)
    if (!channel) return message.reply("You need to join a voice channel first!").catch(console.error)

    const permissions = channel.permissionsFor(message.client.user)
    if (!permissions.has("CONNECT")) return message.reply("Cannot connect to voice channel, missing permissions")
    if (!permissions.has("SPEAK")) return message.reply("I cannot speak in this voice channel, make sure I have the proper permissions!")

    const search = args.join(" ")
    const pattern = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/ig;
    const url = args[0]
    const urlValid = pattern.test(args[0])

    const serverQueue = message.client.queue.get(message.guild.id)
    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      volume: 100,
      playing: true
    }

    let songInfo = null
    let song = null

    if (urlValid) {
      try {
        songInfo = await ytdl.getInfo(url)
        song = {
          title: Util.escapeMarkdown(songInfo.title),
          url: songInfo.video_url
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      try {
        const results = await youtube.searchVideos(search, 1)
        songInfo = await ytdl.getInfo(results[0].url)
        song = {
          title: Util.escapeMarkdown(songInfo.title),
          url: songInfo.video_url
        }
      } catch (error) {
        console.error(error)
      }
    }

    if (serverQueue) {
      serverQueue.songs.push(song)
      return serverQueue.textChannel.send(`✅ **${song.title}** has been added to the queue by ${message.author}`).catch(console.error)
    } else {
      queueConstruct.songs.push(song)
    }

    if (!serverQueue) message.client.queue.set(message.guild.id, queueConstruct)

    const play = async song => {
      const queue = message.client.queue.get(message.guild.id)
      if (!song) {
        queue.channel.leave()
        message.client.queue.delete(message.guild.id)
        return queue.textChannel.send("🚫 Music queue ended.").catch(console.error)
      }

      const options = { filter: "audioonly", quality: "highestaudio" }
      const dispatcher = queue.connection.play(await ytdlDiscord(song.url, options), { type: "opus", passes: 3 })
        .on("end", () => {
          queue.songs.shift()
          play(queue.songs[0])
        })
        .on("error", error => console.error(error))
      dispatcher.setVolumeLogarithmic(queue.volume / 100)
      queue.textChannel.send(`🎶 Started playing: **${song.title}** ${song.url}`).catch(console.error)
    }

    if (!serverQueue) {
      try {
        const connection = await channel.join()
        queueConstruct.connection = connection
        play(queueConstruct.songs[0])
      } catch (error) {
        console.error(`Could not join voice channel: ${error}`)
        message.client.queue.delete(message.guild.id)
        await channel.leave()
        return message.channel.send(`Could not join the channel: ${error}`).catch(console.error)
      }
    }
  }
}
