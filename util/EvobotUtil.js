let config;
try {
  config = require("../config.json");
} catch (error) {
  config = null;
}
let owner = config ? config.OWNER_ID: process.env.OWNER_ID;

exports.canModifyQueue = (member) => {
  const { channelID } = member.voice;
  const botChannel = member.guild.voice.channelID;
  if ((channelID !== botChannel) && member.id != owner) {
    member.send("You need to join the voice channel first!").catch(console.error);
    return;
  }

  return true;
};


exports.TOKEN = config ? config.TOKEN : process.env.TOKEN;
exports.PREFIX = config ? config.PREFIX : process.env.PREFIX;
exports.YOUTUBE_API_KEY = config ? config.YOUTUBE_API_KEY : process.env.YOUTUBE_API_KEY;
exports.SOUNDCLOUD_CLIENT_ID = config ? config.SOUNDCLOUD_CLIENT_ID : process.env.SOUNDCLOUD_CLIENT_ID;
exports.MAX_PLAYLIST_SIZE = config ? config.MAX_PLAYLIST_SIZE : process.env.MAX_PLAYLIST_SIZE;
exports.PRUNING = config ? config.PRUNING : process.env.PRUNING;
exports.MONGODB_CONNECTION_STRING = config ? config.MONGODB_CONNECTION_STRING : process.env.MONGODB_CONNECTION_STRING;
exports.STAY_TIME = config ? config.STAY_TIME : process.env.STAY_TIME;
exports.TENOR_API = config ? config.TENOR_API : process.env.TENOR_API;
exports.DEFAULT_VOLUME = config ? config.DEFAULT_VOLUME: process.env.DEFAULT_VOLUME;
exports.OWNER_ID = config ? config.OWNER_ID: process.env.OWNER_ID;