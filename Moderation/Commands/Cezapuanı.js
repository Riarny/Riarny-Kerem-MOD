module.exports = {
  conf: {
    aliases: ["cezapuan"],
    name: "cezapuanı",
    usage: 'cezapuanı [üye]',
    description: 'Belirttiğiniz üyenin ceza puanına bakarsınız.',
  },

 run: async ({client, msg, args, author, guild, MessageEmbed, CezapuanDatabase, CezaSayıDatabase, SetupDatabase}) => {
   
  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : []
  let botCommandsTrue = res && res.botCommandsRoles ? res.botCommandsRoles : [] 
  if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.some(r => botCommandsTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  let user = msg.mentions.users.first() || client.users.cache.get(args[0]) || msg.author;
  const member = msg.guild.member(user);
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: member.id})
  let totalCezapuan = CezapuanData && CezapuanData.cezaPuanıTotal ? CezapuanData.cezaPuanıTotal : 0
  let durum;if(totalCezapuan > 101) durum = "Aşırı Güvensiz";if(totalCezapuan === 101) durum = "Aşırı Güvensiz";if(totalCezapuan < 100) durum = "Aşırı Tehlikeli";if(totalCezapuan === 100) durum = "Aşırı Tehlikeli";if(totalCezapuan === 71) durum = "Aşırı Tehlikeli";if(totalCezapuan < 70) durum = "Tehlikeli";if(totalCezapuan === 70) durum = "Tehlikeli";if(41 === totalCezapuan) durum = "Tehlikeli";if(totalCezapuan === 40) durum = "Şüpheli";if(totalCezapuan < 40) durum = "Şüpheli";if(21 === totalCezapuan) durum = "Şüpheli";if(totalCezapuan < 20) durum = "Güvenli";if(20 === totalCezapuan) durum = "Güvenli";if(totalCezapuan === 1) durum = "Güvenli";if(totalCezapuan == `0`) durum = "Çok Güvenli";
  msg.channel.send(`${member} üyesi: ${totalCezapuan} cezapuanı (\`${durum}\`)`)}}