const admins = require("../../data/admins");
require('dotenv').config();

module.exports = (interaction, action) => {
    return moderationCode(interaction, action);
}

const moderationCode = async(interaction, action) => {
    if (interaction && Object.keys(interaction)) {

        const { requestUser, targetUserId, moderationReason } = getRequestDetails(interaction);
        await interaction.deferReply()
    
        console.log(validateRequest(interaction, requestUser, targetUserId, action));
        if (!await validateRequest(interaction, requestUser, targetUserId, action)) return;

        try {
            if (action === "kick") kickUser(interaction, moderationReason);
            if (action === "ban") banUser(interaction, moderationReason);
        } catch (error) {
            console.log(`There was an error during moderation: ${error}`);
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

const kickUser = async(interaction, moderationReason) => {
    //await interaction.guild.members.kick(targetUserId, reason)
    await interaction.editReply(`User has been kicked.\nReason: ${moderationReason}`)
}

const banUser = async(interaction, moderationReason) => {
    //await interaction.guild.bans.create(targetUserId, {reason});
    await interaction.editReply(`User has been banned.\nReason: ${moderationReason}`)
}

const validateRequest = async(interaction, requestUser, targetUserId, action) => {
    if (!admins.includes(interaction.user.id)) {
        await interaction.editReply("You do not have permissions to run this command.");
        return false;
    };

    if (targetUserId === interaction.guild.ownerId) {
        await interaction.editReply(`Hi <@${requestUser}>, you can't ${action} the owner of the server: <@${targetUserId}>`);
        return false;
    }

    if (targetUserId === process.env.DEVELOPER_ID) {
        await interaction.editReply(`I cannot ${action} my creator.`);
        return false;
    }

    if (admins.includes(targetUserId)) {
        await interaction.editReply(`Hi <@${requestUser}>, you are not allowed to ${action} <@${targetUserId}>. Only the owner: <@${process.env.DRAGONIC_ID}> can do that manually.`);
        return false;
    }
}