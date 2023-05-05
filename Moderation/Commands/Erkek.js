module.exports = {
  conf: {
    aliases: ["e","adam"],
    name: "erkek",
    usage: 'erkek [üye]',
    description: 'Belirttiğiniz üyeyi erkek olarak kayıt edersiniz.',
  },

 run: async ({SetupDatabase, client, cfg, msg, args, author, MessageEmbed, Puan, guild, CoinDatabase, moment, YetkiliKayıtDatabase, CezapuanDatabase, CezaSayıDatabase, ControlsDatabase, RegisterDatabase, StaffDatabase, görevDatabase}) => {
  
   const res = await SetupDatabase.findOne({guildID: msg.guild.id})
   let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : [] 
   let botCommandsTrue = res && res.botCommandsRoles ? res.botCommandsRoles : [] 
   let cezaPuanıLog = res && res.cezaPuanıLog ? res.cezaPuanıLog : ""
   let yetkiUpLog = res && res.yetkiUpLog ? res.yetkiUpLog : ""
   let chat = res && res.chat ? res.chat : ""
   let registerLog = res && res.registerLog ? res.registerLog : ""
   let manRoles = res && res.manRoles ? res.manRoles : [] 
   let staffRoles = res && res.staffRoles ? res.staffRoles : [] 
   let adminRole = res && res.adminRole ? res.adminRole : ""
   let vipRole = res && res.vipRole ? res.vipRole : ""
   let boosterRole = res && res.boosterRole ? res.boosterRole : ""
   let guildTag = res && res.guildTag ? res.guildTag : ""
   let taggedRole = res && res.taggedRole ? res.taggedRole : ""
   let registerPuan = res && res.registerPuan ? res.registerPuan : 8
   let registerCoin = res && res.registerCoin ? res.registerCoin : 8
   let registerLimitNumber = res && res.registerLimit ? res.registerLimit : 3
   let durum = res && res.autoPerm === true ? res.autoPerm : res.autoPerm === false ? res.autoPerm : ""
   let noAutoPerm = res && res.noAutoPerm ? res.noAutoPerm : [] 
  
   if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.some(r => botCommandsTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)                              
   try {const StaffData = await StaffDatabase.findOne({ guildID: msg.guild.id, userID: msg.author.id}); 
   const ControlsData = await ControlsDatabase.findOne({ guildID: msg.guild.id}); 
   let YetkiliKayıtData = await YetkiliKayıtDatabase.findOne({ guildID: msg.guild.id, authorID: msg.author.id})
   let vegas = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.guild.members.cache.get(YetkiliKayıtData.userID);
   if (vegas.user.bot) return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
   //if (vegas.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
   if (manRoles.length === 0) return client.message(client.normalEmbed(`Henüz erkek rolünün kurulumu yapılmamış, kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)
   if (vegas.roles.cache.some(r => manRoles.includes(r.id))) return client.timemessage(client.normalEmbed(`Kayıt etmek istediğin ${vegas} üyesi zaten daha önce kayıt edilmiş. Yanlış teyit işlemi uygulandıysa üst yönetime ulaşmaktan çekinme!`, msg), msg.channel.id, 10000)
   if (msg.member.roles.highest.position < vegas.roles.highest.position) return client.timemessage(client.normalEmbed(`Kendi rolünden yüksek kişilere işlem uygulayamazsın!`,msg), msg.channel.id, 5000)
   let isim = args[1]
  if(!isim) return client.timemessage(client.normalEmbed(`Üyeye geçerli bir isim gir ve tekrardan dene!`, msg), msg.channel.id, 5000)
   let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: vegas.id})
   let CezaSayıData = await CezaSayıDatabase.findOne({ guildID: msg.guild.id, userID: vegas.id})
   let chatMute = CezaSayıData && CezaSayıData.chatmute ? CezaSayıData.chatmute : 0
   let sesMute = CezaSayıData && CezaSayıData.voicemute ? CezaSayıData.voicemute : 0
   let ban = CezaSayıData && CezaSayıData.ban ? CezaSayıData.ban : 0
   let jail = CezaSayıData && CezaSayıData.jail ? CezaSayıData.jail : 0
   let total = chatMute+sesMute+ban+jail;
   let totalCezapuan = CezapuanData && CezapuanData.cezaPuanıTotal ? CezapuanData.cezaPuanıTotal : 0
   if (!msg.member.hasPermission(8)) await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { registerLimit: 1 } }, { upsert: true })   
   let doc = await StaffDatabase.findOne({ guildID: msg.guild.id, userID: msg.author.id})
   let registerLimit = doc && doc.registerLimit ? doc.registerLimit-1 : 0
   if (registerLimit >= registerLimitNumber) return client.message(client.normalEmbed(`1 dakika içerisinde çok fazla kayıt işlemi uyguladığınız için komut geçici olarak kullanımınıza kapatılmıştır.`, msg), msg.channel.id)   
   if (!msg.member.hasPermission(8)) {
   if (ControlsData && ControlsData.taglıalım === "Açık") {
   if (!vegas.roles.cache.has(vipRole) && !vegas.roles.cache.has(boosterRole) && !!cfg.Tag.Tags.some(x => vegas.user.tag.includes(x))) return client.message(client.normalEmbed(`${cfg.Emoji.Dikkat} Sunucumuz **tagsız** alımlara kapalıdır. Kayıt işlemini yapabilmeniz için kullanıcının tagımızı alması gerekmektedir.`, msg), msg.channel.id) 
   }}
   if(!msg.member.hasPermission(8)) {
   if(totalCezapuan > 40) {return client.timemessage(client.normalEmbed(`🚫 Bu üyenin ceza puanı **${totalCezapuan}** Bu sebepten ötürü kayıt işlemi iptal edildi.Sunucumuzda tüm işlemlerin kayıt altına alındığını unutmayın.Sorun teşkil eden, sunucunun huzurunu bozan ve kurallara uymayan kullanıcılar sunucumuza kayıt olamazlar.\n\nEğer konu hakkında bir şikayetiniz var ise <@&${adminRole}> rolü ve üstlerine ulaşabilirsiniz.`, msg), msg.channel.id, 10000)}
   let zaman = Date.now() - vegas.user.createdAt.getTime();
   if (zaman < 604800000) {return client.timemessage(client.normalEmbed(`Bu üyenin hesabı ${client.format(zaman)} önce açıldığı için kaydı gerçekleştirelemedi.`, msg), msg.channel.id, 10000)
   await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { fakekayıt: 1 } }, { upsert: true })}}  
   await vegas.roles.set(manRoles)
   await vegas.setNickname(`• ${args[1].charAt(0).replace('i', "İ").toUpperCase() + args[1].slice(1).toLowerCase()}`).catch(() => { })
   //if (vegas.user.username.toLowerCase().includes("gng") || vegas.user.discriminator === "0232" || vegas.user.discriminator === "2320") vegas.roles.add("979121908207485009");
   if (taggedRole !== "") if (!cfg.Tag.Tags.some(x => vegas.user.tag.includes(x))) vegas.roles.add(taggedRole);
   const Vegas = new MessageEmbed().setColor("RANDOM").setAuthor(msg.author.tag, msg.member.user.avatarURL({dynamic: true})).setFooter(`Üyenin ceza puanı: ${totalCezapuan}`).setDescription(`${vegas} adlı kullanıcı başarıyla erkek olarak kaydedildi.`)
   msg.channel.send(Vegas)
   await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { erkekkayıt: 1 } }, { upsert: true })       
   await ControlsDatabase.findOneAndUpdate({ guildID: msg.guild.id}, { $inc: { haftalıkkayıt: 1 } }, { upsert: true })
   await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { toplamkayıt: 1 } }, { upsert: true })
   const RegisterData = await RegisterDatabase.findOne({ guildID: msg.guild.id, userID: vegas.id});
   if(!RegisterData) {let newRegisterDatabase = new RegisterDatabase({guildID: msg.guild.id, userID: vegas.id, authorID: msg.author.id, isimler: [{ name: `${vegas.displayName}`, type: `<@&${manRoles[0]}>`, staff: msg.author.id }]}).save();} else{
   RegisterData.isimler.push({ name: `${vegas.displayName}`, type: `${manRoles[0]}`, staff: msg.author.id }); 
   RegisterData.save();}       
   if (YetkiliKayıtData)  {YetkiliKayıtData.delete()}
   if (durum === true) {
   if (!noAutoPerm.some(x => msg.member.roles.cache.has(x))) {
   if (staffRoles.some(x => msg.member.roles.cache.has(x))) {
   const res = await görevDatabase.findOne({guildID: msg.guild.id, userID: msg.author.id});
   if (res) {
   await görevDatabase.findOneAndUpdate({guildID: msg.guild.id, userID: msg.author.id}, {$inc: {KayıtCount: 1}}, {upsert: true})  
   const res = await görevDatabase.findOne({guildID: msg.guild.id, userID: msg.author.id}); 
   let görev = res.Kayıt.map((q) => q.Count)
   let count = res && res.KayıtCount ? res.KayıtCount : 0
   if(count >= görev) {
   if(res.KayıtDurum === "Ödül Alındı!") {}else{
   if(res.KayıtDurum === "Tamamlandı!") {}else{
   await görevDatabase.findOneAndUpdate({guildID: msg.guild.id, userID: msg.author.id}, {$set: {KayıtDurum: "Tamamlandı!"}}, {upsert: true})    
   }}}}
   await Puan.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id }, { $inc: { puan: registerPuan, kayıt: 1, kayıtPuan: registerPuan } }, { upsert: true });
   await CoinDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id }, { $inc: { coinDaily: registerCoin, coinWeek: registerCoin, coinMonth: registerCoin, Coin: registerCoin, kayıt: 1, kayıtCoin: registerCoin } }, { upsert: true });
   const puanData = await Puan.findOne({ guildID: msg.guild.id, userID: msg.author.id });
   if (puanData && client.puanData.some(x => puanData.puan === x.puan)) {
    let newRank = client.puanData.filter(x => puanData.puan >= x.puan);
     newRank = newRank[newRank.length-1];
   const oldRank = client.puanData[client.puanData.indexOf(newRank)-1];
    msg.member.roles.add(newRank.role);
   const maxValue = client.puanData[client.puanData.indexOf(client.puanData.find(x => x.puan >= (puanData ? puanData.puan : 0)))] || client.puanData[client.puanData.length-1];
   const maxValue2 = client.puanData[client.puanData.indexOf(maxValue)-2]   
   if (oldRank && Array.isArray(oldRank.role) && oldRank.role.some(x => msg.member.roles.cache.has(x)) || oldRank && !Array.isArray(oldRank.role) && msg.member.roles.cache.has(oldRank.role)) msg.member.roles.remove(oldRank.role);
   try{ if (client.channels.cache.get(yetkiUpLog)) client.channels.cache.get(yetkiUpLog).send(`🎉 ${msg.author} tebrikler! Puan sayın bir sonraki yetkiye geçmen için yeterli oldu. \`${msg.guild.roles.cache.get(maxValue2.role).name}\` yetkisinden ${Array.isArray(newRank.role) ? newRank.role.map(x => `\`${msg.guild.roles.cache.get(x).name}\``).join(", ") : `\`${msg.guild.roles.cache.get(newRank.role).name}\``} yetkisine terfi edildin!`);
   }catch{ if (client.channels.cache.get(yetkiUpLog)) client.channels.cache.get(yetkiUpLog).send(`🎉 ${msg.author} tebrikler! Puan sayın bir sonraki yetkiye geçmen için yeterli oldu. ${Array.isArray(newRank.role) ? newRank.role.map(x => `\`${msg.guild.roles.cache.get(x).name}\``).join(", ") : `\`${msg.guild.roles.cache.get(newRank.role).name}\``} yetkisine terfi edildin!`);}}}}}      
   if (client.channels.cache.get(chat)) client.channels.cache.get(chat).send(`${vegas} adlı üye aramıza yeni katıldı bir hoş geldin diyelim ve senle birlikte topluluğumuz **${msg.guild.memberCount}** kişi oldu!`)
   if (client.channels.cache.get(registerLog)) client.channels.cache.get(registerLog).send(new MessageEmbed().setColor("RANDOM").setFooter(`Üyenin ceza puanı `+totalCezapuan+``).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`Üye: ${vegas} - **${vegas.id}**\nYetkili: ${msg.author} - **${msg.author.id}**\nİsim: "${vegas.displayName}"\nCinsiyet: Erkek\nTarih: `+moment(Date.now()).locale("TR").format("LLL")+` `))      
   const StaffDatax = await StaffDatabase.findOne({ guildID: msg.guild.id});
   const StaffDataxx = await StaffDatabase.findOne({ guildID: msg.guild.id, userID: msg.author.id});
   if (StaffDatax && StaffDatax.kayıtlar.includes(vegas.id)) {}else{
   if(!StaffDataxx) {let newStaffDataa = new StaffDatabase({guildID: msg.guild.id, userID: msg.author.id, kayıtlar: vegas.id}).save();} else{StaffDataxx.kayıtlar.push(vegas.id);
   StaffDataxx.save();}} } catch(err) { client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)}}}