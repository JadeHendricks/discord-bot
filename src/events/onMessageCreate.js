require('dotenv').config();

module.exports = (client) => {
    client.on("messageCreate", (message) => {

        const mentionedBot = message.mentions.members.has(process.env.CLIENT_ID);
        const isBot = message.author.bot;

        if (isBot) return;
        if (mentionedBot) {
            handleBotAtResponses(message);
            return;
        } else {
            if (message.content.toLowerCase().includes("dragonic") || message.content.toLowerCase().includes("exavia")) {
                return message.reply("Dragonic is taking a ruk. Please try again later.");
            }
        }
    });
}

function handleBotAtResponses(message) {
    const hasNoContent = message.content.endsWith(">");
    if (hasNoContent) {
        message.reply(`Hello <@${message.author.id}>, what can I help you with?`);
    } else {
        message.reply(`I'm current in Development please try again later.`);
    }
}