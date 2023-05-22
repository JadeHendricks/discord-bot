require("dotenv").config();
const { AttachmentBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const imagegenerationKeys = require("../data/imagegenerationKeys");

const context = "You are a friendly chatbot in Discord.";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY
});

const openai = new OpenAIApi(configuration);
const msgLengthLimit = 500;
const channels = [process.env.BOTCHANNEL_ID, process.env.BOTCHANNEL2_ID];

module.exports = (client) => {
    client.on("messageCreate", async (message) => {
        try {
            const mentionedBot = message.mentions.members.has(process.env.CLIENT_ID);

            if (mentionedBot && messageValidationChecks(message)) {

                await message.channel.sendTyping();

                let prevMessages = await message.channel.messages.fetch({ limit: 15 });
                prevMessages = prevMessages.sort((a, b) => a - b);

                let conversationLog = [{ role: "system", content: context }];

                prevMessages.forEach((msg) => {
                    if (msg.content.startsWith("!")) return;
                    if (msg.content.length > msgLengthLimit) return;
                    if (msg.author.id !== client.user.id && message.author.bot) return;

                    // If msg is from the bot (client) itself
                    if (msg.author.id === client.user.id) {
                        conversationLog.push({
                            role: "assistant",
                            content: `${msg.content}`,
                        });
                    }

                    // If msg is from a regular user
                    else {
                        if (msg.author.id !== message.author.id) return;

                        conversationLog.push({
                            role: "user",
                            content: `${msg.content}`,
                        });
                    }
                });

                const res = await openai.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    messages: conversationLog,
                });

                let reply = res.data.choices[0].message?.content;

                if (reply?.length > 2000) {
                    // If the reply length is over 2000 characters, send a txt file.
                    const buffer = Buffer.from(reply, 'utf8');
                    const txtFile = new AttachmentBuilder(buffer, { name: `${message.author.tag}_response.txt` });

                    message.reply({ files: [txtFile] }).catch(() => {
                        message.channel.send({ content: `${message.author}`, files: [txtFile] });
                    });
                } else {
                    message.reply(reply).catch(() => {
                        message.channel.send(`${message.author} ${reply}`);
                    });
                }
            }
        } catch (error) {
            message.reply(`Something went wrong. Try again in a bit or upgrade to our paid plan for 24/7 usage.`).then((msg) => {
                setTimeout(async () => {
                    await msg.delete().catch(() => null);
                }, 5000);
            });

            console.error("events::onMessageCreate - ", error.message);
        }
    });
}

function messageValidationChecks(message) {
    if (message.author.bot) return;
    if (!channels.includes(message.channel.id)) return;
    if (message.content.startsWith("!")) return;

    if (message.content.length > msgLengthLimit) {
        message.reply("Whoa now, I'm not going to read all that. Maybe summarize?");
        return;
    }

    if (new RegExp(imagegenerationKeys.join("|")).test(message.content.toLowerCase())) {
        message.reply("Hey there, I am just a chatbot when it comes to @ing me. If you're looking to generate an image, you can use one of my slash commands :)");
        return;
    }

    return true;
}