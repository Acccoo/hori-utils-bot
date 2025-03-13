module.exports = {
    name: 'ping',
    description: 'Responde con "Pong!"',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],
    // deleted: Boolean,

    callback: async (client, interaction) => {
        const message = await interaction.deferReply({
            fetchReply: true
        });
        const statusMessage = `Latencia de la API: ${client.ws.ping}ms\nLatencia del cliente: ${message.createdTimestamp - interaction.createdTimestamp}ms`;
        await interaction.editReply({
            content: statusMessage
        });
    }
};