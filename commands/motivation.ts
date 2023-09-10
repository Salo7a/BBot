import { Message, EmbedBuilder, SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder().setName("motivation").setDescription("Get a random motivational quote!"),
  cooldown: 1,
  aliases: ["motivate"],
  description: "Get a random motivational quote!",
  async execute(message: Message, args: any) {
    fetch("https://type.fit/api/quotes")
      .then(res => res.json())
      .then(async json => {
        const randomQuote =
          json[Math.floor(Math.random() * json.length)];

        const quoteEmbed = new EmbedBuilder()
          .setAuthor({
            name: "Motivational Quote",
            iconURL: "https://i.imgur.com/Cnr6cQb.png"
          })
          .setDescription(`*"${randomQuote.text}*"\n\n-${randomQuote.author}`)
          .setTimestamp()
          .setColor("#FFD77A");
        return message.channel.send({ embeds: [quoteEmbed] });
      })
      .catch(err => {
        message.channel.send("The spirits don't want to answer you :sob:");
        return console.error(err);
      });
  }
};
