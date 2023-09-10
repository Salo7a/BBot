import { Message, EmbedBuilder, SlashCommandBuilder } from "discord.js";
const { TENOR_API } = require("../utils/config");

module.exports = {
  data: new SlashCommandBuilder().setName("cat").setDescription("Sends a random cat GIF"),
  cooldown: 1,
  aliases: ["cat", "cg"],
  description: "Sends a random cat GIF",
  async execute(message: Message, args: any) {
    fetch(`https://api.tenor.com/v1/random?key=${TENOR_API}&q=cat&limit=1`)
      .then(res => res.json())
      .then(async json => message.channel.send(json.results[0].url))
      .catch(e => {
        message.channel.send(":x: Failed to find a gif!");
        return;
      });
  }
};
