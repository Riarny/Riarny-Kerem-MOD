module.exports = {
  conf: {
    aliases: ["url-info", "urlbilgi", "urlinfo"],
    name: "url-bilgi",
    usage: 'url-bilgi',
    description: 'Sunucumuzun özel davet bilgileri/istatistikleri hakkında bilgi alırsınız .',
  },

 run: async ({client, msg, args, author, uye, cfg, SetupDatabase}) => {
 
    const res = await SetupDatabase.findOne({guildID: msg.guild.id})
    let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : [] 
    if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000) 
    if (!msg.guild.vanityURLCode) return client.message(client.normalEmbed(`Sunucumuzun özel daveti bulunmuyor.`, msg), msg.channel.id)
    msg.guild.fetchVanityData().then(a => {
     client.message(client.normalEmbed(`**Sunucumuzun özel davet bilgileri/istatistikleri:**\nSunucu özel daveti: [${a.code}](https://discord.gg/${a.code}), Kullanımı: [${a.uses}](https://discord.gg/${a.code})`, msg), msg.channel.id)})}}