const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "",
    description: "",
    developerOnly: false,
    options: [
        {
            name: "",
            description: "",
            type: ApplicationCommandOptionType.String,
            required: true // or false
        }
    ],

    run: async (client, interaction, args) => {

    }
}