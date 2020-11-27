const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "trump",
  cooldown: 1,
  aliases: ["trump"],
  description: "Get a random Trump quote!",
  async execute(message, args) {
    fetch("https://api.tronalddump.io/random/quote")
      .then(res => res.json())
      .then(json => {
        const embed = new MessageEmbed()
          .setColor("#BB7D61")
          .setAuthor(
            "Donald Trump",
            "https://www.whitehouse.gov/wp-content/uploads/2017/11/President-Trump-Official-Portrait-200x200.jpg"
          )
          .setDescription(json.value)
          .setTimestamp(json.appeared_at);
        message.channel.send(embed);
        return;
      })
      .catch(err => {
        message.channel.send("Failed to deliver quote :sob:");
        return console.error(err);
      });
  }
};
