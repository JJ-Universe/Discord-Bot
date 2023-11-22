const { PermissionsBitField, Collection } = require("discord.js");
const client = require("../../client");
const handleCooldown = require('../../functions/commands/cooldown');
const { developers } = require("../../config/index")

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

        // Cooldown system
        const cooldownMessage = handleCooldown(interaction.user, command);
        if (cooldownMessage) return interaction.reply(cooldownMessage);

        // Developer only commands
        if (command.developerOnly && !developers.includes(interaction.user.id)) {
            return interaction.reply({
                content: `${interaction.commandName} is a developer only command`,
                ephemeral: true,
            });
        }

        // User permissions
        if (command.userPermissions && !interaction.channel.permissionsFor(interaction.member).has(PermissionsBitField.resolve(command.userPermissions || []))) {
            return interaction.reply({
                content: `You do not have the required permissions to use this command. You need the following permissions: ${command.userPermissions.join(", ")}`,
                ephemeral: true,
            });
        }

        // Client permissions
        if (command.clientPermissions && !interaction.channel.permissionsFor(interaction.guild.me).has(PermissionsBitField.resolve(command.clientPermissions || []))) {
            return interaction.reply({
                content: `I do not have the required permissions to execute this command. I need the following permissions: ${command.clientPermissions.join(", ")}`,
                ephemeral: true,
            });
        }

        // Execute command
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});