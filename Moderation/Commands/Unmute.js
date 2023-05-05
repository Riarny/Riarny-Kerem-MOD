module.exports = {
  conf: {
    aliases: [],
    name: "ÇÖĞQRGEFWEÇÖĞQFWERGGÇÖĞWQERFGÇÇÖFWEQRGG",
    usage: 'unmute [üye]',
    description: 'Belirttiğiniz kullanıcının metin kanallarında olan susturulmasını kaldırır. (Kullanıcıya Bot İle Mute Atılmadıysa da Susturulmasını Kaldırabilirsiniz.)',
 },

 run: async ({client, msg, args, author, uye, guild, moment, MessageEmbed,ControlsDatabase, CezaDatabase,SetupDatabase}) => {
   
  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : []  
  let chatMuteTrue = res && res.chatMuteRoles ? res.chatMuteRoles : []
  let chatMuteLog = res && res.chatMuteLog ? res.chatMuteLog : ""
  let mutedRole = res && res.mutedRole ? res.mutedRole : ""
  
  if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.some(r => chatMuteTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000) 
  if (uye.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEMbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (mutedRole === "") return client.message(client.normalEmbed(`Henüz muted rolünün kurulumu yapılmamış, kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)  
  if (!uye.roles.cache.has(mutedRole)) return client.timemessage(client.normalEmbed(`Belirttiğiniz kullanıcı veritabanında muteli gözükmüyor.`, msg), msg.channel.id, 5000)
  if (msg.member.roles.highest.position < uye.roles.highest.position) return client.timemessage(client.normalEmbed(`Kendi rolünden yüksek kişilere işlem uygulayamazsın!`, msg), msg.channel.id, 5000) 
  const CezaDatax2 = await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id, chatmuted: true})
  client.message(client.normalEmbed(`${uye} üyesinin metin kanallarında olan susturulması, ${msg.author} tarafından kaldırıldı.`, msg), msg.channel.id)
  client.react(msg, "tick")
  if (CezaDatax2 && CezaDatax2.chatmuted === false) { 
  uye.roles.remove(mutedRole).catch(() => { })
  if (client.channels.cache.get(chatMuteLog)) client.channels.cache.get(chatMuteLog).send(new MessageEmbed().setColor("GREEN").setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesinin metin kanallarında bulunan susturulması kaldırıldı.\n\n• Yetkili: ${msg.author} (\`${msg.author.id}\`)\n• Tarih: ${moment(Date.now()).locale("TR").format("LLL")}`))
  return}
  uye.roles.remove(mutedRole).catch(() => { })
  let CezaData = await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id, chatmuted: true}) 
  CezaData.chatmuted = false
  CezaData.save()   
  if (client.channels.cache.get(chatMuteLog)) client.channels.cache.get(chatMuteLog).send(new MessageEmbed().setColor("GREEN").setFooter(`Ceza Numarası: #${CezaData.cezaID}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesinin metin kanallarında bulunan susturulması kaldırıldı.\n\n• Mute Atılma: \`${moment(CezaData.date).locale("TR").format("LLL")}\`\n• Mute Bitiş: \`${moment(CezaData.finishDate).locale("TR").format("LLL")}\`\n• Süre: \`${CezaData.time}\`\n\n• Sebep: \`${CezaData.Reason}\``))}}