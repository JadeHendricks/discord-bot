const ban = require("../moderation/ban");
const kick = require("../moderation/kick");
const imageGeneration = require("../community/image-generate");

module.exports = (client) => {
    client.on("interactionCreate", (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        switch(interaction.commandName) {
            case "ban":
                ban(interaction, interaction.commandName);
                break;
            case "kick":
                kick(interaction, interaction.commandName);
                break;
            case "image-generate":
                imageGeneration(interaction);
                break;
            default:
                break;
        }
    });
}