const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "DadJoke",
  cooldown: 1,
  aliases: ["djoke", "joke"],
  description: "Your Dose of Weird Dad Jokes!",
  async execute(message, args) {
    fetch("https://icanhazdadjoke.com/slack")
      .then(res => res.json())
      .then(json => {
        const embed = new MessageEmbed()
          .setColor("#dbc496")
          .setAuthor("A Wild Dad Appears", "https://i.imgur.com/9ryavsi.png")
          .setDescription(json.attachments[0].text)
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
