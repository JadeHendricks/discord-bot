const ban = require("../moderation/ban");
const kick = require("../moderation/kick");
const imageGeneration = require("../community/image-generate");

module.exports = (client) => {
    client.on("interactionCreate", (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === "ban") {
            ban(interaction, interaction.commandName);
            return;
        }
        
        if (interaction.commandName === "kick") {
            kick(interaction, interaction.commandName);
            return;
        }

        if (interaction.commandName === "image-generate") {
            imageGeneration(interaction);
            return;
        }
    });
}