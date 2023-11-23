const client = require("../client");
const fs = require('fs');
const path = require('path');

async function reloadCommands(client, name) {
    try{
        if (name) {
            // Reload specific command
            const command = client.commands.get(name) || client.commands.find(command => command.aliases && command.aliases.includes(name));

            if (!command) return new Error(`Command \`${name}\` doesn't exist, nor is it an alias.`)

            const commandPath = path.join(__dirname, `../commands/${command.category}/${command.name}.js`);

            if (!fs.existsSync(commandPath)) {
                return `Command file not found: ${commandPath}`;
            }

            delete require.cache[require.resolve(commandPath)];
            client.commands.delete(command.name);

            const newCommand = require(commandPath);

            try {
                if (!newCommand.name || !newCommand.description) {
                    return `Couldn't reload the command ${command.name}, error: Missing a name, description or run function.`
                }

                newCommand.category = command.category;
                client.commands.set(newCommand.name, newCommand);

                return `Reloaded command : ${newCommand.name}`
            } catch (err) {
                return `Couldn't reload the command ${command.name}, error: ${err}`
            }
        } else {
            // Reload all commands
            let output = '';
            client.commands.forEach((command) => {
                const commandPath = path.join(__dirname, `../commands/${command.category}/${command.name}.js`);

                if (!fs.existsSync(commandPath)) {
                    return `Command file not found: ${commandPath}`;
                }

                delete require.cache[require.resolve(commandPath)];
                const newCommand = require(commandPath);
                newCommand.category = command.category;
                client.commands.set(newCommand.name, newCommand);
                output += `Reloaded command : ${newCommand.name}\n`;
            });
            return output;
        }
    } catch (err) {
        console.error(err);
    }
}

async function reloadSlash(client, name) {
    try {
        if (name) {
            // Reload specific slash command
            const command = client.slashCommands.get(name) || client.slashCommands.find(cmd => cmd.aliases && cmd.aliases.includes(name));

            if (!command) return new Error(`Slash command \`${name}\` doesn't exist, nor is it an alias.`)

            const commandPath = path.join(__dirname, `../slashCommands/${command.category}/${command.name}.js`);

            if (!fs.existsSync(commandPath)) {
                return `Slash command file not found: ${commandPath}`;
            }

            delete require.cache[require.resolve(commandPath)];
            client.slashCommands.delete(command.name);

            const newCommand = require(commandPath);

            try {
                if (!newCommand.name || !newCommand.description) {
                    return `Couldn't reload the slash command ${command.name}, error: Missing a name, description or run function.`
                }

                newCommand.category = command.category;
                client.slashCommands.set(newCommand.name, newCommand);

                return `Reloaded slash command : ${newCommand.name}`
            } catch (err) {
                return `Couldn't reload the slash command ${command.name}, error: ${err}`
            }
        } else {
            // Reload all slash commands
            let output = '';
            client.slashCommands.forEach((command) => {
                const commandPath = path.join(__dirname, `../slashCommands/${command.category}/${command.name}.js`);

                if (!fs.existsSync(commandPath)) {
                    return `Slash command file not found: ${commandPath}`;
                }

                delete require.cache[require.resolve(commandPath)];
                const newCommand = require(commandPath);
                newCommand.category = command.category;
                client.slashCommands.set(newCommand.name, newCommand);
                output += `Reloaded slash command : ${newCommand.name}\n`;
            });
            return output;
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    reloadCommands,
    reloadSlash
}