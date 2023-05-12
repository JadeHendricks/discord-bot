const { EmbedBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY
});

const openai = new OpenAIApi(configuration);

module.exports = async (interaction) => {

    await interaction.deferReply();

    const prompt = interaction.options.getString("prompt");

    try {
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: `512x512`
        });

        const image = response.data.data[0].url;

        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle(`Here's your image of a \`\`\`${prompt}\`\`\``)
            .setImage(image)
            .setTimestamp()
            .setFooter({ text: `Image Generator`})

        await interaction.editReply({ embeds: [embed] })

    } catch (error) {
        console.error("community::image-generate - ", error.message);
    }
}
