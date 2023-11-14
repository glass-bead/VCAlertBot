const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, PermissionFlagsBits, Component, ComponentType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mode')
        .setDescription('Toggle the notification mode for VC joins.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const select = new StringSelectMenuBuilder()
            .setCustomId('mode')
            .setPlaceholder('Select a mode')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Empty Channels Only')
                    .setDescription('Notifications are sent only when a member joins an empty VC.')
                    .setValue('empty'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('All joins')
                    .setDescription('Notifications are sent every time a member joins a VC.')
                    .setValue('all'),
            );

        const row = new ActionRowBuilder()
            .addComponents(select);

        const response = await interaction.reply({
            content: 'Choose whether notifications are sent only when a member joins an empty voice channel or every time someone joins a voice channel (**Note:** Empty Channels Only is selected by default)',
            components: [row],
        });

        // Collect responses
        const filter = (click) => {return click.user.id === interaction.user.id;}
        let collector = response.createMessageComponentCollector({
            filter,
            max: "1",
            time: 60000
        });

        collector.on("collect", (collection) => {
            global.VCMode = collection.values[0]; // change VC mode
        });

        collector.on('end', async (collected, reason) => {
            let message = (reason === 'time') ? '⚠️ Your action could not be completed. Please try again. ⚠️' : 'Your input has been submitted.';
            
            await interaction.editReply({
                content: message,
                components: []
            }); 
        });
    },
};