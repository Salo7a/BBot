import { Message, MessageEmbed } from "discord.js";
const { TENOR_API } = require("../util/EvobotUtil");

module.exports = {
  name: "MassEffectGif",
  cooldown: 1,
  aliases: ["meg", "masseffect"],
  description: "Sends a random Mass Effect GIF",
  async execute(message: { channel: { send: (arg0: string) => void; }; }, args: any) {
    fetch(`https://api.tenor.com/v1/random?key=${TENOR_API}&q=Mass-Effect&limit=1`)
      .then(res => res.json())
      .then(json => message.channel.send(json.results[0].url))
      .catch(e => {
        message.channel.send(":x: Failed to find a gif!");
        return;
      });
  }
};
