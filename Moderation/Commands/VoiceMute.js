module.exports = {
  conf: {
    aliases: ["voicemute","sesmute","seslimute"],
    name: "vmute",
    usage: 'vmute [üye] [süre] [sebep]',
    description: 'Belirttiğiniz kullanıcıya belirttiğiniz süre boyunca sesli kanallarda mute atarsınız.',  
  },

 run: async ({client, msg, SetupDatabase, cfg, args, author, guild, MessageEmbed, uye, ms, prefix, moment, CezaExtraRolesDatabase, CezaDatabase, CezapuanDatabase, CezaSayıDatabase, StaffDatabase, ControlsDatabase, VoiceMuteDatabase}) => {
   
  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : []  
  let voiceMuteTrue = res && res.voiceMuteRoles ? res.voiceMuteRoles : [] 
  let botCommandsRoles = res && res.botCommandsRoles ? res.botCommandsRoles : []
  let voiceMuteLog = res && res.voiceMuteLog ? res.voiceMuteLog : ""
  let cezaPuanıLog = res && res.cezaPuanıLog ? res.cezaPuanıLog : ""
  let guildID = res && res.guildID ? res.guildID : ""
  let voiceMuteLimitNumber = res && res.voiceMuteLimitNumber ? res.voiceMuteLimitNumber : 10
  
  if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.some(r => voiceMuteTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  if (uye.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (uye.roles.cache.some(r => botCommandsRoles.includes(r.id)) && uye.roles.cache.some(r => commandsTrue.includes(r.id)) && uye.hasPermission(8)) return client.timemessage(client.normalEmbed(`Yetkililer birbirlerine ceza-i işlem uygulayamazlar.`, msg), msg.channel.id, 7000)
  if (msg.member.roles.highest.position < uye.roles.highest.position) return client.timemessage(client.normalEmbed(`Kendi rolünden yüksek kişilere işlem uygulayamazsın!`, msg), msg.channel.id, 5000) 
  const CezaDatax2 = await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  if (CezaDatax2 && CezaDatax2.voicemuted === true) return client.timemessage(client.normalEmbed(`Kullanıcı zaten susturulmuş durumda.`, msg), msg.channel.id, 5000)
  if (!args[1]) return client.timemessage(client.normalEmbed(`Lütfen tüm argümanları doğru giriniz!\nÖrnek Kullanım: ${prefix}sesmute {user} {süre} {sebep}`, msg), msg.channel.id, 5000)
  let timereplace = args[1];
  if(!timereplace || !ms(timereplace)) return client.timemessage(client.normalEmbed(`Lütfen tüm argümanları doğru giriniz!\nÖrnek Kullanım: ${prefix}sesmute {user} {süre} {sebep}`, msg), msg.channel.id, 5000)
  let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')
  let reason;
  if(!args[2]) reason = 'Sebep girilmedi.'
  if(args[2]) reason = args.slice(2).join(' ')
  let CezapuanData2 = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let chatMutee = CezapuanData2 && CezapuanData2.cezapuanıchatmute ? CezapuanData2.cezapuanıchatmute : 0
  let sesMutee = CezapuanData2 && CezapuanData2.cezapuanıvoicemute ? CezapuanData2.cezapuanıvoicemute : 0
  let bann = CezapuanData2 && CezapuanData2.cezapuanıban ? CezapuanData2.cezapuanıban : 0
  let jaill = CezapuanData2 && CezapuanData2.cezapuanıjail ? CezapuanData2.cezapuanıjail : 0
  let VEGAS = chatMutee+sesMutee+bann+jaill;  
  if (!msg.member.hasPermission(8)) await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { voiceMuteLimit: 1 } }, { upsert: true })   
  let doc = await StaffDatabase.findOne({ guildID: msg.guild.id, userID: msg.author.id})
  let voiceMuteLimit = doc && doc.voiceMuteLimit ? doc.voiceMuteLimit-1 : 0
  if (voiceMuteLimit >= voiceMuteLimitNumber) {
   client.react(msg, "red")
   client.message(client.normalEmbed(`Gün içerisinde çok fazla voice mute işlemi uyguladığınız için komut geçici olarak kullanımınıza kapatılmıştır.`, msg), msg.channel.id)   
  }
  let count = await CezaDatabase.countDocuments().exec();
  count = count == 0 ? 1 : count + 1;   
  let durum;if(VEGAS > 201) durum = " 1h";if(VEGAS === 201) durum = "1h";if(VEGAS < 200) durum = "30m";if(VEGAS === 200) durum = "30m";if(100 === VEGAS) durum = "30m";if(VEGAS < 100) durum = "25m";if(VEGAS === 100) durum = "25m";if(VEGAS === 71) durum = "25m";if(VEGAS < 70) durum = "5m";if(VEGAS === 70) durum = "5m";if(41 === VEGAS) durum = "5m";if(VEGAS === 40) durum = "3m";if(VEGAS < 40) durum = "3m";if(21 === VEGAS) durum = "3m";if(VEGAS < 20) durum = "0";if(20 === VEGAS) durum = "0";if(VEGAS === 1) durum = "0";if(VEGAS == `0`) durum = "0";
  let durum2;if(VEGAS > 201) durum2 = " \`(+1 saat)\`";if(VEGAS === 201) durum2 = " \`(+1 saat)\`";if(VEGAS < 200) durum2 = " \`(+30 dakika)\`";if(VEGAS === 200) durum2 = " \`(+30 dakika)\`";if(100 === VEGAS) durum2 = " \`(+30 dakika)\``";if(VEGAS < 100) durum2 = " \`(+25 dakika)\`";if(VEGAS === 100) durum2 = " \`(+25 dakika)\`";if(VEGAS === 71) durum2 = " \`(+25 dakika)\`";if(VEGAS < 70) durum2 = " \`(+5 dakika)\`";if(VEGAS === 70) durum2 = " \`(+5 dakika)\`";if(41 === VEGAS) durum2 = " \`(+5 dakika)\`";if(VEGAS === 40) durum2 = " \`(+3 dakika)\`";if(VEGAS < 40) durum2 = " \`(+3 dakika)\`";if(21 === VEGAS) durum2 = " \`(+3 dakika)\`";if(VEGAS < 20) durum2 = "";if(20 === VEGAS) durum2 = "";if(VEGAS === 1) durum2 = "";if(VEGAS == `0`) durum2 = "";
  let qwe = durum.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')
  let vegasssssss = ms(durum) + ms(timereplace)
  let vgss = require("humanize-duration")(vegasssssss, { language: "tr", round: true, conjunction: ", ", serialComma: false})
  var tarih2 = ms(timereplace)
  var tarih4 = ms(durum)
  var tarih3 = Date.now() + tarih2 + tarih4 
  if(uye.voice.channel == undefined) {
  let VoiceMuteData = await VoiceMuteDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})  
  let VoiceMute = await new VoiceMuteDatabase({guildID: msg.guild.id,authorID: msg.author.id,timems: vegasssssss,cezaID: count,userID: uye.id,time: vgss,date: Date.now(),finishDate: tarih3,Reason: reason}).save()
  msg.channel.send(`${cfg.Emoji.RedEmoji} ${uye} kişisinin ${time}${durum2} sürelik ses mutesi başlatılamadı kullanıcı sese bağlanınca otomatik olarak cezası başlayacak. (Ceza Numarası: \`#${count}\`)`)
  if (client.channels.cache.get(voiceMuteLog)) client.channels.cache.get(voiceMuteLog).send(new MessageEmbed().setColor("RED").setFooter(`Ceza Numarası: #${count}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesinin ses kanallarında bulunan susturulması başlatılamadı. Üye sese bağlanınca başlatılacak.\n\n• Süre: \`${time}\`${durum2}\n• Sebep: \`${reason}\``))      
  await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { voicemute: 1 } }, { upsert: true })
  await CezaSayıDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { voicemute: 1 } }, { upsert: true });
  await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { cezapuanıvoicemute: 8, cezaPuanıTotal: 8 } }, { upsert: true });
  let Ceza = await new CezaDatabase({guildID: msg.guild.id,authorID: msg.author.id,cezaID: count,userID: uye.id,time: vgss,voicemuted: true,date: Date.now(),finishDate: tarih3,Reason: reason,Type: "Voice Mute"}).save()
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let totalCezapuan = CezapuanData && CezapuanData.cezaPuanıTotal ? CezapuanData.cezaPuanıTotal : 0
  if (client.channels.cache.get(cezaPuanıLog)) {
   if (totalCezapuan === 8) { 
    client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${uye}: aldığınız **#${count}** ID'li ceza ile ilk ceza puanlandırmanız yapıldı **${totalCezapuan}** ceza puanına ulaştınız.`)
  } else client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${uye}: aldığınız **#${count}** ID'li ceza ile **${totalCezapuan-8}** ceza puanından **${totalCezapuan}** ceza puanına ulaştınız.`)
  }  
  client.checkCeza(uye, msg, totalCezapuan)
  } else if (uye.voice.channel) {
  msg.channel.send(`${cfg.Emoji.VoiceMute} ${uye} kişisi ${time}${durum2} boyunca ses kanallarında susturuldu. (Ceza Numarası: \`#${count}\`)`)
  uye.voice.setMute(true)
  await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { voicemute: 1 } }, { upsert: true })
  await CezaSayıDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { voicemute: 1 } }, { upsert: true });
  await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { cezapuanıvoicemute: 8, cezaPuanıTotal: 8 } }, { upsert: true });
  let Ceza = await new CezaDatabase({guildID: msg.guild.id,authorID: msg.author.id,cezaID: count,userID: uye.id,time: vgss,voicemuted: true,date: Date.now(),finishDate: tarih3,Reason: reason,Type: "Voice Mute"}).save()
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let totalCezapuan = CezapuanData && CezapuanData.cezaPuanıTotal ? CezapuanData.cezaPuanıTotal : 0
  if (client.channels.cache.get(cezaPuanıLog)) {
   if (totalCezapuan === 8) { 
    client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${uye}: aldığınız **#${count}** ID'li ceza ile ilk ceza puanlandırmanız yapıldı **${totalCezapuan}** ceza puanına ulaştınız.`)
  } else client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${uye}: aldığınız **#${count}** ID'li ceza ile **${totalCezapuan-8}** ceza puanından **${totalCezapuan}** ceza puanına ulaştınız.`)
  }
  if (client.channels.cache.get(voiceMuteLog)) client.channels.cache.get(voiceMuteLog).send(new MessageEmbed().setColor("RED").setFooter(`Ceza Numarası: #${count}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesi sesli sohbetlerde susturuldu.\n\n• Mute Atılma: \`${moment(Date.now()).locale('TR').format('LLL')}\`\n• Mute Bitiş: \`${moment(tarih3).locale('TR').format('LLL')}\`\n• Süre: \`${time}\`${durum2}\n\n• Sebep: \`${reason}\``)) 
  setTimeout(async () => {
  let CezaData = await CezaDatabase.findOne({ guildID: guildID, userID: uye.id}) 
  if(CezaData && CezaData.voicemuted === false) return
  if(uye.voice.channel == undefined) {
  let VoiceMuteData = await VoiceMuteDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})  
  let VoiceMute = await new VoiceMuteDatabase({guildID: msg.guild.id,authorID: msg.author.id,cezaID: count,timems: vegasssssss,userID: uye.id,time: vgss,date: Date.now(),finishDate: tarih3,Reason: reason}).save()
  if (client.channels.cache.get(voiceMuteLog)) client.channels.cache.get(voiceMuteLog).send(new MessageEmbed().setColor("GREEN").setFooter(`Ceza Numarası: #${count}`).setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true})).setDescription(`${uye} (\`${uye.id}\`) üyesi susturulması biteceği süre içinde sesli kanallarda bulunmadığı için süresi sıfırlandı, bir kanala girerse tekrar başlayacak.\n\n• Mute Başlangıç: \`${moment(Date.now()).locale('TR').format('LLL')}\`\n• Mute Bitiş: \`${moment(tarih3).locale('TR').format('LLL')}\`\n• Süre: \`${time}\`${durum2}\`\n\n• Sebep: \`${reason}\``)) 
  } else if(uye.voice.channel) {
  let CezaData = await CezaDatabase.findOne({ guildID: guildID, userID: uye.id}) 
  CezaData.voicemuted = false
  CezaData.save()
  uye.voice.setMute(false)}}, vegasssssss);  
  client.checkCeza(uye, msg, totalCezapuan)}}}