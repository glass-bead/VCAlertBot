const fs = require('fs');
const U = require('./../utilities/utilities.js');
const D = './data.json';

// Create data file if non existent
if (!fs.existsSync(D)) U.createFile(D)
const js = require('jsonfile');
const data = js.readFileSync(D);

const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('silence')
        .setDescription('Silence Voice Channels Notifications')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Select voice channel to silence notifications')
                .addChannelOption(option =>
                    option
                        .setName('voice-channel')
                        .setDescription('select voice channel')
                        .addChannelTypes(ChannelType.GuildVoice)
                        .setRequired(true)
                ),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Select silenced voice channel to remove')
                .addChannelOption(option =>
                    option
                        .setName('voice-channel')
                        .setDescription('select voice channel')
                        .addChannelTypes(ChannelType.GuildVoice)
                        .setRequired(true)
                ),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('view')
                .setDescription('View which voice channels have silenced notifications')
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        let message = "";

        if (subcommand === 'add') {
            const channelName = interaction.options.getChannel('voice-channel');

            if ((data.silence).includes(channelName.id)) {
                message = `${channelName} notifications are already being silenced.`;
            }
            else {
                // Add VC to silence array in data file
                data.silence.push(channelName.id);
                js.writeFileSync(D, data);

                message = `${channelName} notifications will be silenced.`;
            }
        }
        else if (subcommand === 'remove') {
            const channelName = interaction.options.getChannel('voice-channel');

            const index = (data.silence).indexOf(channelName.id);
            if (index > -1) { // only splice array when item is found
                
                // Remove VC to silence array in data file
                (data.silence).splice(index, 1);
                js.writeFileSync(D, data);

                message = `${channelName} notifications won't be silenced anymore.`;
            } else {
                message = `${channelName} notifications are not silenced.`;
            }
        }
        else if (subcommand === 'view') {
            if ((data.silence).length === 0) {
                message = "No voice channels have silenced notifications."
            }
            else {
                message = "The channels with silenced notifications are: "
                data.silence.forEach(ch => {
                    message += " <#" + ch + "> ";
                });
            }
        }
        await interaction.reply(message);
    },
};