const admins = require("../data/admins");
require('dotenv').config();

module.exports = (interaction, action) => {
    return kickOrBanUser(interaction, action);
}

const kickOrBanUser = async(interaction, action) => {
    if (interaction && Object.keys(interaction)) {

        const { requestUser, targetUserId, moderationReason } = getRequestDetails(interaction);
        await interaction.deferReply()
    
        if (!await validateRequest(interaction, requestUser, targetUserId, action)) return;

        try {
            handleModerationRequest(action, interaction, moderationReason);
        } catch (error) {
            console.error("moderation::utilites::kickOrBanUser - ", error.message);
        }
    }
}

const getRequestDetails = (interaction) => {
    return {
        requestUser: interaction.user.id,
        targetUserId: interaction.options.get("target-user").value,
        moderationReason: interaction.options.get("reason")?.value || "No reason provided"
    }
}

const handleModerationRequest = async(action, interaction, moderationReason) => {
    if (action === "kick") {
        //await interaction.guild.members.kick(targetUserId, reason)
        await interaction.editReply(`User has been kicked.\nReason: ${moderationReason}`)
        return;
    }

    //await interaction.guild.bans.create(targetUserId, {reason});
    await interaction.editReply(`User has been banned.\nReason: ${moderationReason}`)
}

const validateRequest = async(interaction, requestUser, targetUserId, action) => {
    switch (targetUserId) {
        case interaction.guild.ownerId:
            await interaction.editReply(`Hi <@${requestUser}>, you can't ${action} the owner of the server: <@${targetUserId}>`);
            break;
        case process.env.DEVELOPER_ID:
            await interaction.editReply(`I cannot ${action} my creator.`);
            break;
        default:
            if (!admins.includes(interaction.user.id)) {
                await interaction.editReply("You do not have permissions to run this command.");
                return;
            }
            if (admins.includes(targetUserId)) {
                await interaction.editReply(`Hi <@${requestUser}>, you are not allowed to ${action} <@${targetUserId}>. Only the owner: <@${process.env.DRAGONIC_ID}> can do that manually.`);
                return;
            }
            break;
    }
}