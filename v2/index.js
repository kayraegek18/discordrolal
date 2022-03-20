const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS
    ]
});
const settings = require('./Source/Settings/settings.json');

client.on('ready', () => {
    client.user.setStatus('dnd');
    console.log(`${client.user.tag} named bot is active!`);

    const guildId = '951493798620450992';
    const guild = client.guilds.cache.get(guildId);
    let commands;

    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'rolalver',
        description: 'Rol alıp verme sistemin menüsünü çağırır.'
    })
});

client.on('interactionCreate', async interaction => {
    if (interaction.isButton()) {
        const member = interaction.member;
        if (!member) return;

        /* ROLES */
        const duyuru = '951522628835885116';
        const guncelleme = '951522632883388437';
        const cekilis = '951522633881624616';
        const kampanya = '951550376702803990';
        /* END ROLES */

        if (interaction.customId == 'Duyuru') {
            if (!member.roles.cache.get(duyuru)) {
                member.roles.add(duyuru);
                interaction.reply({ content: 'Rol verildi', components: [], ephemeral: true });
            } else {
                member.roles.remove(duyuru);
                interaction.reply({ content: 'Rol alındı', components: [], ephemeral: true });
            }
        } else if (interaction.customId == 'Guncelleme') {
            if (!member.roles.cache.get(guncelleme)) {
                member.roles.add(guncelleme);
                interaction.reply({ content: 'Rol verildi', components: [], ephemeral: true });
            } else {
                member.roles.remove(guncelleme);
                interaction.reply({ content: 'Rol alındı', components: [], ephemeral: true });
            }
        } else if (interaction.customId == 'Cekilis') {
            if (!member.roles.cache.get(cekilis)) {
                member.roles.add(cekilis);
                interaction.reply({ content: 'Rol verildi', components: [], ephemeral: true });
            } else {
                member.roles.remove(cekilis);
                interaction.reply({ content: 'Rol alındı', components: [], ephemeral: true });
            }
        } else if (interaction.customId == 'Kampanya') {
            if (!member.roles.cache.get(kampanya)) {
                member.roles.add(kampanya);
                interaction.reply({ content: 'Rol verildi', components: [], ephemeral: true });
            } else {
                member.roles.remove(kampanya);
                interaction.reply({ content: 'Rol alındı', components: [], ephemeral: true });
            }
        }
    } 
    if (!interaction.isCommand()) {
        return;
    }

    const { commandName, options } = interaction;
 
    if (commandName === 'rolalver') {
        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId('Duyuru')
            .setLabel('Duyuru')
            .setStyle('SUCCESS'),
            new Discord.MessageButton()
            .setCustomId('Guncelleme')
            .setLabel('Güncelleme')
            .setStyle('SUCCESS'),
            new Discord.MessageButton()
            .setCustomId('Cekilis')
            .setLabel('Çekiliş')
            .setStyle('SUCCESS'),
            new Discord.MessageButton()
            .setCustomId('Kampanya')
            .setLabel('Kampanya')
            .setStyle('SUCCESS')
        )

        const embed = new Discord.MessageEmbed()
        .setTitle('Caves Bildirim Rolleri')
        .setDescription('Sunucu veya site içerisinde olup bitenlerden haberdar olmak istiyorsanız, bunu etiket rollerimizle yapabilirsiniz! Bildirimini almak istediğiniz olayın butonuna tıklamanız yeterlidir. Botumuz profilinizi otomatik olarak ayarlayacaktır.')
        .setColor('GREEN')

        interaction.reply({ content: 'Menü mevcut kanala çağrıldı!', ephemeral: true })
        interaction.channel.send({ embeds: [embed], components: [row] })
    }
})

client.login(settings.botToken);
