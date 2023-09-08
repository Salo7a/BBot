import { Message } from "discord.js";
import { i18n } from "../utils/i18n";

export default {
  name: "ping",
  cooldown: 10,
  description: i18n.__("ping.description"),
  execute(message: Message) {
    message.channel.send("It's Alive!").catch(console.error);
    message.channel.send("https://tenor.com/view/mass-effect-liara-tsoni-gif-19524710").catch(console.error);
    message
      .reply(i18n.__mf("ping.result", { ping: Math.round(message.client.ws.ping) }))
      .catch(console.error);
  }
};
