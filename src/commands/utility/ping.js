const { Client, Message } = require("discord.js");
const { reloadSlash } = require("../../functions/reloads");

module.exports = {
    name: "ping",
    description: "Ping command",
    developerOnly: false,

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const msg = await message.channel.send('Pinging...');
        const latency = msg.createdTimestamp - message.createdTimestamp;
        msg.edit(`Pong! Latency is ${latency}ms.`);
    }
}