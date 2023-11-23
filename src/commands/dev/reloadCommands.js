const { Client, Message } = require("discord.js");
const { reloadCommands } = require("../../functions/reloads");

module.exports = {
    name: "reloadcommand",
    description: "Reloads all commands",
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
        
        const output = await reloadCommands(client, command);

        return message.reply(output);
    }
}