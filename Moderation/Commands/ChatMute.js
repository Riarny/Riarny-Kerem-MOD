module.exports = {
  conf: {
    aliases: ["cmute","mute","textmute","cm", "m"],
    name: "chatmute",
    usage: 'chatmute [üye] [süre] [sebep]',
    description: 'Belirttiğiniz üyeye metin kanallarında mute atarsınız.',
},
  
 run: async ({SetupDatabase, client, cfg, msg, args, author, Discord, uye, MessageEmbed, ms, prefix, moment, CezaExtraRolesDatabase, CezaDatabase, CezapuanDatabase, CezaSayıDatabase, StaffDatabase, ControlsDatabase, MessageButton}) => {
  
  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : []  
  let botCommandsTrue = res && res.botCommandsRoles ? res.botCommandsRoles : [] 
  let chatMuteTrue = res && res.chatMuteRoles ? res.chatMuteRoles : [] 
  let cezaPuanıLog = res && res.cezaPuanıLog ? res.cezaPuanıLog : ""
  let chatMuteLog = res && res.chatMuteLog ? res.chatMuteLog : ""
  let mutedRole = res && res.mutedRole ? res.mutedRole : ""
  let chatMuteLimitNumber = res && res.chatMuteLimit ? res.chatMuteLimit : 10
  
  if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.some(r => chatMuteTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000)
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 7000)
  if (uye.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 7000)
  if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 7000)
  if (uye.roles.cache.some(r => botCommandsTrue.includes(r.id)) && uye.roles.cache.some(r => commandsTrue.includes(r.id)) && uye.hasPermission(8)) return client.timemessage(client.normalEmbed(`Yetkililer birbirlerine ceza-i işlem uygulayamazlar.`, msg), msg.channel.id, 7000)
  if (msg.member.roles.highest.position < uye.roles.highest.position) return client.timemessage(client.normalEmbed(`Kendi rolünden yüksek kişilere işlem uygulayamazsın!`, msg), msg.channel.id, 7000)
  const CezaDatax2 = await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id, chatmuted: true})
  if (CezaDatax2 && CezaDatax2.chatmuted === true) return client.timemessage(client.normalEmbed(`Bu kullanıcı veritabanında zaten muteli olarak gözüküyor.`, msg), msg.channel.id, 7000)   
   if (mutedRole === "") return client.message(client.normalEmbed(`Henüz muted rolünün kurulumu yapılmamış, kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)
   const Seçenek1 = new MessageButton().setLabel("1").setStyle("blurple").setID("Seçenek1")   
   const Seçenek2 = new MessageButton().setLabel("2").setStyle("blurple").setID("Seçenek2") 
   const Seçenek3 = new MessageButton().setLabel("3").setStyle("blurple").setID("Seçenek3") 
   const Seçenek4 = new MessageButton().setLabel("4").setStyle("blurple").setID("Seçenek4") 
   const Seçenek5 = new MessageButton().setLabel("5").setStyle("blurple").setID("Seçenek5")   
   const Seçenek6 = new MessageButton().setLabel("6").setStyle("blurple").setID("Seçenek6") 
   const Seçenek7 = new MessageButton().setLabel("7").setStyle("blurple").setID("Seçenek7")     
   const Seçenek8 = new MessageButton().setLabel("8").setStyle("blurple").setID("Seçenek8") 
   const Seçenek9 = new MessageButton().setLabel("9").setStyle("blurple").setID("Seçenek9") 
   const İptal = new MessageButton().setLabel("X").setStyle("red").setID("İptal")            
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let totalCezapuan = CezapuanData && CezapuanData.cezaPuanıTotal ? CezapuanData.cezaPuanıTotal : 0
  let mesaj = await msg.channel.send(`${uye} (\`${uye.id}\`) için cezalandırma menüsü:\n**__Kullanıcı ceza puanı: ${totalCezapuan}__**\n\n**1)** Ailevi Küfür — 20 dakika\n**2)** Küfür — 10 dakika\n**3)** Flood / Spam — 10 dakika\n**4)** Tartışma / Kavga — 15 dakika\n**5)** Ortam Bozma / Rahatsızlık Verme — 10 dakika\n\n**6)** Ortamı (Sunucuyu) Kötülemek — 30 dakika\n**7)** Manevi Değerlere Küfür / Hakaret — 90 dakika\n**8)** Kadın Üyelere Sarkmak — 20 dakika\n**9)** Siyaset — 20 dakika`, { components: [ { type: 1, components: [Seçenek1, Seçenek2, Seçenek3, Seçenek4, Seçenek5],}, { type: 1, components: [Seçenek6, Seçenek7, Seçenek8, Seçenek9, İptal],},],});      
             
  let filter = (button) => button.clicker.user.id === msg.author.id;   
  let collector = await mesaj.createButtonCollector(filter, { time: 30000 })     
  
  collector.on("collect", async (button) => {    
   if (button.id === "İptal") {
    mesaj.delete().catch(() => { })
    client.react(msg, "red")
   return}
   if (!msg.member.hasPermission(8)) await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { chatMuteLimit: 1 } }, { upsert: true })   
   let doc = await StaffDatabase.findOne({ guildID: msg.guild.id, userID: msg.author.id})
   let chatMuteLimit = doc && doc.chatMuteLimit ? doc.chatMuteLimit-1 : 0
   if (chatMuteLimit >= chatMuteLimitNumber) {
    client.react(msg, "red")
    client.message(client.normalEmbed(`Gün içerisinde çok fazla chat mute işlemi uyguladığınız için komut geçici olarak kullanımınıza kapatılmıştır.`, msg), msg.channel.id)   
   }
   let count = await CezaDatabase.countDocuments().exec();
    count = count == 0 ? 1 : count + 1; 
   let extraMuteNumber; if(totalCezapuan > 201) extraMuteNumber = "1h";if(totalCezapuan === 201) extraMuteNumber = "1h";if(totalCezapuan < 200) extraMuteNumber = "30m";if(totalCezapuan === 200) extraMuteNumber = "30m";if(100 === totalCezapuan) extraMuteNumber = "30m";if(totalCezapuan < 100) extraMuteNumber = "25m";if(totalCezapuan === 100) extraMuteNumber = "25m";if(totalCezapuan === 71) extraMuteNumber = "25m";if(totalCezapuan < 70) extraMuteNumber = "5m";if(totalCezapuan === 70) extraMuteNumber = "5m";if(41 === totalCezapuan) extraMuteNumber = "5m";if(totalCezapuan === 40) extraMuteNumber = "3m";if(totalCezapuan < 40) extraMuteNumber = "3m";if(21 === totalCezapuan) extraMuteNumber = "3m";if(totalCezapuan < 20) extraMuteNumber = "0";if(20 === totalCezapuan) extraMuteNumber = "0";if(totalCezapuan === 1) extraMuteNumber = "0";if(totalCezapuan == `0`) extraMuteNumber = "0";
   let extraMuteString; if(totalCezapuan > 201) extraMuteString = " \`(+1 saat)\`";if(totalCezapuan === 201) extraMuteString = " \`(+1 saat)\`";if(totalCezapuan < 200) extraMuteString = " \`(+30 dakika)\`";if(totalCezapuan === 200) extraMuteString = " \`(+30 dakika)\`";if(100 === totalCezapuan) extraMuteString = " \`(+30 dakika)\``";if(totalCezapuan < 100) extraMuteString = " \`(+25 dakika)\`";if(totalCezapuan === 100) extraMuteString = " \`(+25 dakika)\`";if(totalCezapuan === 71) extraMuteString = " \`(+25 dakika)\`";if(totalCezapuan < 70) extraMuteString = " \`(+5 dakika)\`";if(totalCezapuan === 70) extraMuteString = " \`(+5 dakika)\`";if(41 === totalCezapuan) extraMuteString = " \`(+5 dakika)\`";if(totalCezapuan === 40) extraMuteString = " \`(+3 dakika)\`";if(totalCezapuan < 40) extraMuteString = " \`(+3 dakika)\`";if(21 === totalCezapuan) extraMuteString = " \`(+3 dakika)\`";if(totalCezapuan < 20) extraMuteString = "";if(20 === totalCezapuan) extraMuteString = "";if(totalCezapuan === 1) extraMuteString = "";if(totalCezapuan == `0`) extraMuteString = "";
   let muteReason = button.id === "Seçenek1" ? "Ailevi Küfür" : button.id === "Seçenek2" ? "Küfür" : button.id === "Seçenek3" ? "Flood / Spam" : button.id === "Seçenek4" ? "Tartışma / Kavga" : button.id === "Seçenek5" ? "Ortam Bozma / Rahatsızlık Verme" : button.id === "Seçenek6" ? "Ortamı (Sunucuyu) Kötülemek" : button.id === "Seçenek7" ? "Manevi Değerlere Küfür / Hakaret" : button.id === "Seçenek8" ? "Kadın Üyelere Sarkmak" : button.id === "Seçenek9" ? "Siyaset" : button.id === "İptal" ? "Cezalandırma İptal Edildi." : "Sebep Belirtilmemiş."
   let msTime = button.id === "Seçenek1" ? ms("20m")+ms(extraMuteNumber) : button.id === "Seçenek2" ? ms("10m")+ms(extraMuteNumber) : button.id === "Seçenek3" ? ms("10m")+ms(extraMuteNumber) : button.id === "Seçenek4" ? ms("15m")+ms(extraMuteNumber) : button.id === "Seçenek5" ? ms("10m")+ms(extraMuteNumber) : button.id === "Seçenek6" ? ms("30m")+ms(extraMuteNumber) : button.id === "Seçenek7" ? ms("90m")+ms(extraMuteNumber) : button.id === "Seçenek8" ? ms("20m")+ms(extraMuteNumber) : button.id === "Seçenek9" ? ms("20m")+ms(extraMuteNumber) : button.id === "İptal" ? "Cezalandırma İptal Edildi." : "Süre Belirtilmemiş."
   let finishDate = button.id === "Seçenek1" ? Date.now()+ms("20m")+ms(extraMuteNumber) : button.id === "Seçenek2" ? Date.now()+ms("10m")+ms(extraMuteNumber) : button.id === "Seçenek3" ? Date.now()+ms("10m")+ms(extraMuteNumber) : button.id === "Seçenek4" ? Date.now()+ms("15m")+ms(extraMuteNumber) : button.id === "Seçenek5" ? Date.now()+ms("10m")+ms(extraMuteNumber) : button.id === "Seçenek6" ? Date.now()+ms("30m")+ms(extraMuteNumber) : button.id === "Seçenek7" ? Date.now()+ms("90m")+ms(extraMuteNumber) : button.id === "Seçenek8" ? Date.now()+ms("20m")+ms(extraMuteNumber) : button.id === "Seçenek9" ? Date.now()+ms("20m")+ms(extraMuteNumber) : button.id === "İptal" ? "Cezalandırma İptal Edildi." : "Süre Belirtilmemiş."
   let muteTime = require("humanize-duration")(msTime, { language: "tr", round: true, conjunction: ", ", serialComma: false})
    client.react(msg, "tick")
    mesaj.delete().catch(() => { })
    msg.channel.send(`${cfg.Emoji.TickEmoji} ${uye} kişisi ${muteTime}${extraMuteString} boyunca metin kanallarında susturuldu. (Ceza Numarası: \`#${count}\`)`)
    uye.roles.add(mutedRole)
    await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { chatmute: 1 } }, { upsert: true })
    await CezaSayıDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { chatmute: 1 } }, { upsert: true });
    await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { cezapuanıchatmute: 8, cezaPuanıTotal: 8 } }, { upsert: true });
    await new CezaDatabase({guildID: msg.guild.id, authorID: msg.author.id, cezaID: count, userID: uye.id, time: muteTime, date: Date.now(), chatmuted: true,finishDate: finishDate, Reason: muteReason, Type: "Chat Mute"}).save()
    if (client.channels.cache.get(chatMuteLog)) client.channels.cache.get(chatMuteLog).send(new MessageEmbed().setColor("RED").setFooter(`Ceza Numarası: #${count}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesi metin kanallarında susturuldu.\n\n• Mute Atılma: \`${moment(Date.now()).locale('TR').format('LLL')}\`\n• Mute Bitiş: \`${moment(finishDate).locale('TR').format('LLL')}\`\n• Süre: \`${muteTime}\`\n\n• Sebep: \`${muteReason}\``)) 
    if (client.channels.cache.get(cezaPuanıLog)) {
     if (totalCezapuan+8 === 8) { 
      client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${uye}: aldığınız **#${count}** ID'li ceza ile ilk ceza puanlandırmanız yapıldı **${totalCezapuan+8}** ceza puanına ulaştınız.`)
    } else client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${uye}: aldığınız **#${count}** ID'li ceza ile **${totalCezapuan}** ceza puanından **${totalCezapuan+8}** ceza puanına ulaştınız.`)
    }    
    client.checkCeza(uye, msg, totalCezapuan+8)
  })

  collector.on("end", async () => {
   mesaj.delete().catch(() => { })
  })}}