# VCAlertBot ![GitHub repo size](https://img.shields.io/github/repo-size/glass-bead/VCAlertBot?logo=Github&&style=flat-square) ![GitHub last commit](https://img.shields.io/github/last-commit/glass-bead/VCAlertBot?logo=Github&&style=flat-square)

This Discord bot is designed to address the issue of users joining voice channels without any automatic notification to other server members. While text channel activities generate notifications, joining voice channels (VC) often goes unnoticed. This bot fills that gap by providing real-time notifications when someone joins a voice channel.

## Technologies Used

This bot is built using a variety of technologies, including:

* [Discord.js](https://discord.js.org/): A powerful and flexible library for interacting with the Discord API (version 14.14.1)
* [Node.js](https://nodejs.org/en/about): A popular server-side JavaScript runtime (version 18.17.1)
* [npm](https://nodejs.dev/en/learn/an-introduction-to-the-npm-package-manager/): Standard package manager for Node.js (version 9.6.7)
* [Discord Developer Portal](https://discord.com/developers/applications): a platform that provides tools and resources for developers to create and manage applications that integrate with the Discord platform

**Note:** This project was built using the above versions of the technologies. Please note that using different versions of the technologies may result in compatibility issues or unexpected behavior.
You can update the versions of these technologies by editing the `package.json` file and running `npm install` to install the updated packages.

## Installation and Usage

To install the bot, first clone the repository to your local machine. Next, navigate to the project directory and run `npm install` to install all dependencies. Finally, create a `.env` file and add your Discord bot token, client id and server id, as follows:

```bash
TOKEN = the discord bot token goes here
CLIENT_ID = the client id goes here
GUILD_ID = the server id goes here
```

Run the follow to register the commands:
```bash
node register_comands.js
```

Run the discord bot with: 
```bash
node index.js
```

Once the bot is online. Type `/` (slash) in any channel to see a list of available commands. You can use any of the following commands:
| Command | Description |
| --- | --- |
| /mode | Select whether notifications are sent only when a member joins an empty voice channel (Empty Channels Only) or every time someone joins a voice channel (All Joins). 'Empty Channels Only' is selected by default. |
| /role `server-role`  | Select a specific server role to receive the alerts when someone joins a VC.No role is selected by default, meaning that everyone in the server receives a notification. |
| /silence view `voice-channel` | View which voice channels are silenced, meaning the users are not notificed when someone joins those channels.|
| /silence add `voice-channel`| Add a voice channel you wish to silence. When someone joins a silenced channel, no on receives notfications when someone joins that channel. |
| /silence remove `voice-channel` | Remove a voice channel from the silenced list. Alerts for that channel will resume. |


*© Glass Bead 2023*
