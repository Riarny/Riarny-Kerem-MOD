module.exports = {
  conf: {
    aliases: [],
    name: "WEFŞLÖWLQRGÖWPĞWPĞPWÇFWEQRÇPĞWFQERGPÇÇPĞ",
    usage: 'unjail [üye]',
    description: 'Belirttiğiniz kullanıcıyı cezalıdan çıkarırsınız. (Kullanıcıya Bot İle Jail Atılmadıysa da Cezalısını Kaldırabilirsiniz.)',
 },

 run: async ({client,SetupDatabase, msg, args, author, uye, guild, MessageEmbed, moment, CezaExtraRolesDatabase, CezalıRolesDatabase, CezaSayıDatabase, PunitiveStatus, ControlsDatabase, CezaDatabase}) => {
  
  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : []  
  let jailTrue = res && res.jailRoles ? res.allCommandsTrue : []  
  let punitiveRole = res && res.punitiveRole ? res.punitiveRole : ""
  let unregisterRoles = res && res.unregisterRoles ? res.unregisterRoles : []
  let jailLog = res && res.jailLog ? res.jailLog : ""

  if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.some(r => jailTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  if (uye.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (msg.member.roles.highest.position < uye.roles.highest.position) return client.timemessage(client.normalEmbed(`Kendi rolünden yüksek kişilere işlem uygulayamazsın!`, msg), msg.channel.id, 5000)
  if (punitiveRole === "") return client.message(client.normalEmbed(`Henüz jail rolünün kurulumu yapılmamış, kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)
  if (unregisterRoles.length === 0) return client.message(client.normalEmbed(`Henüz kayıtsız rolünün kurulumu yapılmamış, kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)  
  const CezaDatax2 = await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id, jail: true})
  client.message(client.normalEmbed(`${uye} üyesinin cezalı rolü, ${msg.author} tarafından kaldırıldı.`, msg), msg.channel.id)
  client.react(msg, "tick")  
  if (!CezaDatax2) {
  uye.roles.remove(punitiveRole).catch(() => { })
  if (client.channels.cache.get(jailLog)) client.channels.cache.get(jailLog).send(new MessageEmbed().setColor("GREEN").setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesinin cezalı rolü kaldırıldı.\n\n• Yetkili: ${msg.author} (\`${msg.author.id}\`)\n• Tarih: ${moment(Date.now()).locale("TR").format("LLL")}`))
  return}    
  if (client.channels.cache.get(jailLog)) client.channels.cache.get(jailLog).send(new MessageEmbed().setColor("GREEN").setFooter(`Ceza Numarası: #${CezaDatax2.cezaID}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesinin cezası kaldırıldı.\n\n• Ceza Atılma: \`${moment(CezaDatax2.date).locale('TR').format('LLL')}\`\n• Ceza Bitiş: \`${moment(CezaDatax2.finishDate).locale('TR').format('LLL')}\`\n• Süre: \`${CezaDatax2.time}\`\n\n• Sebep: \`${CezaDatax2.Reason}\``))
  let RolesData = await CezalıRolesDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let RolesDataExtra = await CezalıRolesDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  if(RolesData && RolesData.roles) {
  uye.roles.add(RolesData.roles).catch(() => { })
  uye.roles.remove(punitiveRole).catch(() => { })
  uye.roles.remove(punitiveRole).catch(() => { })
  RolesData.delete()
  uye.roles.remove(punitiveRole).catch(() => { })
  }else{client.setRoles(uye.id, unregisterRoles)}
  let CezaData = await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id, jail: true}) 
  let CezaDataa = await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id, jail3days: true}) 
  CezaData.jail = false
  CezaData.save()
  if(CezaDataa && CezaDataa.jail3days) {CezaDataa.jail3days = false
  CezaDataa.save()
  if(RolesDataExtra){RolesDataExtra.delete()}}}}
