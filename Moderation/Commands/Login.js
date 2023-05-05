module.exports = {
  conf: {
    aliases: ["logininfo", "giriş", "girişler"],
    name: "login",
    usage: 'login',
    description: 'Sunucuya giren/çıkan üyeler hakkında bilgi alırsınız.',
  },

 run: async ({client, msg, args, author, uye, cfg, SetupDatabase, ControlsDatabase, MessageEmbed}) => {
 
    const res = await SetupDatabase.findOne({guildID: msg.guild.id})
    let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : [] 
    if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000) 
    let doc = await ControlsDatabase.findOne({guildID: msg.guild.id})
    msg.channel.send(new MessageEmbed().setDescription(`00.00'dan itibaren toplam giren/ayrılan üyelerin istatistikleri:`)    
    .addFields( { name: "**Günlük Giriş/Çıkış**", value: `Giren Üye: \`${doc && doc.guildMemberAddCountTotal ? doc.guildMemberAddCountTotal : 0}\`\nÇıkan Üye: \`${doc && doc.guildMemberRemoveCountTotal ? doc.guildMemberRemoveCountTotal : 0}\`\nToplam Kâr: \`${(doc && doc.guildMemberAddCountTotal ? doc.guildMemberAddCountTotal : 0)-(doc && doc.guildMemberRemoveCountTotal ? doc.guildMemberRemoveCountTotal : 0)}\``, inline: true }, { name: "**Son 12 Saat**", value: `Giren Üye: \`${doc && doc.guildMemberAddCount12Hours ? doc.guildMemberAddCount12Hours : 0}\`\nÇıkan Üye: \`${doc && doc.guildMemberRemoveCount12Hours ? doc.guildMemberRemoveCount12Hours : 0}\`\nToplam Kâr: \`${(doc && doc.guildMemberAddCount12Hours ? doc.guildMemberAddCount12Hours : 0)-(doc && doc.guildMemberRemoveCount12Hours ? doc.guildMemberRemoveCount12Hours : 0)}\``, inline: true },)
	  .addField("**Son 6 Saat**", `Giren Üye: \`${doc && doc.guildMemberAddCount6Hours ? doc.guildMemberAddCount6Hours : 0}\`\nÇıkan Üye: \`${doc && doc.guildMemberRemoveCount6Hours ? doc.guildMemberRemoveCount6Hours : 0}\`\nToplam Kâr: \`${(doc && doc.guildMemberAddCount6Hours ? doc.guildMemberAddCount6Hours : 0)-(doc && doc.guildMemberRemoveCount6Hours ? doc.guildMemberRemoveCount6Hours : 0)}\``, true)    
    .setAuthor(msg.guild.name, msg.guild.iconURL({dynamic: true}))
    .setThumbnail(msg.guild.iconURL({dynamic: true}))
    .setColor("RANDOM"))}}