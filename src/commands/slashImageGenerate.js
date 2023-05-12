const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "image-generate",
    description: "This generates an images using a promopt provided by you.",
    options: [
        {
            name: "prompt",
            description: "Describe what image you want to generate",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ]
}