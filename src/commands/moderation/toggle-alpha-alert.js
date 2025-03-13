const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'toggle-alpha-alert',
    description: 'Activa o desactiva las notificaciones de Alfas para un rol específico',
    // devOnly: Boolean,
    // testOnly: Boolean,
    options: [
        {
            name: 'role',
            description: 'El rol a notificar',
            type: ApplicationCommandOptionType.Role,
            required: true
        }
    ],
    permissionsRequired: [PermissionFlagsBits.MentionEveryone],
    botPermissions: [PermissionFlagsBits.MentionEveryone],
    deleted: false,

    callback: (client, interaction) => {
        const role = interaction.options.getRole('role')?.id;
        console.log(role);
        interaction.reply(`Notificaciones de alfas activadas para el Rol <@&${role}>`);
    }
};