module.exports = {
    name: "shutdown",
    description: "Shuts down the bot and deletes all slash commands",
    developerOnly: true,

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        await message.channel.send('Shutting down...');

        const commands = await client.application.commands.fetch();

        commands.forEach(async (command) => {
            await client.application.commands.delete(command.id);
        });

        await message.channel.send('Shutdown complete.');

        process.exit();
    }
}