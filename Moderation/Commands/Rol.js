module.exports = {
  conf: {
    aliases: ["r"],
    name: "rol",
    usage: 'rol al/ver [üye] [rol]',
    description: 'Belirttiğiniz kullanıcıya belirttiğiniz rolü verip alabilirsiniz.',
},

 run: async ({client, msg, args, cfg, author, MessageEmbed, prefix, moment, GeneralDatabase,SetupDatabase}) => {
   
  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : [] 
  let roleManagerTrue = res && res.roleAddRemoveRoles ? res.roleAddRemoveRoles : [] 
  
  if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.some(r => roleManagerTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000) 
  let sorgu = args[0]
  let rol = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[2])
  if (!rol) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id) 
  let array = ["ADMINISTRATOR", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "MENTION_EVERYONE", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]
  let perms = []
  array.forEach(a => rol.permissions.has(a) ? perms.push(a) : "No Perm.")
  let rolePerms = []
  let editPerms = perms.forEach(b => rolePerms.push(b.replace("ADMINISTRATOR", "Yönetici").replace("MANAGE_GUILD", "Sunucuyu Yönet").replace("MANAGE_EMOJIS", "Emojileri Yönet").replace("MANAGE_WEBHOOKS", "Webhookları Yönet").replace("MANAGE_ROLES", "Rolleri Yönet").replace("MENTION_EVERYONE", "Tüm Rollerden bahset").replace("MANAGE_CHANNELS", "Kanalları Yönet").replace("KICK_MEMBERS", "Sağ Tık Kick").replace("BAN_MEMBERS", "Sağ Tık Ban")))
  let user = msg.mentions.members.first() || msg.guild.members.cache.get(args[1])
  if (!user) return client.message(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id)
  if (msg.member.roles.highest.position < user.roles.highest.position) return client.message(client.normalEmbed(`Kendi rolünden yüksek kişilere işlem uygulayamazsın!`, msg), msg.channel.id)
  if (user.user.bot)  return client.message(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id)
  if (user.id == (`${msg.author.id}`)) return client.message(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id)
  
  if (sorgu == "yardım" || sorgu == "yardim" || sorgu == "help" || !sorgu) {
    
   client.message(client.normalEmbed(`Yapmak istediğin işlemi belirtmelisin!\n\n> ${prefix}rol {al} {üye} {rol}\n> ${prefix}rol {ver} {üye} {rol}`, msg), msg.channel.id)
   return
  
  }
   
  if (sorgu == "al" || sorgu == "a" || sorgu == "remove" || sorgu == "Al" || sorgu == "AL") {
    
   if (!user.roles.cache.has(`${rol.id}`)) return client.message(client.normalEmbed(`${user} Kişisinde ${rol} rolü mevcut değil.`, msg), msg.channel.id)
   if (rolePerms.length !== 0) return msg.channel.send(`${cfg.Emoji.RedEmoji} Belirttiğiniz \`${rol.name}\` rolü tehlikeli izinler içeriyor. (\` ${rolePerms.map(c => c).join(", ")} \`)`)
    user.roles.remove(rol).catch(() => { })
   let GeneralData = await GeneralDatabase.findOne({ guildID: msg.guild.id, userID: user.id})
   if (!GeneralData) {let newGeneralDatabase = new GeneralDatabase({guildID: msg.guild.id, userID: user.id, rollogtotal: 1, rollog: [{role: `${cfg.Emoji.RedEmoji} Rol: ${rol} Yetkili: ${msg.author}\nTarih: ${moment(Date.now()).locale("TR").format("LLL")}`}]}).save();} else{
    GeneralData.rollog.push({role: `${cfg.Emoji.RedEmoji} Rol: ${rol} Yetkili: ${msg.author}\nTarih: ${moment(Date.now()).locale("TR").format("LLL")}`}); 
    await GeneralDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: user.id}, { $inc: { rollogtotal: 1 } }, { upsert: true })
    GeneralData.save();}
    msg.channel.send(new MessageEmbed().setAuthor(msg.guild.name, msg.guild.iconURL({dynamic: true})).setColor("RANDOM").setDescription(`${user} Kişisinden ${rol} rolünü aldım.`))
   return
  
  } else if (sorgu == "ver" || sorgu == "add" || sorgu == "v" || sorgu == "VER" || sorgu == "Ver") {
    
   if (user.roles.cache.has(rol.id)) return client.message(client.normalEmbed(`${user} Kişisinde ${rol} rolü zaten mevcut.`, msg), msg.channel.id)    
   if (rolePerms.length !== 0) return msg.channel.send(`${cfg.Emoji.RedEmoji} Belirttiğiniz \`${rol.name}\` rolü tehlikeli izinler içeriyor. (\` ${rolePerms.map(c => c).join(", ")} \`)`)
    user.roles.add(rol).catch(() => { })
   let GeneralData = await GeneralDatabase.findOne({ guildID: msg.guild.id, userID: user.id})
   if (!GeneralData) {let newGeneralDatabase = new GeneralDatabase({guildID: msg.guild.id, userID: user.id, rollogtotal: 1, rollog: [{role: `${cfg.Emoji.TickEmoji} Rol: ${rol} Yetkili: ${msg.author}\nTarih: ${moment(Date.now()).locale("TR").format("LLL")}`}]}).save();} else{
    GeneralData.rollog.push({role: `${cfg.Emoji.TickEmoji} Rol: ${rol} Yetkili: ${msg.author}\nTarih: ${moment(Date.now()).locale("TR").format("LLL")}`}); 
    await GeneralDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: user.id}, { $inc: { rollogtotal: 1 } }, { upsert: true })
    GeneralData.save();}
    msg.channel.send(new MessageEmbed().setAuthor(msg.guild.name, msg.guild.iconURL({dynamic: true})).setColor("RANDOM").setDescription(`${user} Kişisine ${rol} rolünü ekledim.`))
   return
  
  } else return client.message(client.normalEmbed(`Yapmak istediğin işlemi belirtmelisin!\n\n> ${prefix}rol {al} {üye} {rol}\n> ${prefix}rol {ver} {üye} {rol}`, msg), msg.channel.id)
  client.react(msg, "tick")
 
 }}