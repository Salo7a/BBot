import { Message } from "discord.js";

const { TENOR_API } = require("../utils/config");

module.exports = {
  name: "AnimeGif",
  cooldown: 1,
  aliases: ["ag"],
  description: "Sends a random anime GIF",
  async execute(message: Message, args: any) {
    fetch(`https://api.tenor.com/v1/random?key=${TENOR_API}&q=anime&limit=1`)
      .then(res => res.json())
      .then(json => message.channel.send(json.results[0].url))
      .catch(e => {
        message.channel.send(":x: Failed to find a gif!");
        return;
      });
  }
};
