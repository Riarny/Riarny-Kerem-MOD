module.exports = {
  conf: {
    aliases: ["booster", "boost", "bnick", "bisim"],
    name: "zengin",
    usage: 'zengin [isim]',
    description: 'Boost basan kullanıcılar bu komutla isimlerini değiştirebilir.',
},

 run: async ({client, msg, args, author, MessageEmbed, uye, SetupDatabase}) => {
   
  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : []
  let boosterTrue = res && res.boosterRole ? res.boosterRole : ""
  let guildNoTag = res && res.guildNoTag ? res.guildNoTag : ""
  let guildTag = res && res.guildTag ? res.guildTag : ""
  
  if (!msg.member.roles.cache.has(boosterTrue)) return client.message(client.yetersizYetki(msg, msg), msg.channel.id)                              
  let nick = args.slice(0).join(' ') 
  if (!nick) return client.message(client.normalEmbed(`Geçerli bir isim belirt ve tekrardan dene!`, msg), msg.channel.id)
  if (nick.length > 30) return client.message(client.normalEmbed("30 karakterden az bir isim belirt ve tekrardan dene!", msg), msg.channel.id)
  if (nick && (await client.chatKoruma(nick)) || nick.toLowerCase().includes("@here") || nick.toLowerCase().includes("@everyone")) return client.timemessage(client.normalEmbed(`Geçerli bir isim belirt ve tekrardan dene!`, msg), msg.channel.id)
  let updatedName
  if(msg.member.user.username.includes(guildTag)) updatedName = `${guildTag} ${nick}` 
  else updatedName = `${guildNoTag} ${nick}` 
  msg.member.setNickname(`${updatedName}`).catch(() => { })
  client.message(client.normalEmbed(`Belirttiğiniz kullanıcı adı başarıyla değiştirilmiştir.`, msg), msg.channel.id)
  client.react(msg, "tick")}}