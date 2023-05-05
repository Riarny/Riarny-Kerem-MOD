module.exports = {
  conf: {
    aliases: [],
    name: "işgwrçğrweqğööwğpwfeqrgçwerfqgp",
    usage: 'vunmute [üye]',
    description: 'Belirttiğiniz kullanıcının ses kanallarında olan susturulmasını açarsınız. (Kullanıcıya Bot İle Mute Atılmadıysa da Susturulmasını Kaldırabilirsiniz.)',
  },

 run: async ({client, msg, args, author, guild, moment, MessageEmbed, uye, CezaDatabase, VoiceUnmuteDatabase, ControlsDatabase, VoiceMuteDatabase, SetupDatabase}) => {
  
  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : [] 
  let voiceMuteTrue = res && res.voiceMuteRoles ? res.voiceMuteRoles : [] 
  let voiceMuteLog = res && res.voiceMuteLog ? res.voiceMuteLog : ""

  if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.some(r => voiceMuteTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  if (uye.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (msg.member.roles.highest.position < uye.roles.highest.position) return client.timemessage(client.normalEmbed(`Kendi rolünden yüksek kişilere işlem uygulayamazsın!`, msg), msg.channel.id, 5000)
  if (uye.voice.serverMute == false) return client.timemessage(client.normalEmbed(`Bu kullanıcı ses kanallarında muteli olarak gözükmüyor.`, msg), msg.channel.id, 5000)
  const CezaDatax2 = await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id, voicemuted: true})
  client.message(client.normalEmbed(`${uye} üyesinin ses susturulması, ${msg.author} tarafından kaldırıldı.`, msg), msg.channel.id)
  if (CezaDatax2 && CezaDatax2.voicemuted === false) {
   uye.voice.setMute(false) 
   client.react(msg, "tick")
   client.channels.cache.get(voiceMuteLog).send(new MessageEmbed().setColor("GREEN").setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesinin ses kanallarında bulunan susturulması kaldırıldı.\n\n• Tarih: ${Date.now()}\n• Yetkili: ${msg.author} (\`${msg.author.id}\`)`))
  return}
   client.react(msg, "tick")
   let CezaData = await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id, voicemuted: true}) 
   CezaData.voicemuted = false
   CezaData.save()
  if(uye.voice.channel == undefined) {
   await VoiceUnmuteDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id, authorID: uye.id}, { $set: { unmutedurum: "Kaldırılamadı"} }, { upsert: true })
   let VoiceMuteData = await VoiceMuteDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})  
   if(VoiceMuteData) {VoiceMuteData.delete()}
   client.channels.cache.get(voiceMuteLog).send(new MessageEmbed().setColor("GREEN").setFooter(`Ceza Numarası: #${CezaData.cezaID}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesinin ses kanallarında bulunan susturulması kaldırılamadı. Üye sese bağlanınca kaldırılacak.\n\n• Mute Atılma: \`${moment(CezaData.date).locale('TR').format('LLL')}\`\n• Mute Bitiş: \`${moment(CezaData.finishDate).locale('TR').format('LLL')}\`\n• Süre: \`${CezaData.time}\`\n\n• Sebep: \`${CezaData.Reason}\``)) 
  } else if (uye.voice.channel) {
   uye.voice.setMute(false)
   let VoiceMuteData = await VoiceMuteDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})  
   if(VoiceMuteData) {
    VoiceMuteData.delete()
   }
   client.channels.cache.get(voiceMuteLog).send(new MessageEmbed().setColor("GREEN").setFooter(`Ceza Numarası: #${CezaData.cezaID}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesinin ses kanallarında bulunan susturulması kaldırıldı.\n\n• Mute Atılma: \`${moment(CezaData.date).locale('TR').format('LLL')}\`\n• Mute Bitiş: \`${moment(CezaData.finishDate).locale('TR').format('LLL')}\`\n• Süre: \`${CezaData.time}\`\n\n• Sebep: \`${CezaData.Reason}\``))}}}