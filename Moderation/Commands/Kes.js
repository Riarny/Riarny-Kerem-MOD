module.exports = {
  conf: {
    aliases: ["bağlantıkes"],
    name: "kes",
    usage: 'kes [üye]',
    description: 'Belirttiğiniz üyenin ses bağlantısını keser.',
},

 run: async ({client, msg, args, author, MessageEmbed, uye, SetupDatabase}) => {
   
  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : []  
  let botCommandsTrue = res && res.botCommandsRoles ? res.botCommandsRoles : [] 
  let RegisterVoices = res && res.RegisterVoices ? res.RegisterVoices : [] 
  let RegisterVoiceName = res && res.RegisterVoiceName ? res.RegisterVoiceName : ""
  let voiceMuteTrue = res && res.voiceMuteRoles ? res.voiceMuteRoles : [] 
  
  if (!msg.member.roles.cache.some(r => botCommandsTrue.includes(r.id)) && !msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.some(r => voiceMuteTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  if (uye.hasPermission(8)) return client.timemessage(client.normalEmbed(`Yöneticilerin Bağlantısını Kesemezsin.`, msg), msg.channel.id, 5000)
  if (uye.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendi Bağlantını Kesemezsin.`, msg), msg.channel.id, 5000)
  if (!uye.voice.channel) return client.timemessage(client.normalEmbed(`Belirttiğiniz Kullanıcı Bir Ses Kanalında Bulunmuyor.`, msg), msg.channel.id, 5000)
  if (msg.member.roles.highest.position < uye.roles.highest.position) return client.timemessage(client.normalEmbed(`Kendi rolünden yüksek kişilere işlem uygulayamazsın!`,msg), msg.channel.id, 5000)
 
  if (msg.member.roles.cache.some(r => botCommandsTrue.includes(r.id))) {
   if (!RegisterVoices.includes(uye.voice.channel.id)) return client.message(client.normalEmbed(`Yalnızca "*${RegisterVoiceName}*" odalarından birisinin bağlantısını kesebilirsiniz! Bu kullanıcı şu an "*${uye.voice.channel.name}*" kanalında bulunmakta.`, msg), msg.channel.id)
   uye.voice.setChannel(null).catch(() => { })
   client.message(client.normalEmbed(`${uye} adlı üye ${uye.voice.channel.name} kanalından çıkarıldı.`, msg), msg.channel.id)
   client.react(msg, "tick")   
  return}

  uye.voice.setChannel(null).catch(() => { })
  client.message(client.normalEmbed(`${uye} adlı üye ${uye.voice.channel.name} kanalından çıkarıldı.`, msg), msg.channel.id)
  client.react(msg, "tick")}}
