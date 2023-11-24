const { ApplicationCommandOptionType, Client, CommandInteraction } = require("discord.js");
const { reloadSlash } = require("../../functions/reloads");

module.exports = {
    name: "reloadslash",
    description: "Reloads a slash command",
    developerOnly: true,
    options: [
        {
            name: "command",
            description: "The slash command to reload",
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const command = args && args[0] ? args[0] : null;
        if (command && !client.commands.has(command)) {
            return interaction.reply(`Command not found: ${command}`);
        }
        
        const output = await reloadSlash(client, command);
        
        return interaction.reply(output);
    }
}