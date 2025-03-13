require('dotenv').config();

module.exports.ENV_VARS = {
    TOKEN: process.env.TOKEN,
    CLIENT_ID: process.env.CLIENT_ID,
    GUILD_ID: process.env.GUILD_ID,
    TEST_SERVER_ID: process.env.TEST_SERVER_ID,
    ROMS_URL: process.env.ROMS_URL,
    LINKTR_URL: process.env.LINKTR_URL,
    DEVS: process.env.DEVS,
};