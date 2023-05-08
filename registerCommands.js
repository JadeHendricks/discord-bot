require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

const commands = [
    {
        name: "add",
        description: "Adds two numbers.",
        options: [
            {
                name: "first-number",
                description: "The first number",
                type: ApplicationCommandOptionType.Number,
                required: true
            },
            {
                name: "second-number",
                description: "The second number",
                type: ApplicationCommandOptionType.Number,
                required: true
            }
        ]
    },
    {
        name: "ban",
        description: "Bans a member from this server.",
        options: [
            {
                name: "target-user",
                description: "The user you want to ban.",
                type: ApplicationCommandOptionType.Mentionable,
                required: true
            },
            {
                name: "reason",
                description: "The reason you want ban.",
                type: ApplicationCommandOptionType.String
            }
        ]
    },
    {
        name: "kick",
        description: "Kicks a member from this server.",
        options: [
            {
                name: "target-user",
                description: "The user you want to kick.",
                type: ApplicationCommandOptionType.Mentionable,
                required: true
            },
            {
                name: "reason",
                description: "The reason you want kick.",
                type: ApplicationCommandOptionType.String,
                required: false
            }
        ]
    }
];

const rest = new REST({version: "10"}).setToken(process.env.TOKEN);

(async() => {
    try {
        console.log("Registering slash commands", commands);
        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID, 
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        console.log("Slash commands were registered successfully!");
        
    } catch (error) {
        console.error(`There was an error registering commands: ${error.message}`);
    }
})();