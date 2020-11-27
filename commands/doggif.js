const { TENOR_API } = require("../util/EvobotUtil");
const fetch = require("node-fetch");

module.exports = {
  name: "DogGif",
  cooldown: 1,
  aliases: ["dog", "dg"],
  description: "Sends a random dog GIF",
  async execute(message, args) {
    fetch(`https://api.tenor.com/v1/random?key=${TENOR_API}&q=dog&limit=1`)
      .then(res => res.json())
      .then(json => message.channel.send(json.results[0].url))
      .catch(e => {
        message.channel.send(":x: Failed to find a gif!");
        return;
      });
  }
};
