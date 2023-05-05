module.exports = {
  conf: {
    aliases: [],
    name: "isimler",
    usage: 'isimler [üye]',
    description: 'Belirttiğiniz kullanıcının sunucuya daha önce kayıt olduğu isimleri görürsünüz.',
  },

 run: async ({client, msg, args, author, guild, cfg, MessageEmbed, uye, fs, MessageAttachment, RegisterDatabase, SetupDatabase}) => {
   
  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : []  
  let botCommandsTrue = res && res.botCommandsRoles ? res.botCommandsRoles : [] 
  if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.some(r => botCommandsTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`,msg), msg.channel.id, 5000)
  let RegisterData = await RegisterDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let isimler = `${RegisterData && RegisterData.isimler ? RegisterData.isimler.map(x => `\`${x.name}\` (${msg.guild.roles.cache.get(x.type) ? `<@&${x.type}>` : x.type} - <@!${x.staff}>)`).join("\n") : `${uye} kişisinin isim kayıtı veritabanında bulunamadı.`}`
  msg.channel.send(new MessageEmbed().setColor("RANDOM").setAuthor(uye.user.tag, uye.user.avatarURL({dynamic: true})).setDescription(`${RegisterData && RegisterData.isimler.length >= 1 ? `Bu üyenin toplamda ${RegisterData.isimler.length} isim kayıtı bulundu:`: ""}\n\n${isimler}`))
  }}