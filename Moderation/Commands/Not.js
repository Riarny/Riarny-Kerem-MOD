module.exports = {
  conf: {
    aliases: ["notbırak","not-bırak"],
    name: "not",
    usage: 'not [üye] [not]',
    description: 'Belirttiğiniz üyeye not bırakırsınız.',
  },

 run: async ({client, msg, args, author, uye, NotDatabase, SetupDatabase}) => {
   
     const res = await SetupDatabase.findOne({guildID: msg.guild.id})
     let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : [] 
     let botCommandsTrue = res && res.botCommandsRoles ? res.botCommandsRoles : [] 
     if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.some(r => botCommandsTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.message(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
     if (!uye) return client.timemessage(client.normalEmbed("Not bırakmak istediğin kullanıcıyı düzgünce belirt ve tekrar dene !", msg,), msg.channel.id, 7000)
     if (uye.hasPermission(8)) return client.timemessage(client.normalEmbed(`Yöneticilere herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
     if (uye.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
     if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
     if (msg.member.roles.highest.position < uye.roles.highest.position) return client.timemessage(client.normalEmbed(`Kendi rolünden yüksek kişilere işlem uygulayamazsın!`,msg), msg.channel.id, 5000)

     await NotDatabase.findOne({ user: uye.id }, async (err, res) => {
     if (!args.slice(1).join(" ")) return client.timemessage(client.normalEmbed("Bırakmak istediğin notu belirt ve tekrardan dene!", msg,), msg.channel.id, 7000)
     if (!res) {
     let arr = []
     arr.push({ not: args.slice(1).join(" "), yetkili: msg.author.id })
     const newData = new NotDatabase({
      user: uye.id,
      notlar: arr})
     newData.save().catch(e => console.log(e))
     client.message(client.normalEmbed(`<@${uye.id}> kişisine başarıyla not bırakıldı.

     :no_entry_sign: | "${args.slice(1).join(" ")}"`, msg,), msg.channel.id)} else {
      res.notlar.push({ not: args.slice(1).join(" "), yetkili: msg.author.id })
      res.save().catch(e => console.log(e))
     client.message(client.normalEmbed(`<@${uye.id}> kişisine başarıyla not bırakıldı.

     :no_entry_sign: | "${args.slice(1).join(" ")}"`, msg,), msg.channel.id)}})}}