const { Client, Message } = require("discord.js");
const { reloadSlash } = require("../../functions/reloads");

module.exports = {
    name: "reloadslash",
    description: "Reloads a slash command",
    developerOnly: true,

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const command = args && args[0] ? args[0] : null;
        if (command && !client.commands.has(command)) {
            return message.reply(`Command not found: ${command}`);
        }
        
        const output = await reloadSlash(client, command);

        return message.reply(output);
    }
}