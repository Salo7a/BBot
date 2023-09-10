import { Message, SlashCommandBuilder } from "discord.js";

const { TENOR_API } = require("../utils/config");

module.exports = {
  data: new SlashCommandBuilder().setName("ag").setDescription("Sends a random anime GIF"),
  cooldown: 1,
  aliases: ["ag"],
  description: "Sends a random anime GIF",
  async execute(message: Message, args: any) {
    // @ts-ignore
    fetch(`https://api.tenor.com/v1/random?key=${TENOR_API}&q=anime&limit=1`)
      .then(res => res.json())
      .then(async json => message.channel.send(json.results[0].url))
      .catch(e => {
        message.channel.send(":x: Failed to find a gif!");
        return;
      });
  }
};
