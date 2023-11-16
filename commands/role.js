const fs = require('fs');
const U = require('./../utilities/utilities.js');
const D = './data.json';

// Create data file if non existent
if (!fs.existsSync(D)) U.createFile(D)
const js = require('jsonfile');
const data = js.readFileSync(D);

const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Set a role to send DM to.')
        .addRoleOption(option =>
            option
                .setName('role-name')
                .setDescription('select a role')
                .setRequired(true)
            )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const roleName = interaction.options.getRole('role-name');

        // Save new VC role to data file
        data.role = roleName;
        js.writeFileSync(D, data);

        await interaction.reply(`Role set to ${roleName}`);
    },
};