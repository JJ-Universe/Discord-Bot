const os = require('os');

module.exports = {
    name: 'stats',
    description: 'Displays bot statistics',
    developerOnly: true,

    run: async (client, interaction, args) => {
        const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
        const uptime = process.uptime();

        interaction.reply(`Memory usage: ${memoryUsage.toFixed(2)} MB\nUptime: ${uptime.toFixed(2)} seconds`);
    },
};