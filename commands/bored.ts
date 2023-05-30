const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "bored",
  cooldown: 1,
  aliases: ["bored"],
  description: "Get a random thing to do",
  async execute(message: { channel: { send: (arg0: string) => void; }; }, args: any) {
    fetch("https://www.boredapi.com/api/activity?participants=1")
      .then(res => res.json())
      .then(json => {
        const embed = new MessageEmbed()
          .setColor("#6BA3FF")
          .setAuthor("Well, You Could", "https://i.imgur.com/7Y2F38n.png")
          .setDescription(json.activity)
          .setTimestamp();
        message.channel.send(embed);
        return;
      })
      .catch(err => {
        message.channel.send("I have ran out of ideas :sob:");
        return console.error(err);
      });
  }
};
