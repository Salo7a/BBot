// @ts-ignore
const { TENOR_API } = require("../utils/config");

module.exports = {
  name: "Gif",
  cooldown: 1,
  aliases: ["gif"],
  description: "Get a random gif",
  async execute(message: { reply: (arg0: string) => Promise<any>; channel: { send: (arg0: string) => void; }; }, args: any[]) {
    if (!args[0]) {
      return message.reply(`You have to enter a search query`).catch(console.error);
    }
    let query = args.join(" ");
    fetch(`https://api.tenor.com/v1/random?key=${TENOR_API}&q=${query}&limit=1`)
      .then(res => res.json())
      .then(json => message.channel.send(json.results[0].url))
      .catch(e => {
        message.channel.send(":x: Failed to find a gif!");
        return;
      });
  }
};
