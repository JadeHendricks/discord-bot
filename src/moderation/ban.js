const dupe = require("../moderation/utilities/dupe");
require('dotenv').config();

module.exports = async (interaction, action) => {
    return dupe(interaction, action);
}
