module.exports = {
  conf: {
    aliases: [],
    name: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
},

 run: async ({client,SetupDatabase, msg, args, author, cfg, uye, moment, MessageEmbed, ms, CezaExtraRolesDatabase, CezalıRolesDatabase, uyekontrol, Discord, CezaDatabase, CezapuanDatabase, CezaSayıDatabase, StaffDatabase, ControlsDatabase}) => {
   
  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : []  
  let jailTrue = res && res.jailRoles ? res.allCommandsTrue : []  
  let cezaPuanıLog = res && res.cezaPuanıLog ? res.cezaPuanıLog : ""
  let jailLog = res && res.jailLog ? res.jailLog : ""
  let botCommandsTrue = res && res.botCommandsRoles ? res.botCommandsRoles : [] 
  let boosterTrue = res && res.boosterRole ? res.boosterRole : ""
  let punitiveRole = res && res.punitiveRole ? res.punitiveRole : ""
  let jailLimitNumber = res && res.jailLimit ? res.jailLimit : 5
  
  if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.some(r => jailTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  if (!args[0]) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  if(uyekontrol === "False") {
  let victim;
  if(args[0] instanceof Discord.GuildMember) { victim = args[0].user; }else if(args[0] instanceof Discord.User) { victim = args[0]; }else { victim = await client.users.fetch(args[0])} 
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
  if (client.channels.cache.get(jailLog)) client.channels.cache.get(jailLog).send(new MessageEmbed().setColor("27d38a").setFooter(`Ceza Numarası: #${count}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesi karantinaya atıldı.\n\n• Karantina Başlangıç \`${moment(Date.now()).locale('TR').format('LLL')}\`\n\n• Sebep \`${sebep}\``)) 
  client.message(client.normalEmbed(`${victim.tag.replace("`","")} üyesi sunucuda olmamasına rağmen cezalıya atıldı. Sunucuya girişi engellendi. (#${count})`, msg), msg.channel.id)
  await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { jail: 1 } }, { upsert: true })
  let Ceza = await new CezaDatabase({guildID: msg.guild.id,authorID: msg.author.id,cezaID: count,userID: victim.id,jail:true,time: "Sınırsız",date :Date.now(),finishDate: 0,Reason: sebep,Type: "Jail"}).save()
  await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: victim.id}, { $inc: { cezapuanıjail: 10 } }, { upsert: true });
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: victim.id})
  await CezaSayıDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: victim.id}, { $inc: { jail: 1 } }, { upsert: true });
  let chatMute = CezapuanData && CezapuanData.cezapuanıchatmute ? CezapuanData.cezapuanıchatmute : 0
  let sesMute = CezapuanData && CezapuanData.cezapuanıvoicemute ? CezapuanData.cezapuanıvoicemute : 0
  let ban = CezapuanData && CezapuanData.cezapuanıban ? CezapuanData.cezapuanıban : 0
  let jail = CezapuanData && CezapuanData.cezapuanıjail ? CezapuanData.cezapuanıjail : 0
  let toplam = chatMute+sesMute+ban+jail;
    if (client.channels.cache.get(cezaPuanıLog)) {
     if (toplam === 10) { 
      client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${victim.tag}: aldığınız **#${count}** ID'li ceza ile ilk ceza puanlandırmanız yapıldı **${toplam}** ceza puanına ulaştınız.`)
    } else client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${victim.tag}: aldığınız **#${count}** ID'li ceza ile **${toplam-10}** ceza puanından **${toplam}** ceza puanına ulaştınız.`)
    }
  if (toplam >= 250) {await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: victim.id}, { $inc: { cezapuanı250sınırceza: 1 } }, { upsert: true });}return}
  if (punitiveRole === "") return client.message(client.normalEmbed(`Henüz jail rolünün kurulumu yapılmamış, kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)
  if (boosterTrue === "") return client.message(client.normalEmbed(`Henüz booster rolünün kurulumu yapılmamış, kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)
  if (uye.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (msg.member.roles.highest.position < uye.roles.highest.position) return client.timemessage(client.normalEmbed(`Kendi rolünden yüksek kişilere işlem uygulayamazsın!`, msg), msg.channel.id, 5000)
  if (uye.roles.cache.some(r => botCommandsTrue.includes(r.id)) && uye.roles.cache.some(r => commandsTrue.includes(r.id)) && uye.hasPermission(8)) return client.timemessage(client.normalEmbed(`Yetkililer birbirlerine ceza-i işlem uygulayamazlar.`, msg), msg.channel.id, 7000)
  const CezaDatax2 = await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  if (CezaDatax2 && CezaDatax2.jail === true) return client.timemessage(client.normalEmbed(`${uye} kişisi zaten veritabanında cezalı olarak bulunuyor.`, msg), msg.channel.id, 5000)
  if (!msg.member.hasPermission(8)) await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { jailLimit: 1 } }, { upsert: true })   
  let doc = await StaffDatabase.findOne({ guildID: msg.guild.id, userID: msg.author.id})
  let jailLimit = doc && doc.jailLimit ? doc.jailLimit-1 : 0
  if (jailLimit >= jailLimitNumber) return client.message(client.normalEmbed(`Gün içerisinde çok fazla jail işlemi uyguladığınız için komut geçici olarak kullanımınıza kapatılmıştır.`, msg), msg.channel.id)     
  const filter = (reaction, user) => {return ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣"].includes(reaction.emoji.name) && user.id === msg.author.id;};
  msg.channel.send(new MessageEmbed().setFooter('Eğer tepkiye tıklanmazsa 20 saniye sonra işlem iptal edilecek.').setDescription(`Lütfen cezayı, belirtilen emojiye tıklayarak seçiniz.\n\`Eğer sebep aşağıda bulunmuyorsa bu slave işlemine uygun değildir!\`\n\n1️⃣ Sunucunun düzenini bozucak hal ve davranış\n 2️⃣ Din / ırkçılık / siyaset\n 3️⃣ Tehdit / Şantaj / İftira atmak / Kandırmak\n 4️⃣ Uyarılara rağmen küfür ve trol\n 5️⃣ Reklam\n 6️⃣ Taciz`).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setAuthor(msg.author.tag, msg.member.user.avatarURL({dynamic: true}))).then(m => m.react("1️⃣").then(c => m.react("2️⃣").then(d => m.react("3️⃣").then(f => m.react("4️⃣").then(g => m.react("5️⃣").then(a => m.react("6️⃣")).then(s =>m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"]}).then(async collected => {const reaction = collected.first();
  if (reaction.emoji.name === "1️⃣") {
  let CezalıRolesData = await CezalıRolesDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let memberRoles = uye.roles.cache.map(x => x.id)
  if(!CezalıRolesData) {let newCezaa = new CezalıRolesDatabase({guildID: msg.guild.id, userID: uye.id, roles: memberRoles}).save();} else{
  CezalıRolesData.roles.push(memberRoles); 
  CezalıRolesData.save();}
  let CezapuanData2 = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let chatMutee = CezapuanData2 && CezapuanData2.cezapuanıchatmute ? CezapuanData2.cezapuanıchatmute : 0
  let sesMutee = CezapuanData2 && CezapuanData2.cezapuanıvoicemute ? CezapuanData2.cezapuanıvoicemute : 0
  let bann = CezapuanData2 && CezapuanData2.cezapuanıban ? CezapuanData2.cezapuanıban : 0
  let jaill = CezapuanData2 && CezapuanData2.cezapuanıjail ? CezapuanData2.cezapuanıjail : 0
  let VEGAS = chatMutee+sesMutee+bann+jaill;
  let durum;if(VEGAS > 201) durum = " 1h";if(VEGAS === 201) durum = "1h";if(VEGAS < 200) durum = "30m";if(VEGAS === 200) durum = "30m";if(100 === VEGAS) durum = "30m";if(VEGAS < 100) durum = "25m";if(VEGAS === 100) durum = "25m";if(VEGAS === 71) durum = "25m";if(VEGAS < 70) durum = "5m";if(VEGAS === 70) durum = "5m";if(41 === VEGAS) durum = "5m";if(VEGAS === 40) durum = "3m";if(VEGAS < 40) durum = "3m";if(21 === VEGAS) durum = "3m";if(VEGAS < 20) durum = "0";if(20 === VEGAS) durum = "0";if(VEGAS === 1) durum = "0";if(VEGAS == `0`) durum = "0";
  let durum2;if(VEGAS > 201) durum2 = " \`(+1 saat)\`";if(VEGAS === 201) durum2 = " \`(+1 saat)\`";if(VEGAS < 200) durum2 = " \`(+30 dakika)\`";if(VEGAS === 200) durum2 = " \`(+30 dakika)\`";if(100 === VEGAS) durum2 = " \`(+30 dakika)\``";if(VEGAS < 100) durum2 = " \`(+25 dakika)\`";if(VEGAS === 100) durum2 = " \`(+25 dakika)\`";if(VEGAS === 71) durum2 = " \`(+25 dakika)\`";if(VEGAS < 70) durum2 = " \`(+5 dakika)\`";if(VEGAS === 70) durum2 = " \`(+5 dakika)\`";if(41 === VEGAS) durum2 = " \`(+5 dakika)\`";if(VEGAS === 40) durum2 = " \`(+3 dakika)\`";if(VEGAS < 40) durum2 = " \`(+3 dakika)\`";if(21 === VEGAS) durum2 = " \`(+3 dakika)\`";if(VEGAS < 20) durum2 = "";if(20 === VEGAS) durum2 = "";if(VEGAS === 1) durum2 = "";if(VEGAS == `0`) durum2 = "";
  let qwe = durum.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')
  let sebep1 = 'Sunucunun düzenini bozucak hal ve davranış'
  let timereplace1 = '1d'
  let cezasüre1 = '1 gün'
  var tarih2 = ms(timereplace1)
  var tarih4 = ms(durum)
  var tarih3 = Date.now() + tarih2 + tarih4 
  let count = await CezaDatabase.countDocuments().exec();
  count = count == 0 ? 1 : count + 1;  
  uye.roles.cache.has(boosterTrue) ?  uye.roles.set([boosterTrue, punitiveRole]) : uye.roles.set([punitiveRole])
  await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { jail: 1 } }, { upsert: true })
  await CezaSayıDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { jail: 1 } }, { upsert: true });
  await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { cezapuanıjail: 15 } }, { upsert: true });
  let Ceza = await new CezaDatabase({guildID: msg.guild.id,authorID: msg.author.id,cezaID: count,userID: uye.id,jail: true,time: cezasüre1,date: Date.now(),finishDate: tarih3,Reason: sebep1,Type: "Jail"}).save()
  m.edit(new MessageEmbed().setDescription(`${uye} 1 numaralı \`Sunucunun düzenini bozucak hal ve davranış\` sebebiyle cezalı veritabanına kayıt edildi.\nCeza bitiş tarihi: ${moment(tarih3).locale('TR').format('LLL')}${durum2}.`).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setAuthor(msg.author.tag, msg.member.user.avatarURL({dynamic: true}))) && m.reactions.removeAll() && m.react('1️⃣')
  if (client.channels.cache.get(jailLog)) client.channels.cache.get(jailLog).send(new MessageEmbed().setColor("27d38a").setFooter(`Ceza Numarası: #${count}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesi geçici olarak karantinaya atıldı.\n\n• Karantina Başlangıç \`${moment(Date.now()).locale('TR').format('LLL')}\`\n• Karantina Bitiş \`${moment(tarih3).locale('TR').format('LLL')}\`\n• Süre \`${cezasüre1}\`${durum2}\n\n• Sebep \`Sunucunun düzenini bozucak hal ve davranış\``)) 
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let chatMute = CezapuanData && CezapuanData.cezapuanıchatmute ? CezapuanData.cezapuanıchatmute : 0
  let sesMute = CezapuanData && CezapuanData.cezapuanıvoicemute ? CezapuanData.cezapuanıvoicemute : 0
  let ban = CezapuanData && CezapuanData.cezapuanıban ? CezapuanData.cezapuanıban : 0
  let jail = CezapuanData && CezapuanData.cezapuanıjail ? CezapuanData.cezapuanıjail : 0
  let toplam = chatMute+sesMute+ban+jail;
  if (client.channels.cache.get(cezaPuanıLog)) {
   if (toplam === 15) { 
    client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${uye}: aldığınız **#${count}** ID'li ceza ile ilk ceza puanlandırmanız yapıldı **${toplam}** ceza puanına ulaştınız.`)
  } else client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${uye}: aldığınız **#${count}** ID'li ceza ile **${toplam-15}** ceza puanından **${toplam}** ceza puanına ulaştınız.`)
  }
  if (uye.voice.channel) uye.voice.kick();
  client.react(msg, "tick") 
  client.checkCeza(uye, msg, toplam)}
  if (reaction.emoji.name === "2️⃣") {
  let CezalıRolesData = await CezalıRolesDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let memberRoles = uye.roles.cache.map(x => x.id)
  if(!CezalıRolesData) {let newCezaa = new CezalıRolesDatabase({guildID: msg.guild.id, userID: uye.id, roles: memberRoles}).save();} else{
  CezalıRolesData.roles.push(memberRoles); 
  CezalıRolesData.save();}
  let CezapuanData2 = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let chatMutee = CezapuanData2 && CezapuanData2.cezapuanıchatmute ? CezapuanData2.cezapuanıchatmute : 0
  let sesMutee = CezapuanData2 && CezapuanData2.cezapuanıvoicemute ? CezapuanData2.cezapuanıvoicemute : 0
  let bann = CezapuanData2 && CezapuanData2.cezapuanıban ? CezapuanData2.cezapuanıban : 0
  let jaill = CezapuanData2 && CezapuanData2.cezapuanıjail ? CezapuanData2.cezapuanıjail : 0
  let VEGAS = chatMutee+sesMutee+bann+jaill;
  let durum;if(VEGAS > 201) durum = " 1h";if(VEGAS === 201) durum = "1h";if(VEGAS < 200) durum = "30m";if(VEGAS === 200) durum = "30m";if(100 === VEGAS) durum = "30m";if(VEGAS < 100) durum = "25m";if(VEGAS === 100) durum = "25m";if(VEGAS === 71) durum = "25m";if(VEGAS < 70) durum = "5m";if(VEGAS === 70) durum = "5m";if(41 === VEGAS) durum = "5m";if(VEGAS === 40) durum = "3m";if(VEGAS < 40) durum = "3m";if(21 === VEGAS) durum = "3m";if(VEGAS < 20) durum = "0";if(20 === VEGAS) durum = "0";if(VEGAS === 1) durum = "0";if(VEGAS == `0`) durum = "0";
  let durum2;if(VEGAS > 201) durum2 = " \`(+1 saat)\`";if(VEGAS === 201) durum2 = " \`(+1 saat)\`";if(VEGAS < 200) durum2 = " \`(+30 dakika)\`";if(VEGAS === 200) durum2 = " \`(+30 dakika)\`";if(100 === VEGAS) durum2 = " \`(+30 dakika)\``";if(VEGAS < 100) durum2 = " \`(+25 dakika)\`";if(VEGAS === 100) durum2 = " \`(+25 dakika)\`";if(VEGAS === 71) durum2 = " \`(+25 dakika)\`";if(VEGAS < 70) durum2 = " \`(+5 dakika)\`";if(VEGAS === 70) durum2 = " \`(+5 dakika)\`";if(41 === VEGAS) durum2 = " \`(+5 dakika)\`";if(VEGAS === 40) durum2 = " \`(+3 dakika)\`";if(VEGAS < 40) durum2 = " \`(+3 dakika)\`";if(21 === VEGAS) durum2 = " \`(+3 dakika)\`";if(VEGAS < 20) durum2 = "";if(20 === VEGAS) durum2 = "";if(VEGAS === 1) durum2 = "";if(VEGAS == `0`) durum2 = "";
  let qwe = durum.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')
  let sebep2 = 'Din / ırkçılık / siyaset'
  let timereplace2 = '1d'
  let cezasüre2 = '1 gün'
  var tarih2 = ms(timereplace2)
  var tarih4 = ms(durum)
  var tarih3 = Date.now() + tarih2 + tarih4
  let count = await CezaDatabase.countDocuments().exec();
  count = count == 0 ? 1 : count + 1;                            
  uye.roles.cache.has(boosterTrue) ?  uye.roles.set([boosterTrue, punitiveRole]) : uye.roles.set([punitiveRole])
  await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { jail: 1 } }, { upsert: true })
  await CezaSayıDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { jail: 1 } }, { upsert: true });
  await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { cezapuanıjail: 15 } }, { upsert: true });
  let Ceza = await new CezaDatabase({guildID: msg.guild.id,authorID: msg.author.id,cezaID: count,userID: uye.id,jail :true,time: cezasüre2,date: Date.now(),finishDate: tarih3,Reason: sebep2,Type: "Jail"}).save()
  m.edit(new MessageEmbed().setDescription(`${uye} 2 numaralı \`Din / ırkçılık / siyaset\` sebebiyle cezalı veritabanına kayıt edildi.\nCeza bitiş tarihi: ${moment(tarih3).locale('TR').format('LLL')}${durum2}.`).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setAuthor(msg.author.tag, msg.member.user.avatarURL({dynamic: true}))) && m.reactions.removeAll() && m.react('2️⃣')
  if (client.channels.cache.get(jailLog)) client.channels.cache.get(jailLog).send(new MessageEmbed().setColor("27d38a").setFooter(`Ceza Numarası: #${count}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesi geçici olarak karantinaya atıldı.\n\n• Karantina Başlangıç: \`${moment(Date.now()).locale('TR').format('LLL')}\`\n• Karantina Bitiş: \`${moment(tarih3).locale('TR').format('LLL')}\`\n• Süre: \`${cezasüre2}\`${durum2}\n\n• Sebep: \`Din / ırkçılık / siyaset\``)) 
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let chatMute = CezapuanData && CezapuanData.cezapuanıchatmute ? CezapuanData.cezapuanıchatmute : 0
  let sesMute = CezapuanData && CezapuanData.cezapuanıvoicemute ? CezapuanData.cezapuanıvoicemute : 0
  let ban = CezapuanData && CezapuanData.cezapuanıban ? CezapuanData.cezapuanıban : 0
  let jail = CezapuanData && CezapuanData.cezapuanıjail ? CezapuanData.cezapuanıjail : 0
  let toplam = chatMute+sesMute+ban+jail;
  if (client.channels.cache.get(cezaPuanıLog)) client.channels.cache.get(cezaPuanıLog).send(`${uye}: aldığınız **#${count}** ID'li ceza ile **${toplam}** ceza puanına ulaştınız.`)
  if (uye.voice.channel) uye.voice.kick();client.react(msg, "tick") 
  client.checkCeza(uye, msg, toplam+15)}
  if (reaction.emoji.name === "3️⃣") {
  let CezalıRolesData = await CezalıRolesDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let memberRoles = uye.roles.cache.map(x => x.id)
  if(!CezalıRolesData) {let newCezaa = new CezalıRolesDatabase({guildID: msg.guild.id, userID: uye.id, roles: memberRoles}).save();} else{
  CezalıRolesData.roles.push(memberRoles); 
  CezalıRolesData.save();}
  let CezapuanData2 = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let chatMutee = CezapuanData2 && CezapuanData2.cezapuanıchatmute ? CezapuanData2.cezapuanıchatmute : 0
  let sesMutee = CezapuanData2 && CezapuanData2.cezapuanıvoicemute ? CezapuanData2.cezapuanıvoicemute : 0
  let bann = CezapuanData2 && CezapuanData2.cezapuanıban ? CezapuanData2.cezapuanıban : 0
  let jaill = CezapuanData2 && CezapuanData2.cezapuanıjail ? CezapuanData2.cezapuanıjail : 0
  let VEGAS = chatMutee+sesMutee+bann+jaill;
  let durum;if(VEGAS > 201) durum = " 1h";if(VEGAS === 201) durum = "1h";if(VEGAS < 200) durum = "30m";if(VEGAS === 200) durum = "30m";if(100 === VEGAS) durum = "30m";if(VEGAS < 100) durum = "25m";if(VEGAS === 100) durum = "25m";if(VEGAS === 71) durum = "25m";if(VEGAS < 70) durum = "5m";if(VEGAS === 70) durum = "5m";if(41 === VEGAS) durum = "5m";if(VEGAS === 40) durum = "3m";if(VEGAS < 40) durum = "3m";if(21 === VEGAS) durum = "3m";if(VEGAS < 20) durum = "0";if(20 === VEGAS) durum = "0";if(VEGAS === 1) durum = "0";if(VEGAS == `0`) durum = "0";
  let durum2;if(VEGAS > 201) durum2 = " \`(+1 saat)\`";if(VEGAS === 201) durum2 = " \`(+1 saat)\`";if(VEGAS < 200) durum2 = " \`(+30 dakika)\`";if(VEGAS === 200) durum2 = " \`(+30 dakika)\`";if(100 === VEGAS) durum2 = " \`(+30 dakika)\``";if(VEGAS < 100) durum2 = " \`(+25 dakika)\`";if(VEGAS === 100) durum2 = " \`(+25 dakika)\`";if(VEGAS === 71) durum2 = " \`(+25 dakika)\`";if(VEGAS < 70) durum2 = " \`(+5 dakika)\`";if(VEGAS === 70) durum2 = " \`(+5 dakika)\`";if(41 === VEGAS) durum2 = " \`(+5 dakika)\`";if(VEGAS === 40) durum2 = " \`(+3 dakika)\`";if(VEGAS < 40) durum2 = " \`(+3 dakika)\`";if(21 === VEGAS) durum2 = " \`(+3 dakika)\`";if(VEGAS < 20) durum2 = "";if(20 === VEGAS) durum2 = "";if(VEGAS === 1) durum2 = "";if(VEGAS == `0`) durum2 = "";
  let qwe = durum.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')
  let sebep3 = 'Tehdit / Şantaj / İftira atmak / Kandırmak'
  let timereplace3 = '2d'
  let cezasüre3 = '2 gün'
  var tarih2 = ms(timereplace3)
  var tarih4 = ms(durum)
  var tarih3 = Date.now() + tarih2 + tarih4 
  let atilanay3 = moment(Date.now()).format("MM");
  let bitişay3 = moment(tarih3).format("MM");
  let count = await CezaDatabase.countDocuments().exec();
  count = count == 0 ? 1 : count + 1;                             
  uye.roles.cache.has(boosterTrue) ?  uye.roles.set([boosterTrue, punitiveRole]) : uye.roles.set([punitiveRole])
  await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { jail: 1 } }, { upsert: true })
  await CezaSayıDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { jail: 1 } }, { upsert: true });
  await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { cezapuanıjail: 15 } }, { upsert: true });
  let Ceza = await new CezaDatabase({guildID: msg.guild.id,authorID: msg.author.id,cezaID: count,userID: uye.id,jail :true,time: cezasüre3,date: Date.now(),finishDate: tarih3,Reason: sebep3,Type: "Jail"}).save()
  m.edit(new MessageEmbed().setDescription(`${uye} 3 numaralı \`Tehdit / Şantaj / İftira atmak / Kandırmak\` sebebiyle cezalı veritabanına kayıt edildi.\nCeza bitiş tarihi: ${moment(tarih3).locale('TR').format('LLL')}${durum2}.`).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setAuthor(msg.author.tag, msg.member.user.avatarURL({dynamic: true}))) && m.reactions.removeAll() && m.react('3️⃣')
  if (client.channels.cache.get(jailLog)) client.channels.cache.get(jailLog).send(new MessageEmbed().setColor("27d38a").setFooter(`Ceza Numarası: #${count}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesi geçici olarak karantinaya atıldı.\n\n• Karantina Başlangıç \`${moment(Date.now()).locale('TR').format('LLL')}\`\n• Karantina Bitiş \`${moment(tarih3).locale('TR').format('LLL')}\`\n• Süre \`${cezasüre3}\`${durum2}\n\n• Sebep \`Tehdit / Şantaj / İftira atmak / Kandırmak\``)) 
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let chatMute = CezapuanData && CezapuanData.cezapuanıchatmute ? CezapuanData.cezapuanıchatmute : 0
  let sesMute = CezapuanData && CezapuanData.cezapuanıvoicemute ? CezapuanData.cezapuanıvoicemute : 0
  let ban = CezapuanData && CezapuanData.cezapuanıban ? CezapuanData.cezapuanıban : 0
  let jail = CezapuanData && CezapuanData.cezapuanıjail ? CezapuanData.cezapuanıjail : 0
  let toplam = chatMute+sesMute+ban+jail;
  if (client.channels.cache.get(cezaPuanıLog)) {
   if (toplam === 15) { 
    client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${uye}: aldığınız **#${count}** ID'li ceza ile ilk ceza puanlandırmanız yapıldı **${toplam}** ceza puanına ulaştınız.`)
  } else client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${uye}: aldığınız **#${count}** ID'li ceza ile **${toplam-15}** ceza puanından **${toplam}** ceza puanına ulaştınız.`)
  }  if (uye.voice.channel) uye.voice.kick();client.react(msg, "tick")
  client.checkCeza(uye, msg, toplam)}
  if (reaction.emoji.name === "4️⃣") { 
  let CezalıRolesData = await CezalıRolesDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let memberRoles = uye.roles.cache.map(x => x.id)
  if(!CezalıRolesData) {let newCezaa = new CezalıRolesDatabase({guildID: msg.guild.id, userID: uye.id, roles: memberRoles}).save();} else{
  CezalıRolesData.roles.push(memberRoles); 
  CezalıRolesData.save();}
  let CezapuanData2 = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let chatMutee = CezapuanData2 && CezapuanData2.cezapuanıchatmute ? CezapuanData2.cezapuanıchatmute : 0
  let sesMutee = CezapuanData2 && CezapuanData2.cezapuanıvoicemute ? CezapuanData2.cezapuanıvoicemute : 0
  let bann = CezapuanData2 && CezapuanData2.cezapuanıban ? CezapuanData2.cezapuanıban : 0
  let jaill = CezapuanData2 && CezapuanData2.cezapuanıjail ? CezapuanData2.cezapuanıjail : 0
  let VEGAS = chatMutee+sesMutee+bann+jaill;
  let durum;if(VEGAS > 201) durum = " 1h";if(VEGAS === 201) durum = "1h";if(VEGAS < 200) durum = "30m";if(VEGAS === 200) durum = "30m";if(100 === VEGAS) durum = "30m";if(VEGAS < 100) durum = "25m";if(VEGAS === 100) durum = "25m";if(VEGAS === 71) durum = "25m";if(VEGAS < 70) durum = "5m";if(VEGAS === 70) durum = "5m";if(41 === VEGAS) durum = "5m";if(VEGAS === 40) durum = "3m";if(VEGAS < 40) durum = "3m";if(21 === VEGAS) durum = "3m";if(VEGAS < 20) durum = "0";if(20 === VEGAS) durum = "0";if(VEGAS === 1) durum = "0";if(VEGAS == `0`) durum = "0";
  let durum2;if(VEGAS > 201) durum2 = " \`(+1 saat)\`";if(VEGAS === 201) durum2 = " \`(+1 saat)\`";if(VEGAS < 200) durum2 = " \`(+30 dakika)\`";if(VEGAS === 200) durum2 = " \`(+30 dakika)\`";if(100 === VEGAS) durum2 = " \`(+30 dakika)\``";if(VEGAS < 100) durum2 = " \`(+25 dakika)\`";if(VEGAS === 100) durum2 = " \`(+25 dakika)\`";if(VEGAS === 71) durum2 = " \`(+25 dakika)\`";if(VEGAS < 70) durum2 = " \`(+5 dakika)\`";if(VEGAS === 70) durum2 = " \`(+5 dakika)\`";if(41 === VEGAS) durum2 = " \`(+5 dakika)\`";if(VEGAS === 40) durum2 = " \`(+3 dakika)\`";if(VEGAS < 40) durum2 = " \`(+3 dakika)\`";if(21 === VEGAS) durum2 = " \`(+3 dakika)\`";if(VEGAS < 20) durum2 = "";if(20 === VEGAS) durum2 = "";if(VEGAS === 1) durum2 = "";if(VEGAS == `0`) durum2 = "";
  let qwe = durum.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')
  let sebep4 = 'Uyarılara rağmen küfür ve trol'
  let timereplace4 = '2d'
  let cezasüre4 = '2 gün'
  var tarih2 = ms(timereplace4)
  var tarih4 = ms(durum)
  var tarih3 = Date.now() + tarih2 + tarih4 
  let count = await CezaDatabase.countDocuments().exec();
  count = count == 0 ? 1 : count + 1;                       
  await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { jail: 1 } }, { upsert: true })
  await CezaSayıDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { jail: 1 } }, { upsert: true });
  await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { cezapuanıjail: 15 } }, { upsert: true });
  let Ceza = await new CezaDatabase({guildID: msg.guild.id,authorID: msg.author.id,cezaID: count,userID: uye.id,jail :true,time: cezasüre4,date: Date.now(),finishDate: tarih3,Reason: sebep4,Type: "Jail"}).save()
  uye.roles.cache.has(boosterTrue) ?  uye.roles.set([boosterTrue, punitiveRole]) : uye.roles.set([punitiveRole])
  m.edit(new MessageEmbed().setDescription(`${uye} 4 numaralı \`Uyarılara rağmen küfür ve trol\` sebebiyle cezalı veritabanına kayıt edildi.\nCeza bitiş tarihi: ${moment(tarih3).locale('TR').format('LLL')}${durum2}.`).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setAuthor(msg.author.tag, msg.member.user.avatarURL({dynamic: true}))) && m.reactions.removeAll() && m.react('4️⃣')
  if (client.channels.cache.get(jailLog)) client.channels.cache.get(jailLog).send(new MessageEmbed().setColor("27d38a").setFooter(`Ceza Numarası: #${count}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesi geçici olarak karantinaya atıldı.\n\n• Karantina Başlangıç \`${moment(Date.now()).locale('TR').format('LLL')}\`\n• Karantina Bitiş \`${moment(tarih3).locale('TR').format('LLL')}\`\n• Süre \`${cezasüre4}\`${durum2}\n\n• Sebep \`Uyarılara rağmen küfür ve trol\``)) 
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let chatMute = CezapuanData && CezapuanData.cezapuanıchatmute ? CezapuanData.cezapuanıchatmute : 0
  let sesMute = CezapuanData && CezapuanData.cezapuanıvoicemute ? CezapuanData.cezapuanıvoicemute : 0
  let ban = CezapuanData && CezapuanData.cezapuanıban ? CezapuanData.cezapuanıban : 0
  let jail = CezapuanData && CezapuanData.cezapuanıjail ? CezapuanData.cezapuanıjail : 0
  let toplam = chatMute+sesMute+ban+jail;
  if (client.channels.cache.get(cezaPuanıLog)) {
   if (toplam === 15) { 
    client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${uye}: aldığınız **#${count}** ID'li ceza ile ilk ceza puanlandırmanız yapıldı **${toplam}** ceza puanına ulaştınız.`)
  } else client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${uye}: aldığınız **#${count}** ID'li ceza ile **${toplam-15}** ceza puanından **${toplam}** ceza puanına ulaştınız.`)
  }  if (uye.voice.channel) uye.voice.kick();client.react(msg, "tick")
  client.checkCeza(uye, msg, toplam)}
  if (reaction.emoji.name === "5️⃣") {
  let CezalıRolesData = await CezalıRolesDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let memberRoles = uye.roles.cache.map(x => x.id)
  if(!CezalıRolesData) {let newCezaa = new CezalıRolesDatabase({guildID: msg.guild.id, userID: uye.id, roles: memberRoles}).save();} else{
  CezalıRolesData.roles.push(memberRoles); 
  CezalıRolesData.save();}
  let CezapuanData2 = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let chatMutee = CezapuanData2 && CezapuanData2.cezapuanıchatmute ? CezapuanData2.cezapuanıchatmute : 0
  let sesMutee = CezapuanData2 && CezapuanData2.cezapuanıvoicemute ? CezapuanData2.cezapuanıvoicemute : 0
  let bann = CezapuanData2 && CezapuanData2.cezapuanıban ? CezapuanData2.cezapuanıban : 0
  let jaill = CezapuanData2 && CezapuanData2.cezapuanıjail ? CezapuanData2.cezapuanıjail : 0
  let VEGAS = chatMutee+sesMutee+bann+jaill;
  let durum;if(VEGAS > 201) durum = " 1h";if(VEGAS === 201) durum = "1h";if(VEGAS < 200) durum = "30m";if(VEGAS === 200) durum = "30m";if(100 === VEGAS) durum = "30m";if(VEGAS < 100) durum = "25m";if(VEGAS === 100) durum = "25m";if(VEGAS === 71) durum = "25m";if(VEGAS < 70) durum = "5m";if(VEGAS === 70) durum = "5m";if(41 === VEGAS) durum = "5m";if(VEGAS === 40) durum = "3m";if(VEGAS < 40) durum = "3m";if(21 === VEGAS) durum = "3m";if(VEGAS < 20) durum = "0";if(20 === VEGAS) durum = "0";if(VEGAS === 1) durum = "0";if(VEGAS == `0`) durum = "0";
  let durum2;if(VEGAS > 201) durum2 = " \`(+1 saat)\`";if(VEGAS === 201) durum2 = " \`(+1 saat)\`";if(VEGAS < 200) durum2 = " \`(+30 dakika)\`";if(VEGAS === 200) durum2 = " \`(+30 dakika)\`";if(100 === VEGAS) durum2 = " \`(+30 dakika)\``";if(VEGAS < 100) durum2 = " \`(+25 dakika)\`";if(VEGAS === 100) durum2 = " \`(+25 dakika)\`";if(VEGAS === 71) durum2 = " \`(+25 dakika)\`";if(VEGAS < 70) durum2 = " \`(+5 dakika)\`";if(VEGAS === 70) durum2 = " \`(+5 dakika)\`";if(41 === VEGAS) durum2 = " \`(+5 dakika)\`";if(VEGAS === 40) durum2 = " \`(+3 dakika)\`";if(VEGAS < 40) durum2 = " \`(+3 dakika)\`";if(21 === VEGAS) durum2 = " \`(+3 dakika)\`";if(VEGAS < 20) durum2 = "";if(20 === VEGAS) durum2 = "";if(VEGAS === 1) durum2 = "";if(VEGAS == `0`) durum2 = "";
  let qwe = durum.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')
  let sebep5 = 'Reklam'
  let timereplace5 = '14d'
  let cezasüre5 = '14 gün'
  var tarih2 = ms(timereplace5)
  var tarih4 = ms(durum)
  var tarih3 = Date.now() + tarih2 + tarih4 
  let count = await CezaDatabase.countDocuments().exec();
  count = count == 0 ? 1 : count + 1;  
  uye.roles.cache.has(boosterTrue) ?  uye.roles.set([boosterTrue, punitiveRole]) : uye.roles.set([punitiveRole])
  await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { jail: 1 } }, { upsert: true })
  await CezaSayıDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { jail: 1 } }, { upsert: true });
  await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { cezapuanıjail: 15 } }, { upsert: true });
  let Ceza = await new CezaDatabase({guildID: msg.guild.id,authorID: msg.author.id,cezaID: count,userID: uye.id,jail :true,time: cezasüre5,date: Date.now(),finishDate: tarih3,Reason: sebep5,Type: "Jail"}).save()
  m.edit(new MessageEmbed().setDescription(`${uye} 5 numaralı \`Reklam\` sebebiyle cezalı veritabanına kayıt edildi.\nCeza bitiş tarihi: ${moment(tarih3).locale('TR').format('LLL')}${durum2}.`).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setAuthor(msg.author.tag, msg.member.user.avatarURL({dynamic: true}))) && m.reactions.removeAll() && m.react('5️⃣')
  if (client.channels.cache.get(jailLog)) client.channels.cache.get(jailLog).send(new MessageEmbed().setColor("27d38a").setFooter(`Ceza Numarası: #${count}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesi geçici olarak karantinaya atıldı.\n\n• Karantina Başlangıç \`${moment(Date.now()).locale('TR').format('LLL')}\`\n• Karantina Bitiş \`${moment(tarih3).locale('TR').format('LLL')}\`\n• Süre \`${cezasüre5}\`${durum2}\n\n• Sebep \`Reklam\``)) 
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let chatMute = CezapuanData && CezapuanData.cezapuanıchatmute ? CezapuanData.cezapuanıchatmute : 0
  let sesMute = CezapuanData && CezapuanData.cezapuanıvoicemute ? CezapuanData.cezapuanıvoicemute : 0
  let ban = CezapuanData && CezapuanData.cezapuanıban ? CezapuanData.cezapuanıban : 0
  let jail = CezapuanData && CezapuanData.cezapuanıjail ? CezapuanData.cezapuanıjail : 0
  let toplam = chatMute+sesMute+ban+jail;
  if (client.channels.cache.get(cezaPuanıLog)) {
   if (toplam === 15) { 
    client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${uye}: aldığınız **#${count}** ID'li ceza ile ilk ceza puanlandırmanız yapıldı **${toplam}** ceza puanına ulaştınız.`)
  } else client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${uye}: aldığınız **#${count}** ID'li ceza ile **${toplam-15}** ceza puanından **${toplam}** ceza puanına ulaştınız.`)
  }  if (uye.voice.channel) uye.voice.kick();client.react(msg, "tick")  
  client.checkCeza(uye, msg, toplam)}
  if (reaction.emoji.name === "6️⃣") {
  let CezalıRolesData = await CezalıRolesDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let memberRoles = uye.roles.cache.map(x => x.id)
  if(!CezalıRolesData) {let newCezaa = new CezalıRolesDatabase({guildID: msg.guild.id, userID: uye.id, roles: memberRoles}).save();} else{
  CezalıRolesData.roles.push(memberRoles); 
  CezalıRolesData.save();}
  let CezapuanData2 = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let chatMutee = CezapuanData2 && CezapuanData2.cezapuanıchatmute ? CezapuanData2.cezapuanıchatmute : 0
  let sesMutee = CezapuanData2 && CezapuanData2.cezapuanıvoicemute ? CezapuanData2.cezapuanıvoicemute : 0
  let bann = CezapuanData2 && CezapuanData2.cezapuanıban ? CezapuanData2.cezapuanıban : 0
  let jaill = CezapuanData2 && CezapuanData2.cezapuanıjail ? CezapuanData2.cezapuanıjail : 0
  let VEGAS = chatMutee+sesMutee+bann+jaill;
  let durum;if(VEGAS > 201) durum = " 1h";if(VEGAS === 201) durum = "1h";if(VEGAS < 200) durum = "30m";if(VEGAS === 200) durum = "30m";if(100 === VEGAS) durum = "30m";if(VEGAS < 100) durum = "25m";if(VEGAS === 100) durum = "25m";if(VEGAS === 71) durum = "25m";if(VEGAS < 70) durum = "5m";if(VEGAS === 70) durum = "5m";if(41 === VEGAS) durum = "5m";if(VEGAS === 40) durum = "3m";if(VEGAS < 40) durum = "3m";if(21 === VEGAS) durum = "3m";if(VEGAS < 20) durum = "0";if(20 === VEGAS) durum = "0";if(VEGAS === 1) durum = "0";if(VEGAS == `0`) durum = "0";
  let durum2;if(VEGAS > 201) durum2 = " \`(+1 saat)\`";if(VEGAS === 201) durum2 = " \`(+1 saat)\`";if(VEGAS < 200) durum2 = " \`(+30 dakika)\`";if(VEGAS === 200) durum2 = " \`(+30 dakika)\`";if(100 === VEGAS) durum2 = " \`(+30 dakika)\``";if(VEGAS < 100) durum2 = " \`(+25 dakika)\`";if(VEGAS === 100) durum2 = " \`(+25 dakika)\`";if(VEGAS === 71) durum2 = " \`(+25 dakika)\`";if(VEGAS < 70) durum2 = " \`(+5 dakika)\`";if(VEGAS === 70) durum2 = " \`(+5 dakika)\`";if(41 === VEGAS) durum2 = " \`(+5 dakika)\`";if(VEGAS === 40) durum2 = " \`(+3 dakika)\`";if(VEGAS < 40) durum2 = " \`(+3 dakika)\`";if(21 === VEGAS) durum2 = " \`(+3 dakika)\`";if(VEGAS < 20) durum2 = "";if(20 === VEGAS) durum2 = "";if(VEGAS === 1) durum2 = "";if(VEGAS == `0`) durum2 = "";
  let qwe = durum.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')
  let sebep6 = 'Taciz'
  let timereplace6 = '7d'
  let cezasüre6 = '7 gün'
  var tarih2 = ms(timereplace6)
  var tarih4 = ms(durum)
  var tarih3 = Date.now() + tarih2 + tarih4 
  let count = await CezaDatabase.countDocuments().exec();
  count = count == 0 ? 1 : count + 1;                               
  uye.roles.cache.has(boosterTrue) ?  uye.roles.set([boosterTrue, punitiveRole]) : uye.roles.set([punitiveRole])
  await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { jail: 1 } }, { upsert: true })
  await CezaSayıDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { jail: 1 } }, { upsert: true });
  await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { cezapuanıjail: 15 } }, { upsert: true });
  let Ceza = await new CezaDatabase({guildID: msg.guild.id,authorID: msg.author.id,cezaID: count,userID: uye.id,jail :true,time: cezasüre6,date: Date.now(),finishDate: tarih3,Reason: sebep6,Type: "Jail"}).save()
  m.edit(new MessageEmbed().setDescription(`${uye} 6 numaralı \`Taciz\` sebebiyle cezalı veritabanına kayıt edildi.\nCeza bitiş tarihi: ${moment(tarih3).locale('TR').format('LLL')}${durum2}.`).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setAuthor(msg.author.tag, msg.member.user.avatarURL({dynamic: true}))) && m.reactions.removeAll() && m.react('6️⃣')
  if (client.channels.cache.get(jailLog)) client.channels.cache.get(jailLog).send(new MessageEmbed().setColor("27d38a").setFooter(`Ceza Numarası: #${count}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesi geçici olarak karantinaya atıldı.\n\n• Karantina Başlangıç \`${moment(Date.now()).locale('TR').format('LLL')}\`\n• Karantina Bitiş \`${moment(tarih3).locale('TR').format('LLL')}\`\n• Süre \`${cezasüre6}\`${durum2}\n\n• Sebep \`Taciz\``)) 
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let chatMute = CezapuanData && CezapuanData.cezapuanıchatmute ? CezapuanData.cezapuanıchatmute : 0
  let sesMute = CezapuanData && CezapuanData.cezapuanıvoicemute ? CezapuanData.cezapuanıvoicemute : 0
  let ban = CezapuanData && CezapuanData.cezapuanıban ? CezapuanData.cezapuanıban : 0
  let jail = CezapuanData && CezapuanData.cezapuanıjail ? CezapuanData.cezapuanıjail : 0
  let toplam = chatMute+sesMute+ban+jail;
  if (client.channels.cache.get(cezaPuanıLog)) {
   if (toplam === 15) { 
    client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${uye}: aldığınız **#${count}** ID'li ceza ile ilk ceza puanlandırmanız yapıldı **${toplam}** ceza puanına ulaştınız.`)
  } else client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${uye}: aldığınız **#${count}** ID'li ceza ile **${toplam-15}** ceza puanından **${toplam}** ceza puanına ulaştınız.`)
  }  if (uye.voice.channel) uye.voice.kick();
  client.react(msg, "tick")  
  client.checkCeza(uye, msg, toplam)}}).catch(() => m.edit(new MessageEmbed().setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setAuthor(msg.author.tag, msg.member.user.avatarURL({dynamic:true})).setDescription(`Seçim için belirtilen sürede tepkiye tıklanmadığı için işlem iptal edildi.`)) && m.reactions.removeAll())))))))}}