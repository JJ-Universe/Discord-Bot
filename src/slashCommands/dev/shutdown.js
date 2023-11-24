const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "shutdown",
    description: "Shuts down the bot and deletes all slash commands",
    developerOnly: true,

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        await interaction.reply('Shutting down...');

        const commands = await client.application.commands.fetch();

        commands.forEach(async (command) => {
            await client.application.commands.delete(command.id);
        });

        await interaction.followUp('Shutdown complete.');

        process.exit();
    }
}