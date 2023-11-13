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
        global.VCRole = roleName;
        await interaction.reply(`Role set to ${roleName}`);
    },
};