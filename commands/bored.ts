import { Message, MessageEmbed } from "discord.js";


module.exports = {
  name: "bored",
  cooldown: 1,
  aliases: ["bored"],
  description: "Get a random thing to do",
  async execute(message: Message, args: any) {
    fetch("https://www.boredapi.com/api/activity?participants=1")
      .then(res => res.json())
      .then(json => {
        const embed = new MessageEmbed()
          .setColor("#6BA3FF")
          .setAuthor({
            name: "Well, You Could",
            iconURL: "https://i.imgur.com/7Y2F38n.png"
          })
          .setDescription(json.activity)
          .setTimestamp();
        message.channel.send({ embeds: [embed] });
        return;
      })
      .catch(err => {
        message.channel.send("I have ran out of ideas :sob:");
        return console.error(err);
      });
  }
};
