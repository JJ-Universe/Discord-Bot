module.exports = {
    name: 'debug',
    description: 'Displays debug information about a command',
    developerOnly: true,

    run: async (client, interaction, args, commandName) => {
        const command = interaction.client.slashCommands.get(commandName);

        if (!command) {
            return interaction.reply(`There is no command with name or alias \`${commandName}\`, ${interaction.user}`);
        }

        interaction.reply(`Name: ${command.name}\nDescription: ${command.description}`);
    },
};