module.exports = {
  conf: {
    aliases: ["help","y","h"],
    name: "yardım",
    usage: "yardım [komut adı]",
    description: "Botta bulunan tüm komutları listeler."
  },

 run: async ({client, msg, args, cfg, author, MessageEmbed, prefix, SetupDatabase}) => {

 
  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : [] 
  let tagged = res && res.taggedRole ? res.taggedRole : ""
  if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.has(tagged) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)                              

  let moderationtext = "";
  global.commands.forEach(command => {
   moderationtext += `${prefix}${command.conf.usage}\n`;});

   cfg.Roles.PermCommands.forEach(q => {
   moderationtext += `${prefix}${q.Usages} [üye]\n` })
   
   let statstext = ""+prefix+"claim\n"+prefix+"denetim @rol\n"+prefix+"detaylıstats\n"+prefix+"görev\n"+prefix+"haftalıkstats\n"+prefix+"kurabiye @üye\n"+prefix+"senkronize [member/role] [üye/rol]\n"+prefix+"stats\n"+prefix+"sıfırla [üye] [ses/mesaj]\n"+prefix+"top\n"+prefix+"yetkilistats"
   let invitetext = ""+prefix+"topdavet\n"+prefix+"davet\n"+prefix+"davet [ekle/sil/sorgu]\n"+prefix+"members" 
   let chattext = ""+prefix+"seviye\n"+prefix+"seviye-renk [renk/sıfırla]\n"+prefix+"seviye-resim [resim/sıfırla]\n"+prefix+"seviye-saydam [saydamlık/sıfırla]\n"+prefix+"seviye-top\n"+prefix+"seviye-ödül [seviye] [rol]\n"+prefix+"seviye-ödül-delete [seviye] [rol]\n"+prefix+"seviye-ödül-list"
   let guardtext = ""+prefix+"guardsafe [list/uyeID]"
   let backuptext = ""+prefix+"channelbackup\n"+prefix+"rolbackup\n"+prefix+"backupmode [aç/kapat]\n"+prefix+"backup [roleID]"
   let welcometext = ""+prefix+"ses-ayar\n"+prefix+"ses-mod [hosgeldin/taglialim/konser/turnuva/toplanti/cekilis]\n"+prefix+"ses-sil [hosgeldin/taglialim/konser/turnuva/toplanti/cekilis]\n"+prefix+"ses-yükle [hosgeldin/taglialim/konser/turnuva/toplanti/cekilis] [dosya]"
   let markettext = ""+prefix+"buy [ürün_kodu]\n"+prefix+"cash\n"+prefix+"cash [gönder/ekle/sil]\n"+prefix+"coinflip [all/miktar]\n"+prefix+"market\n"+prefix+"profil\n"+prefix+"ayar ekle [tür] [miktar]\n"+prefix+"ayar düzenle [tür] [miktar]\n"+prefix+"ayar sil [tür]\n"+prefix+"topcash"
 
   msg.channel.send(`**───────────────**`)
   msg.channel.send("```❯ Moderation\n\n"+moderationtext+"```")
   msg.channel.send(`**───────────────**`)
   msg.channel.send("```❯ Stats\n\n"+statstext+"```")
   msg.channel.send(`**───────────────**`)
   msg.channel.send("```❯ Invite\n\n"+invitetext+"```")
   msg.channel.send(`**───────────────**`)
   msg.channel.send("```❯ Chat\n\n"+chattext+"```")
   msg.channel.send(`**───────────────**`)
   msg.channel.send("```❯ Guard\n\n"+guardtext+"```")
   msg.channel.send(`**───────────────**`)
   msg.channel.send("```❯ Backup\n\n"+backuptext+"```")
   msg.channel.send(`**───────────────**`)
   msg.channel.send("```❯ Market\n\n"+markettext+"```")
   msg.channel.send(`**───────────────**`)}}
