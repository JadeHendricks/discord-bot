require('dotenv').config();
const { REST, Routes } = require("discord.js");
const slashCommands = require("./src/commands/base/slashBase");

const rest = new REST({version: "10"}).setToken(process.env.TOKEN);
console.log("Registering slash commands", slashCommands);

(async() => {
    try {
        console.log("Registering slash commands", slashCommands);

        await rest.put(Routes.applicationGuildCommands(
            process.env.CLIENT_ID, 
            process.env.GUILD_ID
        ),
        { body: slashCommands });

        console.log("Slash commands were registered successfully!");

    } catch (error) {
        console.error(`There was an error registering commands: ${error.message}`);
    }
})();