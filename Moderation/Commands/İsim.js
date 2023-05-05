module.exports = {
  conf: {
    aliases: ["nick","i"],
    name: "isim",
    usage: 'isim [üye] [isim] [yaş]',
    description: 'Belirttiğiniz kullanıcının ismini değiştirirsiniz. (36 Üstü Yaş Kabul Edilmiyor, Kullanıcının Hesabı 7 Günden Önce Açıldıysa İsim Değiştirme Gerçekleştirilemez, Kullanıcının Ceza Puanı 40 Üstü İse İsim Değiştirme Gerçekleştirilemez, Kullanıcının İsminin İlk Harfini Küçük Yapsanızda Bot İlk Harfi Büyük Olarak Değiştirir Ve Girdiğiniz İsim Eğer Düzgün Değilse Bot Düzeltip İsmi Değiştirir.)',
 },

 run: async ({client, SetupDatabase, msg, cfg, args, prefix, author, guild, MessageEmbed, uye, StaffDatabase, CezaSayıDatabase, CezapuanDatabase, YetkiliKayıtDatabase, RegisterDatabase, ControlsDatabase}) => {
   
  
  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : []  
  let guildTag = res && res.guildTag ? res.guildTag : ""
  let guildNoTag = res && res.guildNoTag ? res.guildNoTag : ""
  let taggedRole = res && res.taggedRole ? res.taggedRole : ""
  let adminRole = res && res.adminRole ? res.adminRole : ""
  let botCommandsTrue = res && res.botCommandsRoles ? res.botCommandsRoles : [] 
  let changeNameLimitNumber = res && res.changeNameLimit ? res.changeNameLimit : 3
  
  if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.some(r => botCommandsTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)  
  if (uye.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (msg.member.roles.highest.position < uye.roles.highest.position) return client.timemessage(client.normalEmbed(`Kendi rolünden yüksek kişilere işlem uygulayamazsın!`, msg), msg.channel.id, 5000)
  if (!uye) return client.timemessage(client.normalEmbed(`Bir üye etiketle ve tekrardan dene!`, msg), msg.channel.id, 5000)
  let isim = args[1]
  if(!isim) return client.timemessage(client.normalEmbed(`Üyeye geçerli bir isim gir ve tekrardan dene!`, msg), msg.channel.id, 5000)
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let CezaSayıData = await CezaSayıDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let chatMute = CezaSayıData && CezaSayıData.chatmute ? CezaSayıData.chatmute : 0
  let sesMute = CezaSayıData && CezaSayıData.voicemute ? CezaSayıData.voicemute : 0
  let ban = CezaSayıData && CezaSayıData.ban ? CezaSayıData.ban : 0
  let jail = CezaSayıData && CezaSayıData.jail ? CezaSayıData.jail : 0
  let total = chatMute+sesMute+ban+jail;
  let totalCezapuan = CezapuanData && CezapuanData.cezaPuanıTotal ? CezapuanData.cezaPuanıTotal : 0
  if (!msg.member.hasPermission(8)) await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { changeNameLimit: 1 } }, { upsert: true })   
  let doc = await StaffDatabase.findOne({ guildID: msg.guild.id, userID: msg.author.id})
  let changeNameLimit = doc && doc.changeNameLimit ? doc.changeNameLimit-1 : 0
  if (changeNameLimit >= changeNameLimitNumber) {
   client.react(msg, "red")
   client.message(client.normalEmbed(`1 dakika içerisinde çok fazla isim değiştirme işlemi uyguladığınız için komut geçici olarak kullanımınıza kapatılmıştır.`, msg), msg.channel.id)   
  }
  if(!msg.member.hasPermission(8)) {
  if(totalCezapuan > 40) return client.message(client.normalEmbed(`🚫 ${uye} kişisinin toplam **${totalCezapuan}** ceza puanı olduğu için isim değiştirme işlemi iptal edildi. Sunucumuzda tüm işlemlerin kayıt altına alındığını unutmayın. Sorun Teşkil eden, sunucunun huzurunu bozan ve kurallara uymayan kullanıcılar sunucumuza kayıt olamazlar.\n\nBelirtilen üye toplamda **${total}** ceza yemiş. **${jail}** Jail, **${chatMute}** Mute, **${sesMute}** Voicemute, **${ban}** Ban\n\nEğer konu hakkında bir şikayetiniz var ise <@&${adminRole}> rolü ve üstlerine ulaşabilirsiniz.`, msg), msg.channel.id)}
  let RegisterData = await RegisterDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let isimler = `${RegisterData && RegisterData.isimler ? RegisterData.isimler.map(x => `\`${x.name}\` (${msg.guild.roles.cache.get(x.type) ? `<@&${x.type}>` : x.type} - <@!${x.staff}>)`).join("\n") : `${uye} kişisinin isim kayıtı veritabanında bulunamadı.`}`
  let updatedName

  if (!cfg.Tag.Tags.some(x => uye.user.tag.includes(x))) updatedName = `${isim.charAt(0).replace('i', "İ").toUpperCase() + isim.slice(1).toLowerCase()}` 
  else updatedName = `${isim.charAt(0).replace('i', "İ").toUpperCase() + isim.slice(1).toLowerCase()}` 
  await uye.setNickname(`• ${updatedName}`).catch(() => { })
  if (taggedRole !== "") if (!cfg.Tag.Tags.some(x => uye.user.tag.includes(x))) uye.roles.add(taggedRole)
  if(!RegisterData) {let newRegisterDatabase = new RegisterDatabase({guildID: msg.guild.id, userID: uye.id, authorID: msg.author.id, isimler: [{ name: `${updatedName}`, type: `İsim Değiştirme`, staff: msg.author.id }]}).save();} else{
  RegisterData.isimler.push({ name: `${updatedName}`, type: `İsim Değiştirme`, staff: msg.author.id }); 
  RegisterData.save();} 
  await YetkiliKayıtDatabase.findOneAndUpdate({ guildID: msg.guild.id, authorID: msg.author.id}, { $set: { userID: ""+uye.id+"", mod: true} }, { upsert: true })
  msg.channel.send(new MessageEmbed().setFooter(`Üyenin ceza puanı: ${totalCezapuan}`).setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true})).setColor("RANDOM").setDescription(`${RegisterData && RegisterData.isimler.length >= 1 ? `${uye} üyesinin ismi başarıyla "${isim.charAt(0).replace('i', "İ").toUpperCase() + isim.slice(1).toLowerCase()}" ismine değiştirildi, bu üye daha önce bu isimler ile kayıt olmuş.\n\n${cfg.Emoji.RedEmoji} Kişinin toplamda **${RegisterData.isimler.length}** isim kayıtı bulundu bunlar sırasıyla aşağıdaki gibidir;\n${isimler}\n\n Tüm isim geçmişine \`${prefix}isimler @üye\` ile bakmanız önerilir.`: `${uye} üyesinin ismi başarıyla ${isim.charAt(0).replace('i', "İ").toUpperCase() + isim.slice(1).toLowerCase()} ismine değiştirildi.`}`, msg), msg.channel.id)}}
