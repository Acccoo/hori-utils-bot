const path = require('path');
const getAllFiles = require('@utils/getAllFiles');

const EVENTS_DIRECTORY = path.join(__dirname, '..', 'events');

module.exports = (client) => {
    const eventFolders = getAllFiles(EVENTS_DIRECTORY, true);

    for (const eventFolder of eventFolders) {
        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();     // Reemplaza los \\ de Windows por / del resto de sistemas
        const eventFiles = getAllFiles(eventFolder);

        eventFiles.sort((a, b) => a > b);

        client.on(eventName, async (arg) => {
            for (const eventFile of eventFiles) {
                const eventFunction = require(eventFile);
                await eventFunction(client, arg);
            }
        });
    }
};