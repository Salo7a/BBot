module.exports = {
  name: "ping",
  cooldown: 10,
  description: "Show the bot's average ping",
  execute(message) {
    message.channel.send("https://tenor.com/view/mass-effect-liara-tsoni-gif-19524710").catch(console.error);
    message.reply(`📈 Average ping to API: ${Math.round(message.client.ws.ping)} ms`).catch(console.error);
  }
};
