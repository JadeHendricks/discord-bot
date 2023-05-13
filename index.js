require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const onReady = require('./src/events/onReady');
const onMessageCreate = require('./src/events/onMessageCreate');
const onInteractionCreate = require('./src/events/onInteractionCreate');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

//runs when the bot is initialized
onReady(client);
onMessageCreate(client);
onInteractionCreate(client);

//logging the bot into discord
client.login(process.env.TOKEN);