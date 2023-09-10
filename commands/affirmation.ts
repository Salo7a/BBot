import { Message, EmbedBuilder, SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder().setName("affirmation").setDescription("Ignites your soul with tailored affirmations!"),
  cooldown: 1,
  aliases: ["affirm", "sad", "matfi", "refa3y"],
  description: "Ignites your soul with tailored affirmations!",
  async execute(message: Message, args: any) {
    fetch("https://www.affirmations.dev/")
      .then(res => res.json())
      .then(json => {
        const embed = new EmbedBuilder()
          .setColor("#403B3A")
          .setAuthor({
            name: "Sl7",
            iconURL: "https://i.imgur.com/7524jhl.gif"
          })
          .setDescription(json.affirmation)
          .setTimestamp();
        // @ts-ignore
        message.channel.send({ embeds: [embed] });
        return;
      })
      .catch(err => {
        message.channel.send("YOU CAN DO IT! :wink:");
        return console.error(err);
      });
  }
};
