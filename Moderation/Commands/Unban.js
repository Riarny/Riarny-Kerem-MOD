module.exports = {
  conf: {
    aliases: ["bankaldır"],
    name: "unban",
    usage: 'unban [ID]',
    description: 'Belirttiğiniz kullanıcının banını kaldırırsınız.',
 },

 run: async ({client, msg, args, author, guild, moment, CezaDatabase, MessageEmbed, ControlsDatabase, BanInfoDatabase, AçılmazBanDatabase,SetupDatabase}) => {
   
      const res = await SetupDatabase.findOne({guildID: msg.guild.id})
      let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : []    
      let banTrue = res && res.banHammerRoles ? res.banHammerRoles : [] 
      let banLog = res && res.banLog ? res.banLog : ""
      
      if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.some(r => banTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
      if(!args[0]) return client.timemessage(client.normalEmbed(`Geçerli bir kullanıcı ID si giriniz.`, msg), msg.channel.id, 7000)
      await client.users.fetch(args[0]).then(res => {
      if(!res){client.timemessage(client.normalEmbed(`Geçerli bir kullanıcı ID si giriniz.`, msg), msg.channel.id, 7000)}else{msg.guild.fetchBans(true).then(async(bans) => {
      const CezaData = await CezaDatabase.findOne({ guildID: msg.guild.id, userID: res.id, ban: true})
      let ban = await bans.find(a => a.user.id === res.id)
      msg.guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(async audit => {let user = audit.entries.find(a => a.target.id === res.id)
      if(!ban){client.message(client.normalEmbed(`\`${res.tag}\` bu sunucuda yasaklı değil!`, msg), msg.channel.id)} else {
      await AçılmazBanDatabase.findOne({user: res.id}, async(err,dbres) => {if(!dbres) {
      if (client.channels.cache.get(banLog)) client.channels.cache.get(banLog).send(new MessageEmbed().setColor("ff0000").setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`**${res.tag}** üyesinin yasağı ${msg.author} tarafından kaldırıldı.`))   
      msg.guild.members.unban(res.id)
      CezaData.ban = false
      CezaData.save() 
      client.message(client.normalEmbed(`**${res.tag}** kullanıcısının yasağı kaldırıldı.`, msg), msg.channel.id)} else {
      if(!(msg.author.id === dbres.mod)) return client.message(client.normalEmbed(`${res.tag} kullanıcısının yasağı <@${dbres.mod}> tarafından açılamaz olarak etiketlenmiştir.Yasağı sadece <@${dbres.mod}> kaldırabilir.`, msg), msg.channel.id)
      if (client.channels.cache.get(banLog)) client.channels.cache.get(banLog).send(new MessageEmbed().setColor("ff0000").setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`**${res.tag}** üyesinin yasağı ${msg.author} tarafından kaldırıldı.`))   
      msg.guild.members.unban(res.id)
      CezaData.ban = false
      CezaData.save()  
      client.message(client.normalEmbed(`**${res.tag}** kullanıcısının yasağı kaldırıldı.`, msg), msg.channel.id)
      dbres.delete().catch(e => console.log(e))}})}})})}}).catch(err => {client.timemessage(client.normalEmbed(`Geçerli bir kullanıcı ID si giriniz.`, msg), msg.channel.id, 7000)})}}