import { Message } from "discord.js";

const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "trump",
  cooldown: 1,
  aliases: ["trump"],
  description: "Get a random Trump quote!",
  execute(message: Message) {
    fetch("https://api.tronalddump.io/random/quote")
      .then((res: { json: () => any; }) => res.json())
      .then((json: { value: any; appeared_at: any; }) => {
        const embed = new MessageEmbed()
          .setColor("#BB7D61")
          .setAuthor(
            "Donald Trump",
            "https://www.whitehouse.gov/wp-content/uploads/2017/11/President-Trump-Official-Portrait-200x200.jpg"
          )
          .setDescription(json.value)
          .setTimestamp(json.appeared_at);
        message.channel.send(embed);
      })
      .catch((err: any) => {
        message.channel.send("Failed to deliver quote :sob:");
        return console.error(err);
      });
  }
};
