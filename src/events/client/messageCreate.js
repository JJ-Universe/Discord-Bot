const client = require("../../client");
const { PermissionsBitField } = require("discord.js");
const handleCooldown = require('../../functions/cooldown');
const { clientPrefix, developers, ENV } = require("../../config/index")

client.on("messageCreate", async (message) => {
    let cmd;
    try {
        if (message.author.bot || !message.guild || !message.content.startsWith(clientPrefix)) {
            return;
        }

        const args = message.content.slice(clientPrefix.length).trim().split(/ +/g);
        cmd = args.shift().toLowerCase();
        const command = client.commands.get(cmd) || client.commands.find(command => command.aliases && command.aliases.includes(cmd));

        if (cmd.length === 0) return;

        if (!command) command = client.commands.get(client.aliases.get(cmd))

        if (!command) {
            return message.channel.send(`:x: ${cmd} is not a valid command`);
        }1

        const cooldownMessage = handleCooldown(message.author, command);
        if (cooldownMessage) return message.channel.send(`:x: ${cooldownMessage}`);

        if (command) {
            const { name, developerOnly, userPermissions, clientPermissions } = command;

            const cooldownMessage = handleCooldown(message.author, command);
            if (cooldownMessage) return message.reply(cooldownMessage);

            const developerOnlyMessage = checkDeveloperOnly(message.author, command);
            if (developerOnlyMessage) return message.channel.send(`:x: ${developerOnlyMessage}`);

            const userPermissionsMessage = checkUserPermissions(message.channel, message.member, command);
            if (userPermissionsMessage) return message.channel.send(`:x: ${userPermissionsMessage}`);

            const clientPermissionsMessage = checkClientPermissions(message.channel, message.guild.me, command);
            if (clientPermissionsMessage) return message.channel.send(`:x: ${clientPermissionsMessage}`);
        }

        await command.execute(message, args);
    } catch (error) {
        console.error(`Error executing command ${cmd}:`, error);

        const errorMessage = ENV === 'development'
            ? `There was an error while executing this command: ${error.message}`
            : 'There was an error while executing this command!';

        await message.channel.send(`:x: ${errorMessage}`);
    }
});