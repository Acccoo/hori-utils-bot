const { ENV_VARS } = require('environment');
const { Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } =  require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

const roles = [
    {
        id: '1296554446859403296',
        label: 'Alfas'
    }
];

client.on('ready', async (c) => {
    try {
        const channel = await client.channels.cache.get('1292564274249601115');
        if (!channel) return;

        const row = new ActionRowBuilder();         // Tutorial de creación de una línea con botones

        roles.forEach(role => {
            row.components.push(
                new ButtonBuilder()
                    .setCustomId(role.id)
                    .setLabel(role.label)
                    .setStyle(ButtonStyle.Primary)
            );
        });

        await channel.send({
            content: 'Reclama o elimina tu rol favorito',
            components: [row]
        });

        process.exit();
    } catch (error) {
        console.error(error);
    }
});

client.login(ENV_VARS.TOKEN);
