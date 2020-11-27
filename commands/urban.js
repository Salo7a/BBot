const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "Urban",
  cooldown: 1,
  aliases: ["urban"],
  description: "Get Urban Dictionary Definition",
  async execute(message, args) {
    let text = args.join(" ");
    fetch(`https://api.urbandictionary.com/v0/define?term=${text}`)
      .then(res => res.json())
      .then(json => {
        const embed = new MessageEmbed()
          .setColor("#BB7D61")
          .setTitle(`${text}`)
          .setAuthor(
            "Urban Dictionary",
            "https://i.imgur.com/vdoosDm.png",
            "https://urbandictionary.com"
          )
          .setDescription(
            `*${json.list[Math.floor(Math.random() * 1)].definition}*`
          )
          .setURL(json.list[0].permalink)
          .setTimestamp()
          .setFooter("Powered by UrbanDictionary", "");
        message.channel.send(embed);
        return;
      })
      .catch(() => {
        message.channel.send("Failed to deliver definition :sob:");
        // console.error(err); // no need to spam console for each time it doesn't find a query
        return;
      });
  }
};
