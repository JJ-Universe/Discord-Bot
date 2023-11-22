const client = require("../client");

async function reloadCommands(client, name) {
    try{
    if (name) {
        // Reload specific command
        const command = client.commands.get(cmd) || client.commands.find(command => command.aliases && command.aliases.includes(cmd));

        if (!command) return new Error(`Command \`${name}\` doesn't exist, nor is it an alias.`)

        delete require.cache[require.resolve(`../commands/${command.category}/${command.name}.js`)];
        client.commands.delete(command.name);

        const newCommand = require(`../commands/${command.category}/${command.name}.js`);

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
            delete require.cache[require.resolve(`../commands/${command.category}/${command.name}.js`)];
            const newCommand = require(`../commands/${command.category}/${command.name}.js`);
            newCommand.category = command.category;
            client.commands.set(newCommand.name, newCommand);
            output += `Reloaded command : ${newCommand.name}\n`;
        });
        return output;
    }
    } catch (error) {
        console.error(`Error reloading slash command ${name}:`, error);
        return `Error reloading slash command ${name}: ${error.message}`;
    }
}

async function reloadSlash(client, name) {
    try{
    if (name) {
        // Reload specific slash command
        const command = client.commands.get(cmd) || client.commands.find(command => command.aliases && command.aliases.includes(cmd));

        if (!command) return new Error(`Slash command \`${name}\` doesn't exist, nor is it an alias.`)

        delete require.cache[require.resolve(`../slashCommands/${command.category}/${command.name}.js`)];
        client.slashCommands.delete(command.name);

        const newCommand = require(`../slashCommands/${command.category}/${command.name}.js`);

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
            delete require.cache[require.resolve(`../slashCommands/${command.category}/${command.name}.js`)];
            const newCommand = require(`../slashCommands/${command.category}/${command.name}.js`);
            newCommand.category = command.category;
            client.slashCommands.set(newCommand.name, newCommand);
            output += `Reloaded slash command : ${newCommand.name}\n`;
        });
        return output;
    }
    } catch (error) {
        console.error(`Error reloading slash command ${name}:`, error);
        return `Error reloading slash command ${name}: ${error.message}`;
    }
}

module.exports = {
    reloadCommands,
    reloadSlash
}