module.exports = {
  conf: {
    aliases: ["slowmod"],
    name: "slowmode",
    usage: 'slowmode',
    description: 'Komutu kullandığınız kanalda slowmode ayarlarsınız.',
},

 run: async ({client, msg, args, author, MessageEmbed, uye, moment, SetupDatabase}) => {
  
  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : []  
  
  if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)                              
  let miktar = Number(args[0]);
  msg.channel.setRateLimitPerUser(miktar).catch(() => { })
  client.timemessage(client.normalEmbed(`Slow Mode **${miktar ? miktar : "Kapalı" }** olarak ayarlandı.`, msg), msg.channel.id, 5000)
  client.react(msg, "tick")}}
