module.exports = {
  conf: {
    aliases: ["team","crew"],
    name: "ekip",
    usage: 'ekip [ekip ismi]',
    description: 'Sunucuda bulunnan ekipler hakkında bilgi alırsınız. (Tüm ekipler hakkında bilgi almak için !ekip tek bir ekip hakkında bilgi almak için ise !ekip bilgi [ekip ismi])',
},

 run: async ({client, msg, args, cfg, author, MessageEmbed, prefix, SetupDatabase, EkipDatabase, moment}) => {
  
     const res = await EkipDatabase.findOne({ guildID: msg.guild.id })
     const doc = await SetupDatabase.findOne({ guildID: msg.guild.id })
     let sec = args[0];
     let guildTag = doc && doc.guildTag ? doc.guildTag : ""
     let staffRoles = doc && doc.staffRoles ? doc.staffRoles : []
     if (staffRoles.length === 0) return client.message(client.normalEmbed(`Henüz yetkili rolünün kurulumu yapılmamış, kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)   
     if (guildTag === "") return client.message(client.normalEmbed(`Henüz sunucu tagının kurulumu yapılmamış, kurulumu yap ve tekrardan dene!`, msg), msg.channel.id) 
     let yetkili = msg.guild.members.cache.filter(x => {
      return x.user.username.includes(guildTag) && x.voice.channel && x.roles.cache.some(r => staffRoles.includes(r.id))
     }).size
     let ses = msg.guild.members.cache.filter(x => x.voice.channel).size 
     let members = msg.guild.members.cache.size
     if (!sec || sec === "yardım" || sec === "help") return client.message(client.normalEmbed(`\`⦁\` **${prefix}ekip yardım:** Ekip sistemi hakkında bilgi alırsınız.\n\`⦁\` **${prefix}ekip ekle:** Sunucuya ekip eklersiniz.\n\`⦁\` **${prefix}ekip liste:** Sunucuda bulunan ekiplerin listesini alırsınız.\n\`⦁\` **${prefix}ekip bilgi:** Belirttiğiniz ekip hakkında detaylı bilgi alırsınız.\n\`⦁\` **${prefix}ekip sil:** Belirttiğiniz ekibi silersiniz.`, msg), msg.channel.id)
     let nameTag = args[1];
     let discriminatorTag = args[2];
     let crewAdmin = msg.mentions.members.first() || msg.guild.members.cache.get(args[3]);   
   
     if (sec === "ekle" || sec === "add") {      
       
      if (!nameTag) return client.message(client.normalEmbed(`Bir isim tagı belirt ve tekrardan dene!`, msg), msg.channel.id)
      if (!discriminatorTag || isNaN(discriminatorTag)) return client.message(client.normalEmbed(`Geçerli bir etiket tagı belirt ve tekrardan dene!`, msg), msg.channel.id)
      if (!crewAdmin) return client.message(client.normalEmbed(`Geçerli bir ekip yöneticisi belirt ve tekrardan dene!`, msg), msg.channel.id)     
       msg.guild.roles.create({ data: { name: `${nameTag} #${discriminatorTag}`, color: "RANDOM", mentionable: false }, reason: "Ekip Rolü" }).then(async (role) => {
       await EkipDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $push: { crews: { nameTag: nameTag, discriminatorTag: discriminatorTag || "-", crewAdmin: crewAdmin.id, date: Date.now(), crewRole: role.id } } }, { upsert: true });
       client.message(client.normalEmbed(`Belirttiğin ekip başarıyla oluşturuldu ve kullanıcı isminde tag olan üyelere (**${msg.guild.members.cache.filter(m => m.user.discriminator.includes(nameTag)).size + msg.guild.members.cache.filter(m => m.user.username.toLowerCase().includes(discriminatorTag)).size}** üye) ${role} rolü dağıtılmaya başlandı.\n\n**Ekip Bilgileri**\nEkip Rolü: ${role} (\`${role.id}\`)\nEkip Yöneticisi: **${crewAdmin}**\nİsim Tagı: **${nameTag}**\nEtiket Tagı: **${discriminatorTag}**\nEkip Katılım Tarihi: **${moment(Date.now()).locale("TR").format("LLL")}**\nİsim Tagında Bulunan Üye Sayısı: **${msg.guild.members.cache.filter(m => m.user.username.toLowerCase().includes(nameTag)).size}**\nEtiket Tagında Bulunan Üye Sayısı: **${msg.guild.members.cache.filter(m => m.user.discriminator.includes(discriminatorTag)).size}** `, msg), msg.channel.id)
       client.react(msg, "tick")
       msg.guild.members.cache.forEach(a => {
        if (a.user.username.includes(nameTag)) {
         a.roles.add(role.id)
       }
       })
       msg.guild.members.cache.forEach(b => {
        if (b.user.discriminator.includes(discriminatorTag)) {
         b.roles.add(role.id)
       }
       })
       })
       
      } else if (sec === "liste" || sec === "list" || sec === "tüm") {
       let crewList = res.crews.length > 0 ? res.crews.map(a => `${cfg.Emoji.Partner} **${msg.guild.roles.cache.get(a.crewRole).name} bilgilendirme:**\n${cfg.Emoji.Members} Ekip Yöneticisi: <@!${a.crewAdmin}> (**${a.crewAdmin}**)\n${cfg.Emoji.Members} Ekip Katılım Tarihi: **${moment(a.date).locale("TR").format("LLL")}**\n${cfg.Emoji.Members} Toplam: **__${msg.guild.roles.cache.get(a.crewRole).members.size}__**\n${cfg.Emoji.Çevrimiçi} Çevrimiçi: **${msg.guild.roles.cache.get(a.crewRole).members.filter(u => u.presence.status != "offline").size}**\n${cfg.Emoji.Voice} Sesteki: **${msg.guild.roles.cache.get(a.crewRole).members.filter(m => m.voice.channel).size}**\n${cfg.Emoji.Oran} Ses oranı: **%${parseInt((msg.guild.roles.cache.get(a.crewRole).members.filter(m => m.voice.channel).size / ses) * 100)}**   `).join("\n\n") : `Sunucuda ekip bulunmuyor.`;
       msg.channel.send(new MessageEmbed().setColor("RANDOM").setDescription(crewList).setFooter(`Sesteki üye oranı: %${parseInt((ses / members) * 100)} | Sesteki yetkili oranı: %${parseInt((yetkili / ses) * 100)}`).setAuthor(msg.guild.name, msg.guild.iconURL({dynamic:true}))) 
      } else if (sec === "bilgi" || sec === "info") {
       
       if (!nameTag && !discriminatorTag) return client.message(client.normalEmbed("Geçerli bir ekip tagı belirt ve tekrardan dene!", msg), msg.channel.id)
       const crews = await EkipDatabase.findOne({ guildID: msg.guild.id })
       const crewInfo = crews.crews.filter(a => (Number(nameTag) ? a.discriminatorTag : a.nameTag) == nameTag).map(a => `\`•\` <@&${a.crewRole}> Ekibinin sunucu içi aktiflik durumu;\n\`•\` Toplam sahip oldukları üye sayısı: \`${msg.guild.roles.cache.get(a.crewRole).members.size}\`\n\`•\` Sunucumuzda tagımızı alan bizi destekleyen ekip üyesi miktarı: \`${msg.guild.roles.cache.get(a.crewRole).members.filter(x => x.user.username.includes(guildTag)).size}\`\n\`•\` Sunucumuzda ses kanallarında bulunan ekip üyesi: \`${msg.guild.roles.cache.get(a.crewRole).members.filter(m => m.voice.channel).size}\`\n\`•\` Aktif olup seste olmayan ekip üyelerinin miktarı: \`${msg.guild.members.cache.filter(x => { return x.roles.cache.has(a.crewRole) && !x.voice.channel && x.user.presence.status !== "offline"}).size}\`\n\`•\` Sunucumuzda yetkili olan ekip üyelerinin miktarı: \`${msg.guild.roles.cache.get(a.crewRole).members.filter(x => x.roles.cache.some(r => staffRoles.includes(r.id))).size}\`\n\`•\` Ekip İsim Tagı: \`${a.nameTag}\`\n\`•\` Ekip Etiket Tagı: \`#${a.discriminatorTag}\`\n\`•\` Ekip Yöneticisi: ${msg.guild.members.cache.get(a.crewAdmin)} (\`${a.crewAdmin}\`)\n\`•\` Ekip Katılma Tarihi: \`${moment(a.date).locale("TR").format("LLL")}\`\n`)
       if (!crewInfo) return client.message(client.normalEmbed("Geçerli bir ekip tagı belirt ve tekrardan dene!", msg), msg.channel.id)
        msg.channel.send(new MessageEmbed().setColor("RANDOM").setDescription(crewInfo).setThumbnail(msg.guild.iconURL({dynamic:true})).setAuthor(msg.guild.name, msg.guild.iconURL({dynamic:true})))
   
      } else if (sec === "sil" || sec === "remove" || sec === "çıkar") {
              
       if (!nameTag) return client.message(client.normalEmbed("Bir ekip tagı belirt ve tekrardan dene!", msg), msg.channel.id)
       const crews = await EkipDatabase.findOne({ guildID: msg.guild.id })
       const crewName = crews.crews.filter(a => (Number(nameTag) ? a.discriminatorTag : a.nameTag) == nameTag).map(e => e.nameTag)
       const crewDiscrim = crews.crews.filter(a => (Number(nameTag) ? a.discriminatorTag : a.nameTag) == nameTag).map(e => e.discriminatorTag)
       const admin = crews.crews.filter(a => (Number(nameTag) ? a.discriminatorTag : a.nameTag) == nameTag).map(e => e.crewAdmin)
       const role = crews.crews.filter(a => (Number(nameTag) ? a.discriminatorTag : a.nameTag) == nameTag).map(e => e.crewRole)
       if (!crewName) return client.message(client.normalEmbed("Geçerli bir ekip tagı belirt ve tekrardan dene!", msg), msg.channel.id)
        client.message(client.normalEmbed(`Sunucumuzda bulunan \`${crewName} #${crewDiscrim}\` adlı ekip başarıyla silindi.`, msg), msg.channel.id)
        await msg.guild.roles.cache.get(`${role}`).delete({ reason: "Ekip Silindi." }).catch(() => { })
        await EkipDatabase.updateOne({ guildID: msg.guild.id }, { $pull: { crews: { nameTag: nameTag ? nameTag : discriminatorTag } } }) 
              
      } else return client.message(client.normalEmbed(`\`⦁\` **${prefix}ekip yardım:** Ekip sistemi hakkında bilgi alırsınız.\n\`⦁\` **${prefix}ekip ekle:** Sunucuya ekip eklersiniz.\n\`⦁\` **${prefix}ekip liste:** Sunucuda bulunan ekiplerin listesini alırsınız.\n\`⦁\` **${prefix}ekip bilgi:** Belirttiğiniz ekip hakkında detaylı bilgi alırsınız.\n\`⦁\` **${prefix}ekip sil:** Belirttiğiniz ekibi silersiniz.`, msg), msg.channel.id)}}