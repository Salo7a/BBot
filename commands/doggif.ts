// @ts-ignore
import { SlashCommandBuilder } from "discord.js";

const { TENOR_API } = require("../utils/config");

module.exports = {
  data: new SlashCommandBuilder().setName("dog").setDescription("Sends a random dog GIF"),
  cooldown: 1,
  aliases: ["dog", "dg"],
  description: "Sends a random dog GIF",
  async execute(message: { channel: { send: (arg0: string) => void; }; }, args: any) {
    fetch(`https://api.tenor.com/v1/random?key=${TENOR_API}&q=dog&limit=1`)
      .then(res => res.json())
      .then(json => message.channel.send(json.results[0].url))
      .catch(e => {
        message.channel.send(":x: Failed to find a gif!");
        return;
      });
  }
};
