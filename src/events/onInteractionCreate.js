const imageGeneration = require("../community/image-generate");
const kickOrBanUser = require("../moderation/kickorbanuser");

module.exports = (client) => {
    client.on("interactionCreate", (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        switch(interaction.commandName) {
            case "ban":
            case "kick":
                kickOrBanUser(interaction, interaction.commandName);
                break;
            case "image-generate":
                imageGeneration(interaction);
                break;
            default:
                break;
        }
    });
}