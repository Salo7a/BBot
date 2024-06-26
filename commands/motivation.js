const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "Motivation",
  cooldown: 1,
  aliases: ["motivate"],
  description: "Get a random motivational quote!",
  async execute(message, args) {
    fetch("https://type.fit/api/quotes")
      .then(res => res.json())
      .then(json => {
        const randomQuote =
          json[Math.floor(Math.random() * json.length)];

        const quoteEmbed = new MessageEmbed()
          .setAuthor(
            "Motivational Quote",
            "https://i.imgur.com/Cnr6cQb.png"
          )
          .setDescription(`*"${randomQuote.text}*"\n\n-${randomQuote.author}`)
          .setTimestamp()
          .setColor("#FFD77A");
        return message.channel.send(quoteEmbed);
      })
      .catch(err => {
        message.channel.send("The spirits don't want to answer you :sob:");
        return console.error(err);
      });
  }
};
