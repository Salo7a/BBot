const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "affirmation",
  cooldown: 1,
  aliases: ["affirm", "sad", "matfi", "refa3y"],
  description: "Ignites your soul with tailored affirmations!",
  async execute(message, args) {
    fetch("https://www.affirmations.dev/")
      .then(res => res.json())
      .then(json => {
        const embed = new MessageEmbed()
          .setColor("#403B3A")
          .setAuthor("Sl7", "https://i.imgur.com/7524jhl.gif")
          .setDescription(json.affirmation)
          .setTimestamp();
        message.channel.send(embed);
        return;
      })
      .catch(err => {
        message.channel.send("YOU CAN DO IT! :wink:");
        return console.error(err);
      });
  }
};
