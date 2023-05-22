const { ActivityType } = require('discord.js');

const activityLists = {
    youtubeVideosList: ["mOGpVI-u8BY", "79WdAA6OJuw", "5qpCsvo2GSI", "kWXO3FgDuvM", "DInC047zMaQ", "y8X8p-LE2Rw"],
    moviesList: ["Shrek 2 on DVD", "Austin Powers 3", "Inception", "The Godfather", "A Bugs Life", "John Wick 4"],
    gamesList: ["Overwatch 2", "Spyro The Dragon", "Trackmania", "High On Life", "UNO", "Beat Saber", "DOTA 2"],
    listeningList: ["Spotify", "Livin' La Vida Loca", "I Look Good", "The Bare Necessities", "Rap God", "All I Want For Christmas"]
};

function generateRandomSelectionBasedOnList(mediaList, isLink = false) {
    
    const selectedListItem = mediaList[Math.floor(Math.random() * mediaList.length)];

    if (isLink) return `https://www.youtube.com/watch?v=${selectedListItem}`;

    return selectedListItem;
}

module.exports = [
    {
        name: "Youtube Videos",
        type: ActivityType.Streaming,
        url: generateRandomSelectionBasedOnList(activityLists.youtubeVideosList, true)
    },
    {
        name: generateRandomSelectionBasedOnList(activityLists.gamesList),
        type: ActivityType.Playing
    },
    {
        name: generateRandomSelectionBasedOnList(activityLists.moviesList),
        type: ActivityType.Watching
    },
    {
        name: generateRandomSelectionBasedOnList(activityLists.listeningList),
        type: ActivityType.Listening
    }
];