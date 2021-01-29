[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Salo7a/evobot)


# 🤖 BBot (A Random Discord Bot)
> BBot is a Discord Multi-Purpose Bot Based on EvoBot

## Requirements

1. Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
2. YouTube Data API v3 Key **[Guide](https://developers.google.com/youtube/v3/getting-started)**  
2.1 **(Optional)** Soundcloud Client ID **[Guide](https://github.com/zackradisic/node-soundcloud-downloader#client-id)**
3. Node.js v14.0.0 or newer

## 🚀 Getting Started

If deploying to Heroku make sure to create config variables

```
git clone https://github.com/eritislami/evobot.git
cd evobot
npm install
```

After installation finishes you can use `node index.js` to start the bot.

## ⚙️ Configuration

Copy or Rename `config.json.example` to `config.json` and fill out the values:

⚠️ **Note: Never commit or share your token or api keys publicly** ⚠️

```json
{
  "TOKEN": "",
  "YOUTUBE_API_KEY": "",
  "SOUNDCLOUD_CLIENT_ID": "",
  "MAX_PLAYLIST_SIZE": 10,
  "PREFIX": "/",
  "PRUNING": false,
  "LOCALE": "en",
  "DEFAULT_VOLUME": 100,
  "STAY_TIME": 30
  "MONGODB_CONNECTION_STRING": "",
  "STAY_TIME": 30,
  "TENOR_API": ""
}
```

Currently available locales are:
- English (en)
- French (fr)
- Spanish (es)
- Turkish (tr)
- Korean (ko)
- Brazilian Portuguese (pt_br)
- Simplified Chinese (zh_cn)
- Traditional Chinese (zh_tw)
- Check [Contributing](#-contributing) if you wish to help add more languages!

## 📝 Features & Commands

> Note: The default prefix is '/'

* 🎶 Play music from YouTube via url

`/play https://www.youtube.com/watch?v=GLvohMXgcBo`

* 🔎 Play music from YouTube via search query

`/play under the bridge red hot chili peppers`

* 🎶 Play music from Soundcloud via url

`/play https://soundcloud.com/blackhorsebrigade/pearl-jam-alive`

* 🔎 Search and select music to play

`/search Pearl Jam`

Reply with song number or numbers seperated by comma that you wish to play

Examples: `1` or `1,2,3`

* 📃 Play youtube playlists via url

`/playlist https://www.youtube.com/watch?v=YlUKcNNmywk&list=PL5RNCwK3GIO13SR_o57bGJCEmqFAwq82c`

* 🔎 Play youtube playlists via search query

`/playlist linkin park meteora`
* Now Playing (/np)
* Queue system (/queue, /q)
* Loop / Repeat (/loop)
* Shuffle (/shuffle)
* Volume control (/volume, /v)
* Lyrics (/lyrics, /ly)
* Pause (/pause)
* Resume (/resume, /r)
* Skip (/skip, /s)
* Skip to song # in queue (/skipto, /st)
* Move a song in the queue (/move, /mv)
* Remove song # from queue (/remove, /rm)
* Play an mp3 clip (/clip song.mp3) (put the file in sounds folder)
* List all clips (/clips)
* Show api ping (/ping)
* Show bot uptime (/uptime)
* Add a saved playlist to the queue (/list `ListName`)
* Views all saved lists, or songs in a list (/listview [ListName])
* Adds all given songs to a list, separated by a space (/listadd `ListName` `Song URL(s)`)
* Removes a song from the given playlist (/listremove `ListName` `Song Index`
* Toggle pruning of bot messages (/pruning)
* Localization in 6 languages
* Help (/help, /h)
* Command Handler from [discordjs.guide](https://discordjs.guide/)
* Media Controls via Reactions

![reactions](https://i.imgur.com/9S7Omf9.png)

## 📝 Credits

* [@iCrawl](https://github.com/iCrawl) For the queue system used in this application which was adapted from [@iCrawl/discord-music-bot](https://github.com/iCrawl/discord-music-bot)
* [@eritislami](https://github.com/eritislami) & All [EvoBot](https://github.com/eritislami/evobot) amazing contributors.