module.exports = {
    conf: {
      aliases: ["norole"],
      name: "rolsüz",
      usage: 'rolsüz [ver]',
      description: 'Sunucuda rolü olmayanlara kayıtsız rolünü verirsiniz.',
   },
  
   run: async ({client, msg, args, author, uye, MessageEmbed,SetupDatabase}) => {
     
    const res = await SetupDatabase.findOne({guildID: msg.guild.id})
    let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : [] 
    let unregisterRole = res && res.unregisterRoles ? res.unregisterRoles : []  
    
    if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000) 
    if(args[0] === "ver") {
     if (unregisterRole.length === 0) return client.message(client.normalEmbed(`Henüz kayıtsız rolünün kurulumu yapılmamış, kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)
     msg.guild.members.cache.filter(uye => uye.roles.cache.size === 1).array().forEach((uye, index) => 
     uye.roles.add(unregisterRole).catch(() => { }))
    client.react(msg, "tick") 
    let sira = 1
    msg.channel.send(new MessageEmbed().addField(`**❯ Rol verilen üyeler:**`, `${msg.guild.members.cache.filter(uye => uye.roles.cache.size === 1).map((a, b) => `\`${sira++}.\` ${a} - \`${b}\``).slice(0, 30).join("\n")} ${msg.guild.members.cache.filter(uye => uye.roles.cache.size === 1).size > 30 ? `${msg.guild.members.cache.filter(uye => uye.roles.cache.size === 1).size-30} daha...` : ``}`).setDescription(`Başarıyla sunucuda rolü olmayan \`${msg.guild.members.cache.filter(uye => uye.roles.cache.size === 1).size}\` üyeye <@&${unregisterRole[0]}> rolü başarıyla verildi.`).setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true})).setColor("RANDOM"))}}}
