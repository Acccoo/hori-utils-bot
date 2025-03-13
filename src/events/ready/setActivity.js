const { ActivityType } = require('discord.js');

module.exports = (client) => {
    client.user.setActivity({
        name: 'que esto funcione',
        type: ActivityType.Watching
    });
}