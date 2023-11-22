const fs = require('fs');
const path = require('path');

function loadEvents(client, dir = '../events') {
    const eventFiles = fs.readdirSync(path.join(__dirname, dir));

    for (const file of eventFiles) {
        const fullPath = path.join(__dirname, dir, file);
        const stat = fs.lstatSync(fullPath);

        if (stat.isDirectory()) {
            // If file is a directory, recursive call to process the files
            loadEvents(client, path.join(dir, file));
        } else if (file.endsWith('.js')) {
            // If file is a JavaScript file
            const event = require(fullPath);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
        }
    }
}

module.exports = { loadEvents };