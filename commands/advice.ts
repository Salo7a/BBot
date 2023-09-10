import { Message, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { i18n } from "../utils/i18n";

module.exports = {
  data: new SlashCommandBuilder().setName("advice").setDescription("Contacts the spirits to get you an advice"),
  cooldown: 1,
  aliases: ["ad", "ghasan", "a3mleh"],
  description: "Contacts the spirits to get you an advice",
  async execute(message: Message, args: any) {
    fetch("https://api.adviceslip.com/advice")
      .then(res => res.json())
      .then(json => {
        const embed = new EmbedBuilder()
          .setColor("#403B3A")
          .setAuthor({name: "A Spirit", iconURL: "https://i.imgur.com/GctQAoS.png"})
          .setDescription(json.slip.advice)
          .setTimestamp();
        message.channel.send({ embeds: [embed] });
        return;
      })
      .catch(err => {
        message.channel.send("The spirits don't want to answer you :sob:");
        return console.error(err);
      });
  }
};
