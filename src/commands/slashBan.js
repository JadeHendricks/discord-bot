const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "ban",
    description: "Bans a member from this server.",
    options: [
        {
            name: "target-user",
            description: "The user you want to ban.",
            type: ApplicationCommandOptionType.Mentionable,
            required: true
        },
        {
            name: "reason",
            description: "The reason you want ban.",
            type: ApplicationCommandOptionType.String
        }
    ]
}