import { Message, EmbedBuilder, SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder().setName("djoke").setDescription("Your Dose of Weird Dad Jokes!"),
  cooldown: 1,
  aliases: ["djoke", "joke"],
  description: "Your Dose of Weird Dad Jokes!",
  async execute(message: Message, args: any) {
    fetch("https://icanhazdadjoke.com/slack")
      .then(res => res.json())
      .then(json => {
        const embed = new EmbedBuilder()
          .setColor("#dbc496")
          .setAuthor({
            name: "A Wild Dad Appears",
            iconURL: "https://i.imgur.com/9ryavsi.png"
          })
          .setDescription(json.attachments[0].text)
          .setTimestamp();
        message.channel.send({ embeds: [embed] });
        return;
      })
      .catch(err => {
        message.channel.send("YOU CAN DO IT! :wink:");
        return console.error(err);
      });
  }
};
