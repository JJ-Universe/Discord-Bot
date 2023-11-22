const { ActivityType } = require("discord.js");
const client = require("../../client");

client.on("ready", async () => {
    console.log(`\n🟩 ${client.user.tag} is online!`);
    
    const activities = [
        { name: "WIP!", type: ActivityType.Watching },
        { name: `those coming into the server!`, type: ActivityType.Watching },
        // Add more activities here
    ];

    let activityIndex = 0;
    setInterval(() => {
        const activity = activities[activityIndex++ % activities.length];
        client.user.setPresence({
            activities: [activity],
            status: "dnd"
        });
    }, 30000);
})