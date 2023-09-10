import { Message, SlashCommandBuilder } from "discord.js";

const fetch = require("node-fetch");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("trump").setDescription("Get a random Trump quote!"),
  cooldown: 1,
  aliases: ["trump"],
  description: "Get a random Trump quote!",
  execute(message: Message) {
    fetch("https://api.tronalddump.io/random/quote")
      .then((res: { json: () => any; }) => res.json())
      .then((json: { value: any; appeared_at: any; }) => {
        const embed = new EmbedBuilder()
          .setColor("#BB7D61")
          .setAuthor({
            name: "Donald Trump",
            iconURL: "https://www.whitehouse.gov/wp-content/uploads/2017/11/President-Trump-Official-Portrait-200x200.jpg"
          })
          .setDescription(json.value)
          .setTimestamp(json.appeared_at);
        message.channel.send({ embeds: [embed] });
      })
      .catch((err: any) => {
        message.channel.send("Failed to deliver quote :sob:");
        return console.error(err);
      });
  }
};
