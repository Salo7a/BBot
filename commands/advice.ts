import { Message, MessageEmbed  } from "discord.js";

module.exports = {
  name: "advice",
  cooldown: 1,
  aliases: ["ad", "ghasan", "a3mleh"],
  description: "Contacts the spirits to get you an advice",
  async execute(message: Message, args: any) {
    fetch("https://api.adviceslip.com/advice")
      .then(res => res.json())
      .then(json => {
        const embed = new MessageEmbed()
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
