const path = require('path');
const getAllFiles = require('@utils/getAllFiles');

const COMMANDS_DIRECTORY = path.join(__dirname, '..', 'commands');

module.exports = (exceptions = []) => {
    let localCommands = [];
    const commandCategories = getAllFiles(COMMANDS_DIRECTORY, true);

    for (commandCategorie of commandCategories) {
        const commandFiles = getAllFiles(commandCategorie);

        for (commandFile of commandFiles) {
            const command = require(commandFile);       // Siempre debería ser un objeto

            if (!exceptions.includes(command.name)) {
                localCommands.push(command);
            }
        }
    }

    return localCommands;
};