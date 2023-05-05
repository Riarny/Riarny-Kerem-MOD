module.exports = {
  conf: {
    aliases: ["yetki"],
    name: "koruma",
    usage: 'koruma {aç/kapat}',
    serverowner: true,
    description: 'Sunucunun yetki rollerini açıp kapatırsınız.',
},

 run: async ({client, msg, args, cfg, author, MessageEmbed, prefix, KorumaDatabase}) => {   
   
     let sec = args[0];
     let perms = ["BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_CHANNELS", "ADMINISTRATOR", "MANAGE_ROLES", "MENTION_EVERYONE", "MANAGE_EMOJIS", "MANAGE_GUILD", "MANAGE_WEBHOOKS"]
     if (!sec) return client.message(client.normalEmbed(`Bir seçim belirt ve tekrardan dene! (\`aç/kapat\`)`, msg), msg.channel.id)
   
     if (sec == "Aç"|| sec == "aç"|| sec == "AÇ"|| sec == "ac"|| sec == "Ac"|| sec == "AC") {
      let rolesArray = msg.guild.roles.cache.filter(a => a.permissions.has("BAN_MEMBERS") || a.permissions.has("KICK_MEMBERS") || a.permissions.has("MANAGE_CHANNELS") || a.permissions.has("ADMINISTRATOR") || a.permissions.has("MANAGE_ROLES") || a.permissions.has("MENTION_EVERYONE") || a.permissions.has("MANAGE_EMOJIS") || a.permissions.has("MANAGE_GUILD") || a.permissions.has("MANAGE_WEBHOOKS")).array();
      let u = 0, h = 0;
      for (let i=0, x= rolesArray.length; i < x; ++i) {
       const role = rolesArray[i];
       if (!role.editable || role.managed) {
         h += 1;
       continue;
       };
       let removePerm = role.permissions.remove(perms)
       let rolePerm = role.permissions
       await role.setPermissions(removePerm).then(async () => {
        u += 1;
        await new KorumaDatabase({guildID: msg.guild.id, mode: true, role: role.id, perm: rolePerm}).save()
       }).catch((err) => {
        h += 1;
       })
      }
      msg.channel.send(`${cfg.Emoji.RedEmoji} Sunucumuzun yönetici rolleri **kapatılmıştır**, sunucu güvenli moda alınmıştır!`)
      return;
     } else if (sec == "Kapat" || sec == "kapat" || sec == "KAPAT" || sec == "kapa" || sec == "Kapa") {
      KorumaDatabase.find({guildID: msg.guild.id, mode: true}, async(err, res) => {
       if ((!res) || (res.length < 1)) return null;
       for (var doc of res) {
        let a = 0, j = 0;
        let r = msg.guild.roles.cache.filter(a => doc.role === a.id).array();
        for (let i=0, x= r.length; i < x; ++i) {
         const role = r[i];
         if (!role.editable || role.managed) {
          j += 1;
         continue;
        };
       let addPerms = role.permissions.add(doc.perm)
       await role.setPermissions(addPerms).then(() => {
        a += 1;
       }).catch((err) => {
        j += 1; 
       })
       }
       }
       await KorumaDatabase.updateMany({}, { $set: { mode: false } }, { upsert: true });
       msg.channel.send(`${cfg.Emoji.TickEmoji} Sunucumuzun yönetici rolleri **açılmıştır**, sunucu güvenli moddan çıkmıştır!`)
        return;
       })
    } else return client.message(client.normalEmbed(`Bir seçim belirt ve tekrardan dene! (\`aç/kapat\`)`, msg), msg.channel.id)}}