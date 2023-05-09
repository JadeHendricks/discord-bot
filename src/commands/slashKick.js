const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "kick",
    description: "Kicks a member from this server.",
    options: [
        {
            name: "target-user",
            description: "The user you want to kick.",
            type: ApplicationCommandOptionType.Mentionable,
            required: true
        },
        {
            name: "reason",
            description: "The reason you want kick.",
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ]
}