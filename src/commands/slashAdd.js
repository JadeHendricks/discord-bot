const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "add",
    description: "Adds two numbers.",
    options: [
        {
            name: "first-number",
            description: "The first number",
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: "second-number",
            description: "The second number",
            type: ApplicationCommandOptionType.Number,
            required: true
        }
    ]
}