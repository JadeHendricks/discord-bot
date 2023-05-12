const dupe = require("./utilities/kickorbanuser");
require('dotenv').config();

module.exports = async (interaction, action) => {
    return kickorbanuser(interaction, action);
}
