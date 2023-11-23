const { ApplicationCommandOptionType } = require("discord.js");
const { reloadCommands } = require("../../functions/reloads");

module.exports = {
    name: "reloadcommand",
    description: "Reloads a command",
    developerOnly: true,
    options: [
        {
            name: "command",
            description: "The command to reload",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run: async (client, interaction, args) => {
        const command = args && args[0] ? args[0] : null;
        if (command && !client.commands.has(command)) {
            return message.reply(`Command not found: ${command}`);
        }
        
        const output = await reloadCommands(client, command);
        
        interaction.reply(output);
    }
}