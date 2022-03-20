const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
});
const db = require('quick.db');
const { joinVoiceChannel } = require('@discordjs/voice');

client.roller = {
    koc: "946129011417944066",
    boga: "946129014031016067",
    ikizler: "946129015247372318",
    yengec: "946129016660844567",
    aslan: "946129018363732108",
    basak: "946129020469248041",
    terazi: "946129021664624721",
    akrep: "946129022734184528",
    yay: "946129023669514301",
    oglak: "946129024684548146",
    kova: "946129025196232755",
    balik: "946129026630697001"
}

client.renkler = {
    siyah: "946128921030688768",
    kirmizi: "946128921693392900",
    turuncu: "946128922783924345",
    sari: "946128923723464706",
    yesil: "946128925124337735",
    kapalimavi: "946128926437150720",
    acikmavi: "946128928374947861",
    acikpembe: "946128929293496361",
    kapalipembe: "946128930400788500"
}

client.on('ready', () => {
    client.user.setActivity('Vixay ❤️ Kayega', { type:"LISTENING" });
    client.user.setStatus('dnd');

    const guildId = '889605758130462731';
    const guild = client.guilds.cache.get(guildId);
    let commands;
    if (guild) {
        commands = guild.commands;
    } else {
        commands = client.application?.commands;
    }
    commands?.create({
        name: 'selection',
        description: "Spawn selection menu."
    })

    joinVoiceChannel({
        channelId: '946129031986806796',
        guildId: '889605758130462731',
        adapterCreator: client.guilds.cache.get('889605758130462731').voiceAdapterCreator,
        selfDeaf: false
    })

    console.log(`${client.user.tag} is online!`);
});

client.on('interactionCreate', async (interaction) => {
    setTimeout(() => {
        db.delete(`Timeout.${interaction.member.id}`);
    }, 3500)
    if (db.has(`Timeout.${interaction.member.id}`)) {
        if (db.get(`Timeout.${interaction.member.id}`) == 1) {
            if (interaction.replied) {
                interaction.editReply({
                    content: "Lütfen biraz bekleyip tekrar deneyiniz!",
                    ephemeral: true
                })
            } else {
                interaction.reply({
                    content: "Lütfen biraz bekleyip tekrar deneyiniz!",
                    ephemeral: true
                })
            }
        } else if (db.get(`Timeout.${interaction.member.id}`) > 1) {
            if (interaction.replied) {
                interaction.editReply({
                    content: "Lütfen biraz bekleyip tekrar deneyiniz!",
                    ephemeral: true
                })
            } else {
                interaction.reply({
                    content: "Lütfen biraz bekleyip tekrar deneyiniz!",
                    ephemeral: true
                })
            }
        }
        return;
    }

    if (!interaction.isCommand()){
        if (interaction.isButton()) {
            if (interaction.customId == 'crany') {
                const member = client.guilds.cache.get('889605758130462731').roles.cache.get('948294087499452416');
                const cranymember = client.guilds.cache.get('889605758130462731').roles.cache.get('948290345169457232');
                if (member && cranymember) {
                    interaction.member.roles.add(member);
                    interaction.member.roles.add(cranymember);
                    interaction.reply({
                        content: 'Başarılıyla rolün verildi iyi eğlenceler!',
                        ephemeral: true
                    })
                }
            } else if (interaction.customId == 'community') {
                const member = client.guilds.cache.get('889605758130462731').roles.cache.get('948295026037907486');
                const communitymember = client.guilds.cache.get('889605758130462731').roles.cache.get('948291047379853322');
                if (member && communitymember) {
                    interaction.member.roles.add(member);
                    interaction.member.roles.add(communitymember);
                    interaction.reply({
                        content: 'Başarılıyla rolün verildi iyi eğlenceler!',
                        ephemeral: true
                    })
                }
            } else if (interaction.customId == 'pub') {
                const member = client.guilds.cache.get('889605758130462731').roles.cache.get('948295915360366702');
                const pubmember = client.guilds.cache.get('889605758130462731').roles.cache.get('948291111871475832');
                if (member && pubmember) {
                    interaction.member.roles.add(member);
                    interaction.member.roles.add(pubmember);
                    interaction.reply({
                        content: 'Başarılıyla rolün verildi iyi eğlenceler!',
                        ephemeral: true
                    })
                }
            }
            const a = interaction.member.roles.cache.get('946128949220614215');
            if (a) {
                interaction.member.roles.remove(a);
            }
        } else {
            return;
        }
    }

    const { commandName, options } = interaction;

    if (commandName === 'selection') {
        if (!interaction.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)){
            if (interaction.replied) {
                await interaction.editReply({
                    content: "Yeterli iznin yok bu komutu kullanmak için `ADMINISTRATOR` yetkisine sahip olmalısın!",
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: "Yeterli iznin yok bu komutu kullanmak için `ADMINISTRATOR` yetkisine sahip olmalısın!",
                    ephemeral: true
                });
            }
            return;
        }

        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId('crany')
            .setLabel('Crany Bot')
            .setStyle('SECONDARY')
            .setEmoji('🤖'),
            new Discord.MessageButton()
            .setCustomId('community')
            .setLabel('Community')
            .setStyle('SECONDARY')
            .setEmoji('👪'),
            new Discord.MessageButton()
            .setCustomId('pub')
            .setLabel('Pub Bar')
            .setStyle('SECONDARY')
            .setEmoji('🍺')
        )

        await interaction.reply({
            content: "Menu summoned!",
            ephemeral: true
        })

        await interaction.channel.send({
            content: '**[TR]**\nAşağıdaki butonlardan kategoriyi seçebilirsiniz!\n\n**[ENG]** \nYou can select the category from the buttons below!\n\n@everyone',
            ephemeral: false,
            components: [row]
        });

        /*const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });
        collector.on('collect', async i => {
            if (i.customId === 'koc') {
                i.deferUpdate();
                i.deferReply({
                    content: "Rol başarılıyla verildi!",
                    ephemeral: true
                });
            }
        })*/
    }
    db.add(`Timeout.${interaction.member.id}`, 1);
});

client.login('OTQ3MDc0OTQ2MDUwNDQ5NDA4.Yhn-Rg.TDSoDVfmJ5xnHz25eVRZ4nma-so');