module.exports = {
    name: 'eval',
    description: 'Executes JavaScript code',
    developerOnly: true,
    options: [
        {
            name: 'code',
            type: 'STRING',
            description: 'The code to execute',
            required: true,
        },
    ],

    run: async (client, interaction, args) => {
        const code = interaction.options.getString('code');
        try {
            const result = eval(code);
            interaction.reply(`\`\`\`js\n${result}\n\`\`\``);
        } catch (error) {
            interaction.reply(`\`\`\`xl\n${error}\n\`\`\``);
        }
    },
};