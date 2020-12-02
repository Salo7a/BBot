const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "quote",
  aliases: ["quote"],
  description: "Random Quote",
  execute(message) {
    let quotes = ["Fight To Reach", "“You want the truth? You can't handle the truth!”", "“Bond. James Bond”",
      "“Show me the money!”", "“I'll be back.”", "“We'll always have Paris”", "“Houston, we have a problem.”",
      "“It's alive! It's alive!”", "“Valar Morghulis”", "“Say “hello” to my little friend!”", "“Elementary, my dear Watson.”",
      "“Mrs. Robinson, you're trying to seduce me. Aren't you?”", "“Hasta la vista, baby.”", "My precious.", "A martini. Shaken, not stirred."
      , "“I will find you, and I will kill you.”", "“I'm going to make him an offer he can't refuse.”", "“Ten Billion Percent”",
      "“The first rule of Fight Club is: You do not talk about Fight Club.”", "“I am your father.”", "“I am your father.”",
      "“To infinity and beyond!”", "“You had me at hello.”", "“Here's Johnny!”"
      , "“People, who can’t throw something important away, can never hope to change anything”", "“I guess, as long as I have life, all I can do is fight with all my might.”"
      , "“In order for a mediocre man to defeat a genius, he has to become a monster.”", "“The world is cruel, but also very beautiful.”"
      , "“Someone has to do it, so why not me?”", "“I am justice!”", "“Giving up is what kills people.”"
      , "“I don’t just want to die: I want to die happy.”", "“They were weak. That’s why they died. We were weak too. That’s why we couldn’t save them.”"
      , "“The opposite of love isn’t hate, it’s apathy.”", "“The world is not beautiful; and that, in a way, lends it a sort of beauty.”"
      , "“I won’t live my life by another person’s script.”", "“If you have time to think of a beautiful end, then live beautifully until the end.”"
      , "“This is my darkness. nothing anyone says can console me.”", "“The worst part about being strong is that no one asks if you are okay.”"
      , "“I hate loneliness but it loves me.”", "“This has gotta be the longest 40 seconds of my life.”"
      , "“This is the kind of man I am! I have no strength, but I want it all. I have no knowledge, but all I do is dream. There's nothing I can do, but I struggle in vain!”"
      , "“All I do is talk a big game, and make myself sound like a big shot, when I can't do anything!”"
      , "“ I never do anything, yet I can complain like a pro.”", "“ Who do I think I am?! It's amazing that I can live like this and not feel ashamed!”"
      , "“It's better to hear a few 'thank you's than many 'sorry's.”", "“ - You're telling me to get stronger? *No. I am telling you to be strong”"
      , "“You are truly slothful.”", "“It was rough. It was so painful. I was so scared. I was so sad. It hurt so much, I thought I’d die. I tried so hard… I tired so hard! I was so desperate, so desperate to make everything right! ”"];
    return message.channel.send(quotes[Math.floor(Math.random() * quotes.length)]).catch(console.error);
  }
};
