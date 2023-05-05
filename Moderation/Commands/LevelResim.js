module.exports = {
  conf: {
    aliases: ["levelresim","sresim", "seviye-resim", "seviye-image", "seviyeimage"],
    name: "seviyeresim",
  },
  
  run: async ({client, msg, args, MessageEmbed, seviyeDatabase, guildSeviyeDatabase, prefix, cfg}) => {
  
  let array = ["sıfırla", "reset"]
  let sec = args[0]
  let res = await seviyeDatabase.findOne({guildID: msg.guild.id, userID: msg.author.id}) 
  let svy = res ? res.lvl : 0
  if(!cfg.Bot.Owners.includes(msg.author.id)) {
  if (svy < 15) return client.message(client.normalEmbed(`Bu komutu kullanabilmek için **15 seviye** üstünde olmalısın. (Seviyen: **`+svy+`**)`, msg), msg.channel.id)
  }
  if(array.find(q => q.toLowerCase() === sec)) {
   if (res && res.resim === "0" || !(res && res.resim)) return client.message(client.normalEmbed(`İlk önce bir resim ayarlamalısın.`, msg), msg.channel.id)
    res.resim = "0"
    res.save()
    client.message(client.normalEmbed(`Resim başarıyla sıfırlandı.`, msg), msg.channel.id)
    client.react(msg, "tick")
  return}
  if (!sec || !sec.startsWith("http")) return client.message(client.normalEmbed(`Ayarlamak istediğin resmin linkini veya sıfırla yazmalısın. (Not: Link **http** veya **https** ile başlamalıdır.)`, msg), msg.channel.id)
   await seviyeDatabase.findOneAndUpdate({guildID: msg.guild.id, userID: msg.author.id}, {$set: {resim: sec}})
   const aynenöyle = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true}))
    .setDescription(`Belirttiğin resim başarıyla ayarlandı.`)
    .setImage(sec)
   msg.channel.send(aynenöyle)
   client.react(msg, "tick")}}
