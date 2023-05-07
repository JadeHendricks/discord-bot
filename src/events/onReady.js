const statuses = require('../data/statuses');

const randomNumber = Math.floor(Math.random() * statuses.length);
const interval = 18000000;

module.exports = (client) => {
    client.once("ready", (client) => {
        console.log(`${client.user.tag} is online!`);
    
        //initially setting the bot
        client.user.setActivity(statuses[randomNumber]);
    
        setInterval(() => {
            client.user.setActivity(statuses[randomNumber]);
        }, interval)
        
    });
}