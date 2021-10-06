let config;

try {
  config = require("../config.json");
} catch (error) {
  config = null;
}
let owner = config ? config.OWNER_ID: process.env.OWNER_ID;

exports.canModifyQueue = (member) => ((member.voice.channelID === member.guild.voice.channelID) || member.id === owner);


exports.TOKEN = config ? config.TOKEN : process.env.TOKEN;
exports.YOUTUBE_API_KEY = config ? config.YOUTUBE_API_KEY : process.env.YOUTUBE_API_KEY;
exports.SOUNDCLOUD_CLIENT_ID = config ? config.SOUNDCLOUD_CLIENT_ID : process.env.SOUNDCLOUD_CLIENT_ID;
exports.PREFIX = (config ? config.PREFIX : process.env.PREFIX) || "/";
exports.MAX_PLAYLIST_SIZE = (config ? config.MAX_PLAYLIST_SIZE : process.env.MAX_PLAYLIST_SIZE) || 10;
exports.PRUNING = (config ? config.PRUNING : process.env.PRUNING) || false;
exports.STAY_TIME = (config ? config.STAY_TIME : process.env.STAY_TIME) || 30;
exports.DEFAULT_VOLUME = (config ? config.DEFAULT_VOLUME : process.env.DEFAULT_VOLUME) || 100;
exports.LOCALE = (config ? config.LOCALE : process.env.LOCALE) || "en";
exports.MONGODB_CONNECTION_STRING = config ? config.MONGODB_CONNECTION_STRING : process.env.MONGODB_CONNECTION_STRING;
exports.TENOR_API = config ? config.TENOR_API : process.env.TENOR_API;
exports.OWNER_ID = config ? config.OWNER_ID: process.env.OWNER_ID;