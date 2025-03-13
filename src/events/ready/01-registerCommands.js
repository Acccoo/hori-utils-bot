const { ENV_VARS } = require('environment');
const getLocalCommands = require('@utils/getLocalCommands');
const getApplicationCommands = require('@utils/getApplicationCommands');
const areCommandsDifferent = require('@utils/areCommandsDifferent');
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
const rest = new REST({ version: '10' }).setToken(ENV_VARS.TOKEN);

module.exports = async (client) => {
    try {
        console.log('🔄 Updating commands...');
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client, ENV_VARS.TEST_SERVER_ID);

        for (const localCommand of localCommands) {
            const { name, description, options } = localCommand;
            const existingCommand = await applicationCommands.cache.find((command) => command.name === name);

            if (existingCommand) {
                // Elimina el comando del applicationCommands si estaba marcado como borrado
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`❌ Deleted command: ${name}`);
                    continue;
                }

                // Edita el comando en applicationCommands si coincide en nombre pero difiere en algo más
                if (areCommandsDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options
                    });

                    console.log(`🔀 Edited command ${name}`);
                }
            } else {
                // Añade el comando a applicationCommands si no está marcado como eliminado
                if (localCommand.deleted) {
                    console.log(`⏩ Skipping registering command "${name}" as it's set to delete.`);
                    continue;
                }

                // Clase GuildApplicationCommandManager
                await applicationCommands.create({
                    name,
                    description,
                    options
                });

                console.log(`✔ Command "${name}" registered successfully.`);
            }
        }
    } catch (error) {
        console.error('⛔ There was an error registering commands: ', error);
    }
};