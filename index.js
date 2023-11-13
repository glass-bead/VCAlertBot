require('dotenv').config();
const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildVoiceStates,
    ],
    partials: [Partials.Channel, Partials.Message],
});

// Loading command files
client.commands = new Collection();
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${`./commands/${file}`} is missing a required "data" or "execute" property.`);
    }
}

// Global Variables
global.VCRole = '';

/* ======================================================== */

// Bot login
client.login(TOKEN);

// Bot is online
client.on('ready', () => {
    console.log(`${client.user.tag} is online.`);
});


// Checks if member joins a VC
client.on('voiceStateUpdate', async (oldState, newState) => {

    var oldVoice = oldState.channelId;
    var newVoice = newState.channelId;

    // When a user joins a VC
    if (newVoice != null) {
        if (oldVoice == null, oldVoice != newVoice) {
            var userID = newState.id;

            // Send DM to members (w/ or without role) except member who joined
            const server = client.guilds.cache.get(GUILD_ID);
            server.members.cache.forEach(member => {
                if (!member.user.bot && member.id != userID) {
                    if ((global.VCRole !== "" && member.roles.cache.has(global.VCRole)) || (global.VCRole === "")) {
                        member.send(`The user <@` + userID + `> just joined the voice chat.\nIf you have time, why not hop on the channel and say hi?`);
                    }
                }
            });
        }
    }
});

// Listen for user interactions with bot
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return console.error(`No command matching ${interaction.commandName} was found.`);

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});