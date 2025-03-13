module.exports = {
    name: 'ping',
    description: `Reply with the bot's ping`,
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],
    // deleted: Boolean,

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();
        const ping = reply.createdTimestamp - interaction.createdTimestamp;

        const statusMessage = `Latencia de la API: ${client.ws.ping}ms\nLatencia del cliente: ${ping}ms`;
        await interaction.editReply({
            content: statusMessage
        });
    }
};