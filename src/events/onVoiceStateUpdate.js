require("dotenv").config();
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

module.exports = (client) => {
client.on('voiceStateUpdate', async (oldState, newState) => {
    if (newState.member.user.bot) return; // Ignore if it's another bot joining
    if (newState.member.id === process.env.DEVELOPER_ID && newState.channel) {
      try {
        connection = joinVoiceChannel({
          channelId: newState.channel.id,
          guildId: newState.guild.id,
          adapterCreator: newState.guild.voiceAdapterCreator,
        });
        // const audioPlayer = createAudioPlayer();
        // const audioResource = createAudioResource('../wwwroot/audio/test.mp3');
        // audioPlayer.play(audioResource);
        // connection.subscribe(audioPlayer);
      } catch (error) {
        console.error(`Error joining voice channel: ${error}`);
      }
    } else if (oldState.member.id === process.env.DEVELOPER_ID && connection) {
      connection.destroy();
      connection = null;
    }
  });
}