const { ENV_VARS } = require('environment');
const getLocalCommands = require('@utils/getLocalCommands');

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;      // Si no hay interacción no hay nada que hacer

    const localCommands = getLocalCommands();

    try {
        const command = localCommands.find((command) => command.name === interaction.commandName);
        if (!command) return;       // Si no existe el comando introducido no hay nada que hacer

        if (command.devOnly) {      // Flag propia para no permitir su uso a todo el mundo
            if (!ENV_VARS.DEVS.include(interaction.member.id)) {
                interaction.reply({
                    content: 'Solo los desarrolladores tienen permitido utilizar este comando.',
                    ephemeral: true
                });
                return;
            }
        }

        if (command.testOnly) {      // Flag propia para no permitir su uso en cualquier servidor
            if (!ENV_VARS.TEST_SERVER_ID === interaction.guild.id) {
                interaction.reply({
                    content: 'Este comando no se puede ejecutar aquí.',
                    ephemeral: true
                });
                return;
            }
        }

        if (command.permissionsRequired?.length) {      // Controlar que el usuario no intente ejecutar un comando para el cual no tiene permisos
            for (const permission of command.permissionsRequired) {
                if (!interaction.member.permissions.has(permission)) {
                    interaction.reply({
                        content: 'No tienes suficientes permisos para ejecutar este comando',
                        ephemeral: true
                    });
                    return;
                }
            }
        }

        if (command.botPermissions?.length) {      // Controlar que el bot tenga los permisos necesarios para ejecutar el comando
            for (const permission of command.botPermissions) {
                const bot = interaction.guild.members.me;

                if (!bot.permissions.has(permission)) {
                    interaction.reply({
                        content: 'No tengo suficientes permisos para ejecutar este comando',
                        ephemeral: true
                    });
                    return;
                }
            }
        }

        await command.callback(client, interaction);
    } catch (error) {
        console.log(`⛔ There was an error running this command ${error}`);
    }
}