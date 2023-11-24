module.exports = {
    name: 'eval',
    description: 'Executes JavaScript code',
    developerOnly: true,

    run: async (client, interaction, args) => {
        const code = args.join(' ');
        try {
            const result = eval(code);
            interaction.reply(`\`\`\`js\n${result}\n\`\`\``);
        } catch (error) {
            interaction.reply(`\`\`\`xl\n${error}\n\`\`\``);
        }
    },
};