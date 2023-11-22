const { clientId, clientToken } = require("./config/index");
const { Client, Collection } = require('discord.js');
const { loadCommands, loadSlashCommands } = require('./functions/commands');
const { loadEvents } = require('./functions/events');

const client = new Client({
    intents: [
        "Guilds",
        "GuildMembers",
        "GuildMessages",
        "MessageContent"
    ]
});

client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();

(async () => {
    try {
        await loadCommands(client);
        await loadEvents(client);
        await loadSlashCommands(client);
    } catch (error) {
        console.error(`Error loading commands/events: ${error.message}`);
    }
})();

client.login(clientToken).catch((error) => {
    console.error("\n🟥 Couldn't login to the bot. Please check the config file.")
    console.error(error)
    process.exit(1);
})

process.on('unhandledRejection', error => {
    console.error("\n🟥 An unhandled rejection error occured.")
    console.error(error)
})

process.on('uncaughtException', error => {
    console.error("\n🟥 An uncaught exception error occured.")
    console.error(error)
})

module.exports = client;