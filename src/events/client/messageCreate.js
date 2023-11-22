const client = require("../../client");
const { PermissionsBitField } = require("discord.js");
const handleCooldown = require('../../functions/commands/cooldown');
const { clientPrefix, developers } = require("../../config/index")

client.on("messageCreate", async (message) => {
    try {
        if (message.author.bot || !message.guild || !message.content.startsWith(clientPrefix)) {
            return;
        }

        const args = message.content.slice(clientPrefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        if (cmd.length === 0) return;

        let command = client.commands.get(cmd)

        if (!command) command = client.commands.get(client.aliases.get(cmd))

        if (command) {

            const { name, developerOnly, userPermissions, clientPermissions } = command;

            const cooldownMessage = handleCooldown(message.author, command);
            if (cooldownMessage) return interaction.reply(cooldownMessage);

            if (developerOnly && !developers.includes(message.author.id)) {
                return message.channel.send(`:x: ${name} is a developer only command`);
            }

            const checkPermissions = (permissions, subject, subjectType) => {
                if (permissions && !message.channel.permissionsFor(subject).has(PermissionsBitField.resolve(permissions))) {
                    return message.channel.send(`:x: ${subjectType} do not have the required permissions to use this command. You need the following permissions: ${permissions.join(", ")}`);
                }
            };

                if (checkPermissions(userPermissions, message.member, 'You') || checkPermissions(clientPermissions, message.guild.members.me, 'I')) return;
                }
    } catch (err) {
        console.log(`🟥 An error occurred while executing the messageCreate event:`)
        console.log(err)

        return message.channel.send(`:x: An error occurred while executing the messageCreate event:\n${err}`)
    }
})