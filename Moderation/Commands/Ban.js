module.exports = {
  conf: {
    aliases: ["yargı","idam","yak"],
    name: "ban",
    usage: 'ban [üye] [sebep]',
    description: 'Belirttiğiniz kullanıcı banlarsınız. (Yarım Saat 5 Ban Atabilme Hakkınız Vardır, Sunucu da Olmayan Birisine De Ban Atabilirsiniz.)',
  },
 run: async ({client, msg, args, Discord, uye, cfg, MessageEmbed, moment, guild, uyekontrol, CezaDatabase, CezapuanDatabase, CezaSayıDatabase, BanInfoDatabase, StaffDatabase, ControlsDatabase, SetupDatabase}) => {
  
  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : []
  let botCommandsTrue = res && res.botCommandsRoles ? res.botCommandsRoles : []
  let banTrue = res && res.banHammerRoles ? res.banHammerRoles : []
  let cezaPuanıLog = res && res.cezaPuanıLog ? res.cezaPuanıLog : ""
  let banLog = res && res.banLog ? res.banLog : ""
  let boosterRole = res && res.boosterRole ? res.boosterRole : ""
  let banLimitNumber = res && res.banLimit ? res.banLimit : 5
  
  if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.some(r => banTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  let sebep = args.slice(1).join(' ');
  if (!sebep) sebep = 'Sebep belirtilmemiş.'
  let banlılar = await msg.guild.fetchBans();
  if (banlılar.get(args[0])) return client.timemessage(client.normalEmbed(`Belirttiğiniz kullanıcı zaten banlanmış!`,msg), msg.channel.id, 5000)
  if (!args[0]) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`,msg), msg.channel.id, 5000)
  if (uyekontrol === "False") {
  let victim;
  if (args[0] instanceof Discord.GuildMember) { victim = args[0].user; }else if(args[0] instanceof Discord.User) { victim = args[0]; }else { victim = await client.users.fetch(args[0])} 
  if (banlılar.get(args[0])) return client.timemessage(client.normalEmbed(`${victim.tag} kullanıcısı zaten yasaklanmış durumda.`,msg), msg.channel.id, 5000)
  if (!msg.member.hasPermission(8)) await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { banLimit: 1 } }, { upsert: true }) 
  let StaffData = await StaffDatabase.findOne({ guildID: msg.guild.id, userID: msg.author.id})
  let banLimit = StaffData && StaffData.banLimit ? StaffData.banLimit-1 : 0
  if (banLimit >= banLimitNumber) return client.message(client.normalEmbed(`Gün içerisinde çok fazla ban işlemi uyguladığınız için komut geçici olarak kullanımınıza kapatılmıştır.`, msg), msg.channel.id)       
  let count = await CezaDatabase.countDocuments().exec();
  count = count == 0 ? 1 : count + 1;   
  msg.guild.members.ban(victim.id, {reason: `${sebep}`})
  let VegasEmbedx1 = new MessageEmbed().setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true})).setDescription(`**${victim.tag.replace("`","")}** kullanıcısı **${msg.author.tag.replace("`","")}** tarafından başarıyla sunucudan yasaklandı. (Ceza Numarası: \`#${count}\`)`).setColor("RANDOM").setImage(cfg.GifPp.BanGif)
  msg.channel.send(VegasEmbedx1)
  await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { ban: 1 } }, { upsert: true })
  let Ceza = await new CezaDatabase({guildID: msg.guild.id,authorID: msg.author.id,cezaID: count,userID: victim.id,time: "",date: Date.now(),finishDate: 0,Reason: sebep,Type: "Ban", ban: true}).save()
  await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: victim.id}, { $inc: { cezapuanıban: 10, cezaPuanıTotal: 10 } }, { upsert: true });
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: victim.id})
  await CezaSayıDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: victim.id}, { $inc: { ban: 1 } }, { upsert: true });
  if (client.channels.cache.get(banLog)) client.channels.cache.get(banLog).send(new MessageEmbed().setColor("BLACK").setFooter(`Ceza Numarası: #${count}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`**${victim.tag.replace("`","")}** (\`${victim.id}\`) adlı kullanıcı yasaklandı.\n\n• Yasaklayan Yetkili: ${msg.author} (\`${msg.author.id}\`)\n• Yasaklanma Sebebi: \`${sebep}\`\n• Yasaklanma Tarihi: \`${moment(Date.now()).locale('TR').format('LLL')}\``))
  let totalCezapuan = CezapuanData && CezapuanData.cezaPuanıTotal ? CezapuanData.cezaPuanıTotal : 0
  if (client.channels.cache.get(cezaPuanıLog)) {
   if (totalCezapuan === 10) { 
    client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${victim.tag}: aldığınız **#${count}** ID'li ceza ile ilk ceza puanlandırmanız yapıldı **${totalCezapuan}** ceza puanına ulaştınız.`)
   } else client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${victim.tag}: aldığınız **#${count}** ID'li ceza ile **${totalCezapuan-10}** ceza puanından **${totalCezapuan}** ceza puanına ulaştınız.`)
  }
  if(totalCezapuan >= 250) {await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: victim.id}, { $inc: { cezapuanı250sınırceza: 1 } }, { upsert: true });}return} 
  if (uye.roles.cache.some(r => botCommandsTrue.includes(r.id)) && uye.roles.cache.some(r => commandsTrue.includes(r.id)) && uye.hasPermission(8)) return client.timemessage(client.normalEmbed(`Yetkililer birbirlerine ceza-i işlem uygulayamazlar.`, msg), msg.channel.id, 7000)
  if(uye.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`,msg), msg.channel.id, 5000)
  if(msg.member.roles.highest.position < uye.roles.highest.position) return client.timemessage(client.normalEmbed(`Kendi rolünden yüksek kişilere işlem uygulayamazsın!`,msg), msg.channel.id, 5000)
  if(msg.author.id === uye.user.id) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`,msg), msg.channel.id, 5000)
  if(uye.roles.cache.has(boosterRole)) return client.timemessage(client.normalEmbed(`Belirttiğin Kullanıcı **Booster** Olduğu İçin Banlayamazsın.`,msg), msg.channel.id, 5000)
  if (!msg.member.hasPermission(8)) await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { banLimit: 1 } }, { upsert: true })
  let StaffData = await StaffDatabase.findOne({ guildID: msg.guild.id, userID: msg.author.id})
  let banLimit = StaffData && StaffData.banLimit ? StaffData.banLimit-1 : 0
  if (banLimit >= banLimitNumber) {
   client.react(msg, "red")
   client.message(client.normalEmbed(`Gün içerisinde çok fazla ban işlemi uyguladığınız için komut geçici olarak kullanımınıza kapatılmıştır.`, msg), msg.channel.id)
  }
  let count = await CezaDatabase.countDocuments().exec();
  count = count == 0 ? 1 : count + 1;  
  msg.guild.members.ban(uye.id, {reason: `${sebep}`})
  let VegasEmbedx1 = new MessageEmbed().setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true})).setDescription(`**${uye.user.tag.replace("`","")}** kullanıcısı **${msg.author.tag.replace("`","")}** tarafından başarıyla sunucudan yasaklandı. (Ceza Numarası: \`#${count}\`)`).setColor("RANDOM").setImage(cfg.GifPp.BanGif)
  msg.channel.send(VegasEmbedx1)
  await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { ban: 1 } }, { upsert: true })
  if (!msg.member.hasPermission(8)) { await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { banlimit: 1 } }, { upsert: true })};
  let Ceza = await new CezaDatabase({guildID: msg.guild.id,authorID: msg.author.id,cezaID: count,userID: uye.id,time: "-",date: Date.now(),finishDate: 0 ,Reason: sebep,Type: "Ban", ban: true}).save()
  await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { cezapuanıban: 10, cezaPuanıTotal: 10 } }, { upsert: true });
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  await CezaSayıDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { ban: 1 } }, { upsert: true });
  if (client.channels.cache.get(banLog)) client.channels.cache.get(banLog).send(new MessageEmbed().setColor("BLACK").setFooter(`Ceza Numarası: #${count}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`**${uye.user.tag.replace("`","")}** (\`${uye.user.id}\`) adlı kullanıcı yasaklandı.\n\nYasaklayan Yetkili: ${msg.author} (\`${msg.author.id}\`)\nYasaklanma Sebebi: \`${sebep}\`\nYasaklanma Tarihi: \`${moment(Date.now()).locale('TR').format('LLL')}\``))
  let totalCezapuan = CezapuanData && CezapuanData.cezaPuanıTotal ? CezapuanData.cezaPuanıTotal : 0
  if (client.channels.cache.get(cezaPuanıLog)) {
   if (totalCezapuan === 10) { 
    client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${uye}: aldığınız **#${count}** ID'li ceza ile ilk ceza puanlandırmanız yapıldı **${totalCezapuan}** ceza puanına ulaştınız.`)
   } else client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${uye}: aldığınız **#${count}** ID'li ceza ile **${totalCezapuan-10}** ceza puanından **${totalCezapuan}** ceza puanına ulaştınız.`)
  }  if(totalCezapuan >= 250) {await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { cezapuanı250sınırceza: 1 } }, { upsert: true });}return}}