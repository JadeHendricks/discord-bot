module.exports = (client) => {
    client.on("messageCreate", (message) => {
        if (message.author.bot) return;
        // if (message.content === "BOT") return message.reply("Hey");
        // if (message.content === "What's up homie?") return message.reply("Hahaha nothing much dude, just chilling in your mothers bed for the night.");
        // if (message.content === "...") return message.reply("EZ lol.");
        if (message.content.toLowerCase().includes("dragonic") || message.content.toLowerCase().includes("exavia")) return message.reply("Dragonic is taking a ruk. Please try again later.");
    });
}