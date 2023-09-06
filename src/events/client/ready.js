const { ActivityType } = require("discord.js");
const client = require("../../client");

client.on("ready", async () => {
    console.log(`\n🟩 ${client.user.tag} is online!`);

    client.user.setPresence({
        activities: [
            {
                name: "WIP",
                type: ActivityType.Playing
            }
        ],
        status: "online"
    })
})