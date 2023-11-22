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
        const command = args[0] || null;
        const output = await reloadCommands(command);

        return message.reply(output);
    }
}