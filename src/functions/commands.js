const { readdirSync } = require('fs');

async function loadCommands(client) {
    console.log("🟦 Loading commands...");

    readdirSync('./src/commands/').forEach(dir => {
        const commands = readdirSync(`./src/commands/${dir}`).filter(file => file.endsWith('.js'));

        for (const file of commands) {
            const pull = require(`../commands/${dir}/${file}`);

            if (pull.name) {
                pull.category = dir;
                client.commands.set(pull.name, pull);
                console.log(`🟩 Loaded Command : ${pull.name}`);
            } else {
                console.log(`🟥 Couldn't load the command ${file}, error: Missing a name.`);
            }
        }
    });
}

async function loadSlashCommands(client) {
    console.log("🟦 Loading slash commands...");

    readdirSync('./src/slashCommands/').forEach(dir => {
        const commands = readdirSync(`./src/slashCommands/${dir}`).filter(file => file.endsWith('.js'));

        for (const file of commands) {
            const pull = require(`../slashCommands/${dir}/${file}`);

            if (pull.name) {
                pull.category = dir;
                client.slashCommands.set(pull.name, pull);
                console.log(`🟩 Loaded Slash Command : ${pull.name}`);
            } else {
                console.log(`🟥 Couldn't load the slash command ${file}, error: Missing a name.`);
            }
        }
    });
}

module.exports = { loadCommands, loadSlashCommands };