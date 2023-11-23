const { PermissionsBitField } = require("discord.js");
const client = require("../../client");
const { checkDeveloperOnly, checkUserPermissions, checkClientPermissions } = require('../../functions/commandChecks');
const { developers, ENV } = require("../../config/index")

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    try {
        const command = client.slashCommands.get(interaction.commandName)

        if (!command) {
            return interaction.reply({
                content: `${interaction.commandName} is not a valid command`,
                ephemeral: true,
            });
        }

        const developerOnlyMessage = checkDeveloperOnly(interaction.user, command);
        if (developerOnlyMessage) return interaction.reply({ content: developerOnlyMessage, ephemeral: true });

        const userPermissionsMessage = checkUserPermissions(interaction.channel, interaction.member, command);
        if (userPermissionsMessage) return interaction.reply({ content: userPermissionsMessage, ephemeral: true });

        const clientPermissionsMessage = checkClientPermissions(interaction.channel, interaction.guild.me, command);
        if (clientPermissionsMessage) return interaction.reply({ content: clientPermissionsMessage, ephemeral: true });

        // Execute command
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error executing command ${interaction.commandName}:`, error);

        const errorMessage = ENV === 'development'
            ? `There was an error while executing this command: ${error.message}`
            : 'There was an error while executing this command!';

        await interaction.reply({ content: errorMessage, ephemeral: true });
    }
});