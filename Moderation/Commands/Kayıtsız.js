module.exports = {
  conf: {
    aliases: ["unreg","unregister","yeniüye"],
    name: "kayıtsız",
    usage: 'kayıtsız [üye]',
    description: 'Belirttiğiniz kullanıcıyı kayıtsıza atarsınız.',
 },

 run: async ({client, msg, args, author, uye, SetupDatabase}) => {
  
  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : []  
  let unregisterRole = res && res.unregisterRoles ? res.unregisterRoles : []  
  let roleManagerTrue = res && res.roleAddRemoveRoles ? res.roleAddRemoveRoles : [] 
  
  if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.some(r => roleManagerTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000) 
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  if (uye.hasPermission(8)) return client.timemessage(client.normalEmbed(`Yöneticileri kayıtsıza atamazsın.`,msg), msg.channel.id, 5000)
  if (uye.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`,msg), msg.channel.id, 5000)
  if (msg.member.roles.highest.position < uye.roles.highest.position) return client.timemessage(client.normalEmbed(`Kendi rolünden yüksek kişilere işlem uygulayamazsın!.`,msg), msg.channel.id, 5000)
  if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (unregisterRole.length === 0) return client.message(client.normalEmbed(`Henüz kayıtsız rolünün kurulumu yapılmamış, kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)
  if (uye.roles.cache.some(r => unregisterRole.includes(r.id))) return client.timemessage(client.normalEmbed(`${uye} kişisi zaten veritabanında kayıtsız olarak bulunuyor.`, msg), msg.channel.id, 5000)
  client.setRoles(uye.id, unregisterRole)
  client.timemessage(client.normalEmbed(`${uye} adlı kullanıcı başarıyla sunucuda kayıtsıza atılmıştır.`, msg), msg.channel.id, 5000)
  client.react(msg, "tick")}}
