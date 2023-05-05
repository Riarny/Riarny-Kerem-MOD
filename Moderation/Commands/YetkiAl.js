module.exports = {
  conf: {
    aliases: ["yetkisıfırla","ytal","ytsıfırla"],
    name: "yetkial",
    usage: 'yetkial [üye]',
    description: 'Belirttiğiniz kullanıcının tüm yetkili rollerini alırsınız.',
 },

 run: async ({client, msg, args, author, uye, SetupDatabase}) => {
  
  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : []  
  let staffTrue = res && res.staffRolesAddTrue ? res.staffRolesAddTrue : []  
  let minStaffRole = res && res.minStaffRole ? res.minStaffRole:  ""
  
  if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.some(r => staffTrue.includes(r.id)) &&!msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000) 
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  if (minStaffRole === "") return client.message(client.normalEmbed(`Henüz en alt yetkili rolünün kurulumu yapılmamış, kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)   
  if (uye.user.bot) return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (uye.hasPermission(8)) return client.timemessage(client.normalEmbed(`Yönetici yetkisi olanlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (msg.member.roles.highest.position < uye.roles.highest.position) return client.timemessage(client.normalEmbed(`Kendi rolünden yüksek kişilere işlem uygulayamazsın!`, msg), msg.channel.id, 5000)
  await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= client.guilds.cache.get(msg.guild.id).roles.cache.get(minStaffRole).position)).catch(() => { })
  client.timemessage(client.normalEmbed(`${uye} Üyesinden başarıyla yetkili rolleri alındı.`, msg), msg.channel.id, 5000)
  client.react(msg, "tick")}}