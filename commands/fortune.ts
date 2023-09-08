import { Message, MessageEmbed } from "discord.js";

module.exports = {
  name: "fortune",
  cooldown: 1,
  aliases: ["fortune"],
  description: "Gets YOU a fortune cookie!",
  async execute(message: Message, args: any) {
    fetch("http://yerkee.com/api/fortune")
      .then(res => res.json())
      .then(json => {
        const embed = new MessageEmbed()
          .setColor("#F4D190")
          .setAuthor({
            name: "An Old Chinese Man Says",
            iconURL: "https://i.imgur.com/58wIjK0.png"
          })
          .setDescription(json.fortune)
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
