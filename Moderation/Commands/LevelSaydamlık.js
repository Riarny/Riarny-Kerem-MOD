module.exports = {
  conf: {
    aliases: ["levelsaydam","ssaydam", "seviye-saydam", "seviye-saydamlık", "seviyesaydamlıkk"],
    name: "seviyesaydam",
  },
  
  run: async ({client, msg, args, MessageEmbed, seviyeDatabase, guildSeviyeDatabase, prefix, cfg}) => {
  
  let array = ["sıfırla", "reset"]
  let sec = args[0]
  let res = await seviyeDatabase.findOne({guildID: msg.guild.id, userID: msg.author.id}) 
  let svy = res ? res.lvl : 0
  if(!cfg.Bot.Owners.includes(msg.author.id)) {
  if (svy < 5) return client.message(client.normalEmbed(`Bu komutu kullanabilmek için **5 seviye** üstünde olmalısın. (Seviyen: **`+svy+`**)`, msg), msg.channel.id)
  }
  if(array.find(q => q.toLowerCase() === sec)) {
   if (res && res.saydamlık === "0" || !(res && res.saydamlık)) return client.message(client.normalEmbed(`İlk önce bir saydamlık ayarlamalısın.`, msg), msg.channel.id)
    res.saydamlık = "0"
    res.save()
    client.message(client.normalEmbed(`Saydamlık başarıyla sıfırlandı.`, msg), msg.channel.id)
    client.react(msg, "tick")
  return}
  if (!sec || isNaN(sec || Number(sec) > 5 || Number(sec) < 1)) return client.message(client.normalEmbed(`Ayarlamak istediğin dereceyi veya sıfırla yazmalısın. (Dereceler: \`1, 2, 3, 4, 5\`)`, msg), msg.channel.id)
   await seviyeDatabase.findOneAndUpdate({guildID: msg.guild.id, userID: msg.author.id}, {$set: {saydamlık: sec}})
   client.message(client.normalEmbed(`Siyah katmanın saydamlığı başarıyla değiştirildi. (\``+sec+`\`)`, msg), msg.channel.id)
   client.react(msg, "tick")}}
