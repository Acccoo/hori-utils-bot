require('module-alias/register');
const validateEnvVariables = require('@utils/validateEnvVariables');
const { Client, IntentsBitField } = require('discord.js');
const eventHandler = require('@handlers/eventHandler');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

eventHandler(client);
validateEnvVariables(client);