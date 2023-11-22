const { PermissionsBitField } = require("discord.js");
const { developers } = require("../config/index")

function checkDeveloperOnly(user, command) {
    if (command.developerOnly && !developers.includes(user.id)) {
        return `${command.name} is a developer only command`;
    }
}

function checkUserPermissions(channel, member, command) {
    if (command.userPermissions && !channel.permissionsFor(member).has(PermissionsBitField.resolve(command.userPermissions || []))) {
        return `You do not have the required permissions to use this command. You need the following permissions: ${command.userPermissions.join(", ")}`;
    }
}

function checkClientPermissions(channel, client, command) {
    if (command.clientPermissions && !channel.permissionsFor(client).has(PermissionsBitField.resolve(command.clientPermissions || []))) {
        return `I do not have the required permissions to execute this command. I need the following permissions: ${command.clientPermissions.join(", ")}`;
    }
}

module.exports = { checkDeveloperOnly, checkUserPermissions, checkClientPermissions };