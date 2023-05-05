module.exports = {
  conf: {
    aliases: ["cezalı","slave","karantina"],
    name: "jail",
    usage: 'jail [üye]',
    description: 'Belirttiğiniz kullanıcıyı jaile atarsınız.',
},
  
 run: async ({SetupDatabase, client, cfg, msg, args, author, Discord, uye, MessageEmbed, ms, prefix, moment, CezalıRolesDatabase, CezaExtraRolesDatabase, CezaDatabase, CezapuanDatabase, CezaSayıDatabase, StaffDatabase, ControlsDatabase, MessageButton}) => {
  
  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : []  
  let jailTrue = res && res.jailRoles ? res.allCommandsTrue : []  
  let cezaPuanıLog = res && res.cezaPuanıLog ? res.cezaPuanıLog : ""
  let jailLog = res && res.jailLog ? res.jailLog : ""
  let botCommandsTrue = res && res.botCommandsRoles ? res.botCommandsRoles : [] 
  let boosterTrue = res && res.boosterRole ? res.boosterRole : ""
  let punitiveRole = res && res.punitiveRole ? res.punitiveRole : ""
  let jailLimitNumber = res && res.jailLimit ? res.jailLimit : 5
  
  if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.some(r => jailTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000)
  let m = msg.mentions.members.first() || args[0] 
  if (!args[0]) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  if(!msg.guild.members.cache.get(m)) {
  let victim;
  if(m instanceof Discord.GuildMember) { victim = m.user; }else if(m instanceof Discord.User) { victim = m; }else { victim = await client.users.fetch(m)} 
  let count = await CezaDatabase.countDocuments().exec();
  count = count == 0 ? 1 : count + 1;   
  let sebep = args.slice(1).join(' ');
  if(!sebep) sebep = 'Sebep belirtilmemiş.'
  if (!msg.member.hasPermission(8)) await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { jailLimit: 1 } }, { upsert: true })   
  let doc = await StaffDatabase.findOne({ guildID: msg.guild.id, userID: msg.author.id})
  let jailLimit = doc && doc.jailLimit ? doc.jailLimit-1 : 0
  if (jailLimit >= jailLimitNumber) {
   client.react(msg, "red")
   client.message(client.normalEmbed(`Gün içerisinde çok fazla jail işlemi uyguladığınız için komut geçici olarak kullanımınıza kapatılmıştır.`, msg), msg.channel.id)   
  }
  if (client.channels.cache.get(jailLog)) client.channels.cache.get(jailLog).send(new MessageEmbed().setColor("RED").setFooter(`Ceza Numarası: #${count}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${victim.tag} (\`${victim.id}\`) üyesi sunucuda olmamasına rağmen cezalıya atıldı.\n\n• Ceza Atılma: \`${moment(Date.now()).locale('TR').format('LLL')}\`\n• Sebep \`${sebep}\``)) 
  client.message(client.normalEmbed(`${victim.tag.replace("`","")} üyesi sunucuda olmamasına rağmen cezalıya atıldı. Sunucuya girişi engellendi. (\`#${count}\`)`, msg), msg.channel.id)
  await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { jail: 1 } }, { upsert: true })
  let Ceza = await new CezaDatabase({guildID: msg.guild.id, authorID: msg.author.id, cezaID: count, userID: victim.id, jail:true, time: "Sınırsız", date :Date.now(), finishDate: 0, Reason: sebep, Type: "Jail"}).save()
  await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: victim.id}, { $inc: { cezapuanıjail: 15, cezaPuanıTotal: 15 } }, { upsert: true });
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: victim.id})
  await CezaSayıDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: victim.id}, { $inc: { jail: 1 } }, { upsert: true });
  let totalCezapuan = CezapuanData && CezapuanData.cezaPuanıTotal ? CezapuanData.cezaPuanıTotal : 0
    if (client.channels.cache.get(cezaPuanıLog)) {
     if (totalCezapuan === 15) { 
      client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${victim.tag}: aldığınız **#${count}** ID'li ceza ile ilk ceza puanlandırmanız yapıldı **${totalCezapuan}** ceza puanına ulaştınız.`)
    } else client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${victim.tag}: aldığınız **#${count}** ID'li ceza ile **${totalCezapuan-15}** ceza puanından **${totalCezapuan}** ceza puanına ulaştınız.`)
    }
  if (totalCezapuan >= 250) {
   await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: victim.id}, { $inc: { cezapuanı250sınırceza: 1 } }, { upsert: true });
  }
  return}   
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 7000)
  if (uye.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 7000)
  if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 7000)
  if (uye.roles.cache.some(r => botCommandsTrue.includes(r.id)) && uye.roles.cache.some(r => commandsTrue.includes(r.id)) && uye.hasPermission(8)) return client.timemessage(client.normalEmbed(`Yetkililer birbirlerine ceza-i işlem uygulayamazlar.`, msg), msg.channel.id, 7000)
  if (msg.member.roles.highest.position < uye.roles.highest.position) return client.timemessage(client.normalEmbed(`Kendi rolünden yüksek kişilere işlem uygulayamazsın!`, msg), msg.channel.id, 7000)
  const CezaDatax2 = await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id, chatmuted: true})
  if (CezaDatax2 && CezaDatax2.chatmuted === true) return client.timemessage(client.normalEmbed(`Bu kullanıcı veritabanında zaten cezalı olarak gözüküyor.`, msg), msg.channel.id, 7000)   
   if (punitiveRole === "") return client.message(client.normalEmbed(`Henüz jail rolünün kurulumu yapılmamış, kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)
   const Seçenek1 = new MessageButton().setLabel("1").setStyle("blurple").setID("Seçenek1")   
   const Seçenek2 = new MessageButton().setLabel("2").setStyle("blurple").setID("Seçenek2") 
   const Seçenek3 = new MessageButton().setLabel("3").setStyle("blurple").setID("Seçenek3") 
   const Seçenek4 = new MessageButton().setLabel("4").setStyle("blurple").setID("Seçenek4") 
   const Seçenek5 = new MessageButton().setLabel("5").setStyle("blurple").setID("Seçenek5")   
   const Seçenek6 = new MessageButton().setLabel("6").setStyle("blurple").setID("Seçenek6") 
   const Seçenek7 = new MessageButton().setLabel("7").setStyle("blurple").setID("Seçenek7")     
   const İptal = new MessageButton().setLabel("X").setStyle("red").setID("İptal")            
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let totalCezapuan = CezapuanData && CezapuanData.cezaPuanıTotal ? CezapuanData.cezaPuanıTotal : 0
  let mesaj = await msg.channel.send(`${uye} (\`${uye.id}\`) için cezalandırma menüsü:\n**__Kullanıcı ceza puanı: ${totalCezapuan}__**\n\n**1)** Sunucunun Düzenini Bozacak Hal Ve Davranış — 1 gün\n**2)** Din / Irkçılık / Siyaset — 1 gün\n**3)** Tehdit / Şantaj / İftira Atmak / Kandırmak — 2 gün\n**4)** Uyarılara Rağmen Küfür Ve Troll — 2 gün\n**5)** Reklam — 14 gün\n**6)** Taciz — 7 gün\n**7)** Dini Değerlere Küfür / Hakaret — 14 gün`, { components: [ { type: 1, components: [Seçenek1, Seçenek2, Seçenek3, Seçenek4],}, { type: 1, components: [Seçenek5, Seçenek6, Seçenek7, İptal],},],});      
             
  let filter = (button) => button.clicker.user.id === msg.author.id;   
  let collector = await mesaj.createButtonCollector(filter, { time: 30000 })     
  
  collector.on("collect", async (button) => {    
   if (button.id === "İptal") {
    mesaj.delete().catch(() => { })
    client.react(msg, "red")
   return}
   if (!msg.member.hasPermission(8)) await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { jailLimit: 1 } }, { upsert: true })   
   let doc = await StaffDatabase.findOne({ guildID: msg.guild.id, userID: msg.author.id})
   let jailLimit = doc && doc.jailLimit ? doc.jailLimit-1 : 0
   if (jailLimit >= jailLimitNumber) {
    client.react(msg, "red")
    client.message(client.normalEmbed(`Gün içerisinde çok fazla jail işlemi uyguladığınız için komut geçici olarak kullanımınıza kapatılmıştır.`, msg), msg.channel.id)   
   }
   let count = await CezaDatabase.countDocuments().exec();
    count = count == 0 ? 1 : count + 1; 
   let extraJailNumber; if(totalCezapuan > 201) extraJailNumber = "1h";if(totalCezapuan === 201) extraJailNumber = "1h";if(totalCezapuan < 200) extraJailNumber = "30m";if(totalCezapuan === 200) extraJailNumber = "30m";if(100 === totalCezapuan) extraJailNumber = "30m";if(totalCezapuan < 100) extraJailNumber = "25m";if(totalCezapuan === 100) extraJailNumber = "25m";if(totalCezapuan === 71) extraJailNumber = "25m";if(totalCezapuan < 70) extraJailNumber = "5m";if(totalCezapuan === 70) extraJailNumber = "5m";if(41 === totalCezapuan) extraJailNumber = "5m";if(totalCezapuan === 40) extraJailNumber = "3m";if(totalCezapuan < 40) extraJailNumber = "3m";if(21 === totalCezapuan) extraJailNumber = "3m";if(totalCezapuan < 20) extraJailNumber = "0";if(20 === totalCezapuan) extraJailNumber = "0";if(totalCezapuan === 1) extraJailNumber = "0";if(totalCezapuan == `0`) extraJailNumber = "0";
   let extraJailString; if(totalCezapuan > 201) extraJailString = " \`(+1 saat)\`";if(totalCezapuan === 201) extraJailString = " \`(+1 saat)\`";if(totalCezapuan < 200) extraJailString = " \`(+30 dakika)\`";if(totalCezapuan === 200) extraJailString = " \`(+30 dakika)\`";if(100 === totalCezapuan) extraJailString = " \`(+30 dakika)\``";if(totalCezapuan < 100) extraJailString = " \`(+25 dakika)\`";if(totalCezapuan === 100) extraJailString = " \`(+25 dakika)\`";if(totalCezapuan === 71) extraJailString = " \`(+25 dakika)\`";if(totalCezapuan < 70) extraJailString = " \`(+5 dakika)\`";if(totalCezapuan === 70) extraJailString = " \`(+5 dakika)\`";if(41 === totalCezapuan) extraJailString = " \`(+5 dakika)\`";if(totalCezapuan === 40) extraJailString = " \`(+3 dakika)\`";if(totalCezapuan < 40) extraJailString = " \`(+3 dakika)\`";if(21 === totalCezapuan) extraJailString = " \`(+3 dakika)\`";if(totalCezapuan < 20) extraJailString = "";if(20 === totalCezapuan) extraJailString = "";if(totalCezapuan === 1) extraJailString = "";if(totalCezapuan == `0`) extraJailString = "";
   let jailReason = button.id === "Seçenek1" ? "Sunucunun Düzenini Bozacak Hal Ve Davranış" : button.id === "Seçenek2" ? "Din / Irkçılık / Siyaset" : button.id === "Seçenek3" ? "Tehdit / Şantaj / İftira Atmak / Kandırmak" : button.id === "Seçenek4" ? "Uyarılara Rağmen Küfür Ve Troll" : button.id === "Seçenek5" ? "Reklam" : button.id === "Seçenek6" ? "Taciz" : button.id === "Seçenek7" ? "Dini Değerlere Küfür" : button.id === "İptal" ? "Cezalandırma İptal Edildi." : "Sebep Belirtilmemiş."
   let msTime = button.id === "Seçenek1" ? ms("1d")+ms(extraJailNumber) : button.id === "Seçenek2" ? ms("1d")+ms(extraJailNumber) : button.id === "Seçenek3" ? ms("2d")+ms(extraJailNumber) : button.id === "Seçenek4" ? ms("2d")+ms(extraJailNumber) : button.id === "Seçenek5" ? ms("14d")+ms(extraJailNumber) : button.id === "Seçenek6" ? ms("7d")+ms(extraJailNumber) : button.id === "Seçenek7" ? ms("14d")+ms(extraJailNumber) : button.id === "İptal" ? "Cezalandırma İptal Edildi." : "Süre Belirtilmemiş."
   let finishDate = button.id === "Seçenek1" ? Date.now()+ms("1d")+ms(extraJailNumber) : button.id === "Seçenek2" ? Date.now()+ms("1d")+ms(extraJailNumber) : button.id === "Seçenek3" ? Date.now()+ms("2d")+ms(extraJailNumber) : button.id === "Seçenek4" ? Date.now()+ms("2d")+ms(extraJailNumber) : button.id === "Seçenek5" ? Date.now()+ms("14d")+ms(extraJailNumber) : button.id === "Seçenek6" ? Date.now()+ms("7d")+ms(extraJailNumber) : button.id === "Seçenek7" ? Date.now()+ms("14d")+ms(extraJailNumber) : button.id === "İptal" ? "Cezalandırma İptal Edildi." : "Süre Belirtilmemiş."
   let jailTime = require("humanize-duration")(msTime, { language: "tr", round: true, conjunction: ", ", serialComma: false})
    let CezalıRolesData = await CezalıRolesDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
    let memberRoles = uye.roles.cache.map(x => x.id)
    if(!CezalıRolesData) {let newCezaa = new CezalıRolesDatabase({guildID: msg.guild.id, userID: uye.id, roles: memberRoles}).save();} else{
    CezalıRolesData.roles.push(memberRoles); 
    CezalıRolesData.save();} 
    client.react(msg, "tick")
    mesaj.delete().catch(() => { })
    msg.channel.send(new MessageEmbed().setDescription(`${uye} ${button.id.replace("Seçenek", "")} numaralı \`${jailReason}\` sebebiyle cezalı veritabanına kayıt edildi.\nCeza bitiş tarihi: ${moment(finishDate).locale('TR').format('LLL')}.`).setColor("RANDOM").setAuthor(msg.author.tag, msg.member.user.avatarURL({dynamic: true})))
    uye.roles.cache.has(boosterTrue) ?  uye.roles.set([boosterTrue, punitiveRole]) : uye.roles.set([punitiveRole])
    await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { jail: 1 } }, { upsert: true })
    await CezaSayıDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { jail: 1 } }, { upsert: true });
    await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { cezapuanıjail: 15, cezaPuanıTotal: 15 } }, { upsert: true });
    let Ceza = await new CezaDatabase({guildID: msg.guild.id, authorID: msg.author.id, cezaID: count, userID: uye.id, jail :true, time: jailTime, date: Date.now(), finishDate: finishDate, Reason: jailReason, Type: "Jail"}).save()
    if (client.channels.cache.get(jailLog)) client.channels.cache.get(jailLog).send(new MessageEmbed().setColor("RED").setFooter(`Ceza Numarası: #${count}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesi geçici olarak cezalıya atıldı.\n\n• Ceza Atılma: \`${moment(Date.now()).locale('TR').format('LLL')}\`\n• Ceza Bitiş: \`${moment(finishDate).locale('TR').format('LLL')}\`\n• Süre: \`${jailTime}\`\n\n• Sebep: \`${jailReason}\``)) 
     if (client.channels.cache.get(cezaPuanıLog)) {
      if (totalCezapuan+15 === 15) { 
       client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${uye}: aldığınız **#${count}** ID'li ceza ile ilk ceza puanlandırmanız yapıldı **${totalCezapuan+8}** ceza puanına ulaştınız.`)
     } else client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${uye}: aldığınız **#${count}** ID'li ceza ile **${totalCezapuan}** ceza puanından **${totalCezapuan+8}** ceza puanına ulaştınız.`)
     }    
    client.checkCeza(uye, msg, totalCezapuan+15)
  })

  collector.on("end", async () => {
   mesaj.delete().catch(() => { })
  })}}