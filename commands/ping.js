const i18n = require("../util/i18n");

module.exports = {
  name: "ping",
  cooldown: 10,
  description: i18n.__("ping.description"),
  execute(message) {
    message.channel.send("https://tenor.com/view/mass-effect-liara-tsoni-gif-19524710").catch(console.error);
    message
      .reply(i18n.__mf("ping.result", { ping: Math.round(message.client.ws.ping) }))
      .catch(console.error);
  }
};
