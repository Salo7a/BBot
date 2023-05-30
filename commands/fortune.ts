module.exports = {
  name: "fortune",
  cooldown: 1,
  aliases: ["fortune"],
  description: "Gets YOU a fortune cookie!",
  async execute(message: { channel: { send: (arg0: string) => void; }; }, args: any) {
    fetch("http://yerkee.com/api/fortune")
      .then(res => res.json())
      .then(json => {
        const embed = new MessageEmbed()
          .setColor("#F4D190")
          .setAuthor("An Old Chinese Man Says", "https://i.imgur.com/58wIjK0.png")
          .setDescription(json.fortune)
          .setTimestamp();
        message.channel.send(embed);
        return;
      })
      .catch(err => {
        message.channel.send("The spirits don't want to answer you :sob:");
        return console.error(err);
      });
  }
};
