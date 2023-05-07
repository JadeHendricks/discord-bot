module.exports = (client) => {
    client.on("interactionCreate", (interaction) => {
        console.log(interaction)
        if (!interaction.isChatInputCommand()) return;
    
        if (interaction.commandName === "add") {
            const num1 = interaction.options.get("first-number").value;
            const num2 = interaction.options.get("second-number").value;
    
            return interaction.reply(`The sum of those two numbers are ${num1 + num2}`);
        }
    });
}