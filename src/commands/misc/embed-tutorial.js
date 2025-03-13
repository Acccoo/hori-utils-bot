const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'embed-tutorial',
    description: 'Responde con "Pong!"',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],
    // deleted: Boolean,

    callback: (client, interaction) => {    // Puro tutorial para embebidos
        const embed = new EmbedBuilder()
            .setTitle('Título embebido')
            .setDescription('Descripción embebida')
            .setColor('#e66cea')     // Random para color variable
            .addFields(
                {
                    name: 'Título del campo',
                    value: 'Valor inline',
                    inline: true
                },
                {
                    name: 'Título de otro campo',
                    value: 'Este también es inline',
                    inline: true
                },
                {
                    name: 'Título de otro campo',
                    value: 'Ahora si es inline',
                    inline: true
                },
            );

        interaction.reply({
            embeds: [
                embed
            ]
        });
    }
};