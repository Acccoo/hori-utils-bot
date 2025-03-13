const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'hello',
    description: 'Saluda a alguien',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // deleted: Boolean
    options: [
        {
            name: 'user',
            description: 'El usuario a saludar',
            type: ApplicationCommandOptionType.User,  // Asignar el tipo según el enumerado de discord.js
            required: false
        }
    ],
    permissionsRequired: [PermissionFlagsBits.SendMessages],        // Añadido el permiso requerido solo como ejemplo

    callback: (client, interaction) => {
        const member = interaction.options.getMember('user') || interaction.member;
        const name = member.nickname || member.user.globalName || member.user.username;

        interaction.reply(`Saludos ${name}`);
    }
};