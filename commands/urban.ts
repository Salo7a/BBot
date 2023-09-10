import { Message, EmbedBuilder, SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder().setName("urban").setDescription("Get Urban Dictionary Definition"),
  cooldown: 1,
  aliases: ["urban"],
  description: "Get Urban Dictionary Definition",
  async execute(message: Message, args: any[]) {
    let text = args.join(" ");
    fetch(`https://api.urbandictionary.com/v0/define?term=${text}`)
      .then(res => res.json())
      .then(json => {
        const embed = new EmbedBuilder()
          .setColor("#BB7D61")
          .setTitle(`${text}`)
          .setAuthor({
            name: "Urban Dictionary",
            iconURL: "https://i.imgur.com/vdoosDm.png",
            url: "https://urbandictionary.com"
          })
          .setDescription(
            `*${json.list[Math.floor(Math.random() * 1)].definition}*`
          )
          .setURL(json.list[0].permalink)
          .setTimestamp()
          .setFooter({ text: "Powered by UrbanDictionary" });
        message.channel.send({ embeds: [embed] });
        return;
      })
      .catch(() => {
        message.channel.send("Failed to deliver definition :sob:");
        // console.error(err); // no need to spam console for each time it doesn't find a query
        return;
      });
  }
};
