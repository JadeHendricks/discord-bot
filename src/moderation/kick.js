const admins = require("../data/admins");
require('dotenv').config();

module.exports = async (interaction) => {
    if (interaction && Object.keys(interaction)) {
        const userWhoMadeRequest = interaction.user.id;
        const targetUserId = interaction.options.get("target-user").value;
        const reason = interaction.options.get("reason")?.value || "No reason provided";

        const targetUser = await interaction.guild.fetch(targetUserId);
    
        await interaction.deferReply()
    
        if (!admins.includes(interaction.user.id)) {
            await interaction.editReply("You do not have permissions to run this command.");
            return;
        };
        
        if (!targetUser) {
            await interaction.editReply(`Hi <@${userWhoMadeRequest}>, The user <@${targetUserId}> doesn't exist in this server.`);
            return;
        }
    
        if (targetUserId === interaction.guild.ownerId) {
            await interaction.editReply(`Hi <@${userWhoMadeRequest}>, you can't kick the owner of the server: <@${targetUserId}>`);
            return;
        }
    
        if (admins.includes(targetUserId)) {
            await interaction.editReply(`Hi <@${userWhoMadeRequest}>, you are not allowed to kick <@${targetUserId}>. Only the owner: <@${process.env.DRAGONIC_ID}> can do that manually.`);
            return;
        }
    
        if (targetUserId === process.env.DEVELOPER_ID) {
            await interaction.editReply("I cannot kick my creator.");
            return;
        }
    
        try {
            //await targetUser.kick(reason);
            //await interaction.editReply(`User ${targetUser} has been banned.\nReason: ${reason}`)
            await interaction.editReply(`User ${targetUser} has been kicked.\nReason: ${reason}`);
        } catch (error) {
            console.log(`There was an error when kicking: ${error}`);
        }
    }
}
