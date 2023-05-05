module.exports = {
  conf: {
    aliases: ["cezasorgu"],
    name: "ceza",
    usage: 'ceza [ID]',
    description: 'Belirttiğiniz ceza numarası hakkında bilgi alırsınız.',
  },

 run: async ({client, msg, cfg, args, author, guild, MessageEmbed, CezaDatabase, moment, SetupDatabase}) => {
   
  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : [] 
  let botCommandsTrue = res && res.botCommandsRoles ? res.botCommandsRoles : [] 
  
  if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.some(r => botCommandsTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  let cezaID = Number(args[0])
  if(!cezaID) return client.timemessage(client.normalEmbed(`Kontrol etmek istediğin ceza numarasını girmelisin.`, msg), msg.channel.id, 5000)
  let doc = await CezaDatabase.findOne({ guildID: msg.guild.id, cezaID: cezaID})
  if (!doc) return client.message(client.normalEmbed(`Belirttiğin numaralı ceza bilgisi bulunamadı.`, msg), msg.channel.id)
  let actives = ``
  let array = [ doc.chatmuted, doc.jail, doc.voicemuted, doc.jail3days ]
  array.forEach(a => a === true ? actives += "true" : actives += "false")
  let active = actives.includes("true") ? `Bu ceza hala devam ediyor.` : `Bu ceza artık geçerli değil, kaldırılmış ya da süresi dolmuş.`
  msg.channel.send(`${cfg.Emoji.TickEmoji} Merhabalar \`${msg.member.user.username.replace('`', '')}\`, aşağıda \`#${cezaID}\` numarasına sahip dosyayı inceliyorsunuz.\n\`\`\`md\n#${cezaID} Numaralı Dosya;\n\n- Cezalandırılan Üye: ${msg.guild.members.cache.get(doc.userID).user.username} [${doc.userID}]\n- Cezalandıran Yetkili: ${msg.guild.members.cache.get(doc.authorID).user.username} [${doc.authorID}]\n- Ceza Türü: ${doc.Type}\n- Ceza Sebebi: ${doc.Reason}\n- Ceza Tarihi: ${moment(doc.date).locale("TR").format("LLL")} (${moment(doc.date).locale("TR").fromNow()})\n\n> ${active}\`\`\` `) }}