module.exports = {
  conf: {
    aliases: ["commands", "komut"],
    name: "command",
    usage: 'command',
    description: 'Komut açarsınız.',
  },
  
  run: async ({client, msg, args, moment, CommandsDatabase, MessageEmbed, prefix, SetupDatabase, table}) => {

     const dt = await SetupDatabase.findOne({guildID: msg.guild.id})
     let commandsTrue = dt && dt.allCommandsTrue ? dt.allCommandsTrue : []    
     if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)                              

     let arr = ["ekle", "izin", "sil", "engelle", "ekle", "kaldır", "bilgi", "info", "add", "aç", "ver", "kaldir", "delete", "liste", "list"]
     if (!arr.includes(args[0])) return client.message(client.normalEmbed("Bir seçenek belirt ve tekrardan dene!\n\n\`"+prefix+"komut ekle <isim> @rol\n"+prefix+"komut izin ekle/kaldır <isim> @rol\n"+prefix+"komut sil <isim>\n"+prefix+"komut bilgi <isim/ID>\n"+prefix+"komut engelle <isim> @üye\`\n"+prefix+"\`komut liste\`", msg), msg.channel.id)
   
     if (args[0] === "list" || args[0] === "liste") {
      await CommandsDatabase.find({ guildID: msg.guild.id }).sort({ cmdID: "descending" }).exec(async (err, res) => {
      if (!res) return client.timemessage(client.normalEmbed(`Bu sunucuda özel komut bulunmuyor.`, msg), msg.channel.id, 7000)
      let datax = [ ["ID", "İsim", "Sahip", "Oluşturulma", "Kullanılma"] ]; 
      let dataxe = [ ["ID", "İsim", "Sahip", "Oluşturulma", "Kullanılma"] ];
      let config = { border: { topBody: ``, topJoin: ``, topLeft: ``, topRight: ``, bottomBody: ``, bottomJoin: ``, bottomLeft: ``, bottomRight: ``, bodyLeft: `│`, bodyRight: `│`, bodyJoin: `│`, joinBody: ``, joinLeft: ``, joinRight: ``, joinJoin: `` } };
       res.map(x => { datax.push([x.cmdID, x.cmdName, client.users.cache.get(x.cmdOwner).tag, moment(x.cmdCreateDate).locale("TR").format("LLL"), x.cmdUseCount]) })
       res.map(x => { dataxe.push([x.cmdID, x.cmdName, client.users.cache.get(x.cmdOwner).tag, moment(x.cmdCreateDate).locale("TR").format("LLL"), x.cmdUseCount]) })
      let out = table(dataxe, config)
      let outi = table(datax.slice(0, 10), config)            
      msg.channel.send('**'+msg.guild.name+'** sunucusunda toplam '+datax.length+' özel komut bulunmakta son 10 komut aşağıda belirtilmiştir.Tüm komut bilgi dosyasını indirmek için 🚫 emojisine basabilirsin.Tekli bir komuta bakmak için \`!komut bilgi isim/ID\` komutunu uygulayınız.```'+outi+'```').then(message => {
      message.react("🚫")
      message.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == '🚫'), { max: 1, time: 30000 }).then(async collected => {
      if (collected.first().emoji.name == '🚫') {
       message.channel.send(`**${msg.guild.name}** sunucunda bulunan toplam ${datax.length} özel komut aşağıdaki belgede yazmaktadır.`, { files: [{ attachment: Buffer.from(out), name: `${msg.guild.name}_commands.txt` }] }).then(msg => {
       message.delete({ timeout: 5000 })})
      }})})})     
     }
    
     if (args[0] === "ekle" || args[0] === "add" || args[0] === "aç") {
      let count = await CommandsDatabase.countDocuments().exec();
       count = count == 0 ? 1 : count + 1; 
      if (!args[1]) return client.message(client.normalEmbed(`Bir isim belirt ve tekrardan dene!`, msg), msg.channel.id)
      let res = await CommandsDatabase.findOne({ cmdName: args[1] })
      if (res) return client.message(client.normalEmbed(`\`${args[1]}\` adında bir komut zaten bulunuyor.`, msg), msg.channel.id)
      let roles;
      if (msg.mentions.roles.size >= 1) {
       roles = msg.mentions.roles.map(r => r.id);
      } else {
       if (!roles) return client.message(client.normalEmbed(`\`${args[1]}\` komutu kullanıldığında verilecek rolü belirtiniz.`, msg), msg.channel.id)   
        roles = args.splice(0, 1).map(id => msg.guild.roles.cache.get(id)).filter(r => r != undefined);
      }
      let buffer = new CommandsDatabase({ guildID: msg.guild.id, cmdName: args[1], cmdID: count, cmdOwner: msg.author.id, cmdCreateDate: Date.now(), cmdUseCount: 0, allowedRoles: [], cmdRoles: roles, blockedUsers: [], allowedUsers: [] })
       return buffer.save().then(() => { client.message(client.normalEmbed(`\`${args[1]}\` isimli komut oluşturuldu. Bu komut kullanıldığında ${roles.map(a => `<@&${a}>`)} ${roles.length === 1 ? `rolü` : `rolleri`} verilecek.`, msg), msg.channel.id) }) 
     }

     if (args[0] === "izin") {
      let newArr = ["ekle", "kaldır", "kaldir", "ver", "delete", "sil"]
      if (!newArr.includes(args[1])) return client.message(client.normalEmbed("Argümanları doğru şekilde yerleştirip tekrar deneyin;\n\`!komut izin ekle/kaldır <isim> @rol\`", msg), msg.channel.id)
      if (!args[2]) return client.message(client.normalEmbed(`Komut ismi veya ID'si belirt ve tekrardan dene!`, msg), msg.channel.id)
      if (Number(args[2])) {
       let res = await CommandsDatabase.findOne({ cmdID: args[2] })
       if (!res) return client.message(client.normalEmbed(`\`${args[2]}\` numaralı bir komut bulunamadı.`, msg), msg.channel.id)
       if (msg.author.id !== res.cmdOwner && msg.member.hasPermission(8)) return client.message(client.normalEmbed(`\`${res.cmdName}\` isimli komutu düzenlemek için **yönetici** veya **komut sahibi** olmalısın.`, msg), msg.channel.id)
       let role = msg.mentions.roles.first() || await msg.guild.roles.cache.get(args[3])
       let user = msg.mentions.members.first() || await msg.guild.members.cache.get(args[3])
       if (!role && !user) return client.message(client.normalEmbed(`Geçerli bir üye ya da rol belirt ve tekrardan dene!`, msg), msg.channel.id)
       if (!user && role) {
        if (args[1] === "ekle" || args[1] === "ver") {
         if (res.allowedRoles.includes(role.id)) return client.message(client.normalEmbed(`${role.name} rolünün zaten \`${args[2]}\` komutunu kullanma izni var.`, msg), msg.channel.id)
          res.allowedRoles.push(role.id)
           return res.save().then(() => {
            client.message(client.normalEmbed(`${role} rolüne sahip üyeler \`${res.cmdName}\` isimli komutu kullanabilecek.`, msg), msg.channel.id)
        })
     } else {
      if (!res.allowedRoles.includes(role.id)) return client.message(client.normalEmbed(`${role} rolünün zaten \`${res.cmdName}\` isimli komutu kullanma izni yok.`, msg), msg.channel.id)
       res.allowedRoles.splice(res.allowedRoles.indexOf(role.id), 1)
        return res.save().then(() => {
         client.message(client.normalEmbed(`${role} rolüne sahip üyelerin \`${res.cmdName}\` isimli komutu kullanma izni kaldırıldı.`, msg), msg.channel.id)
        })
     }
     }
      if (!role && user) {
       if (args[1] === "ekle" || args[1] === "ver" || args[1] === "add") {
        if (res.allowedRoles.includes(user.id)) return client.message(client.normalEmbed(`${user} kişisinin zaten \`${res.cmdName}\` komutunu kullanma izni var.`, msg), msg.channel.id)
         res.allowedUsers.push(user.id)
          return res.save().then(() => {
           client.message(client.normalEmbed(`${user} adlı üye \`${res.cmdName}\` isimli komutu kullanabilecek.`, msg), msg.channel.id)
         })
     } else {
      if (!res.allowedUsers.includes(user.id)) return client.message(client.normalEmbed(`${user} adlı üyenin zaeten \`${res.cmdName}\` komutunu kullanma izni yok.`, msg), msg.channel.id)
       res.allowedUsers.splice(res.allowedUsers.indexOf(user.id), 1)
        return res.save().then(() => {
         client.message(client.normalEmbed(`${user} adlı üyenin \`${res.cmdName}\` isimli komutu kullanma izni kaldırıldı.`, msg), msg.channel.id)
        })
     }
     }
     } else { 
      let res = await CommandsDatabase.findOne({ cmdName: args[2] }) 
      if (!res) return client.message(client.normalEmbed(`\`${args[2]}\` adında bir komut bulunamadı.`, msg), msg.channel.id)
      if (msg.author.id !== res.cmdOwner && msg.member.hasPermission(8)) return client.message(client.normalEmbed(`\`${res.cmdName}\` isimli komutu düzenlemek için **yönetici** veya **komut sahibi** olmalısın.`, msg), msg.channel.id)
       let role = msg.mentions.roles.first() || await msg.guild.roles.cache.get(args[3])
       let user = msg.mentions.members.first() || await msg.guild.members.cache.get(args[3])
       if (!role && !user) return client.message(client.normalEmbed(`Geçerli bir üye ya da rol belirt ve tekrardan dene!`, msg), msg.channel.id)
       if (!user && role) {
        if (args[1] === "ekle" || args[1] === "ver") {
         if (res.allowedRoles.includes(role.id)) return client.message(client.normalEmbed(`${role.name} rolünün zaten \`${args[2]}\` komutunu kullanma izni var.`, msg), msg.channel.id)
          res.allowedRoles.push(role.id)
           return res.save().then(() => {
            client.message(client.normalEmbed(`${role} rolüne sahip üyeler \`${res.cmdName}\` isimli komutu kullanabilecek.`, msg), msg.channel.id)
        })
     } else {
      if (!res.allowedRoles.includes(role.id)) return client.message(client.normalEmbed(`${role} rolünün zaten \`${res.cmdName}\` isimli komutu kullanma izni yok.`, msg), msg.channel.id)
       res.allowedRoles.splice(res.allowedRoles.indexOf(role.id), 1)
        return res.save().then(() => {
         client.message(client.normalEmbed(`${role} rolüne sahip üyelerin \`${res.cmdName}\` isimli komutu kullanma izni kaldırıldı.`, msg), msg.channel.id)
        })
     }
     }
      if (!role && user) {
       if (args[1] === "ekle" || args[1] === "ver" || args[1] === "add") {
        if (res.allowedRoles.includes(user.id)) return client.message(client.normalEmbed(`${user} kişisinin zaten \`${res.cmdName}\` komutunu kullanma izni var.`, msg), msg.channel.id)
         res.allowedUsers.push(user.id)
          return res.save().then(() => {
           client.message(client.normalEmbed(`${user} adlı üye \`${res.cmdName}\` isimli komutu kullanabilecek.`, msg), msg.channel.id)
         })
     } else {
      if (!res.allowedUsers.includes(user.id)) return client.message(client.normalEmbed(`${user} adlı üyenin zaeten \`${res.cmdName}\` komutunu kullanma izni yok.`, msg), msg.channel.id)
       res.allowedUsers.splice(res.allowedUsers.indexOf(user.id), 1)
        return res.save().then(() => {
         client.message(client.normalEmbed(`${user} adlı üyenin \`${res.cmdName}\` isimli komutu kullanma izni kaldırıldı.`, msg), msg.channel.id)
        })
     }
     }
     }
     }

     if (args[0] === "sil" || args[0] === "kaldır" || args[0] === "kaldir" || args[0] === "delete") {
      if (!args[1]) return client.message(client.normalEmbed(`Komut ismi veya ID'si belirt ve tekrardan dene!`, msg), msg.channel.id)
      if (Number(args[1])) {
       let res = await CommandsDatabase.findOne({ cmdID: args[1] })
       if (!res) return client.message(client.normalEmbed(`\`${args[1]}\` numaralı bir komut bulunamadı.`, msg), msg.channel.id)
       if (msg.author.id !== res.cmdOwner && msg.member.hasPermission(8)) return client.message(client.normalEmbed(`\`${res.cmdName}\` isimli komutu düzenlemek için **yönetici** veya **komut sahibi** olmalısın.`, msg), msg.channel.id)
        return res.delete().then(() => {
         client.message(client.normalEmbed(`\`${res.cmdName}\` isimli komut başarıyla silindi.`, msg), msg.channel.id)
        })
      } else { 
       let res = await CommandsDatabase.findOne({ cmdName: args[1] }) 
       if (!res) return client.message(client.normalEmbed(`\`${args[1]}\` adında bir komut bulunamadı.`, msg), msg.channel.id)
       if (msg.author.id !== res.cmdOwner && msg.member.hasPermission(8)) return client.message(client.normalEmbed(`\`${res.cmdName}\` isimli komutu düzenlemek için **yönetici** veya **komut sahibi** olmalısın.`, msg), msg.channel.id)
        return res.delete().then(() => {
         client.message(client.normalEmbed(`\`${res.cmdName}\` isimli komut başarıyla silindi.`, msg), msg.channel.id)
       })
      }
     }

     if (args[0] === "bilgi" || args[0] === "info") {
      if (!args[1]) return client.message(client.normalEmbed(`Komut ismi veya ID'si belirt ve tekrardan dene!`, msg), msg.channel.id)
      if (Number(args[1])) {
       let res = await CommandsDatabase.findOne({ cmdID: args[1] }) 
       if (!res) return client.message(client.normalEmbed(`\`${args[1]}\` numaralı bir komut bulunamadı.`, msg), msg.channel.id)
        return msg.channel.send(new MessageEmbed().setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true})).setColor("RANDOM").setDescription(`Komut Adı: \`${res.cmdName}\`\nKomut ID: \`${res.cmdID}\`\nKomut Açılma: \`${moment(res.cmdCreateDate).locale("TR").format("LLL")}\`\nKomut Sahip: <@!${res.cmdOwner}> (\`${res.cmdOwner}\`)\nKomut Kullanım Sayısı: \`${res.cmdUseCount || 0}\`\n\nVerilecek ${res.cmdRoles.length === 1 ? `Rol` : res.cmdRoles.length === 0 ? `Rol` : `Roller`}: ${res.cmdRoles.length === 0 ? `\`Yok\`` : res.cmdRoles.map(a => `<@&${a}>`)}\nİzinli ${res.allowedRoles.length === 1 ? `Rol` : res.allowedRoles.length === 0 ? `Rol` : `Roller`}: ${res.allowedRoles.length === 0 ? `\`Yok\`` : res.allowedRoles.map(a => `<@&${a}>`)}\nİzinli ${res.allowedUsers.length === 1 ? `Kullanıcı` : res.allowedUsers.length === 0 ? `Kullanıcı` : `Kullanıcılar`}: ${res.allowedUsers.map(x => `<@${x}>`).join("  ") || "\`Yok\`"}\nEngellenen ${res.blockedUsers.length === 1 ? `Kullanıcı` : res.blockedUsers.length === 0 ? `Kullanıcı` : `Kullanıcılar`}: ${res.blockedUsers.map(x => `<@${x}>`).join("  ") || "\`Yok\`"}`))
      } else { 
       let res = await CommandsDatabase.findOne({ cmdName: args[1] }) 
       if (!res) return client.message(client.normalEmbed(`\`${args[1]}\` adında bir komut bulunamadı.`, msg), msg.channel.id)
        return msg.channel.send(new MessageEmbed().setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true})).setColor("RANDOM").setDescription(`Komut Adı: \`${res.cmdName}\`\nKomut ID: \`${res.cmdID}\`\nKomut Açılma: \`${moment(res.cmdCreateDate).locale("TR").format("LLL")}\`\nKomut Sahip: <@!${res.cmdOwner}> (\`${res.cmdOwner}\`)\nKomut Kullanım Sayısı: \`${res.cmdUseCount || 0}\`\n\nVerilecek ${res.cmdRoles.length === 1 ? `Rol` : res.cmdRoles.length === 0 ? `Rol` : `Roller`}: ${res.cmdRoles.length === 0 ? `\`Yok\`` : res.cmdRoles.map(a => `<@&${a}>`)}\nİzinli ${res.allowedRoles.length === 1 ? `Rol` : res.allowedRoles.length === 0 ? `Rol` : `Roller`}: ${res.allowedRoles.length === 0 ? `\`Yok\`` : res.allowedRoles.map(a => `<@&${a}>`)}\nİzinli ${res.allowedUsers.length === 1 ? `Kullanıcı` : res.allowedUsers.length === 0 ? `Kullanıcı` : `Kullanıcılar`}: ${res.allowedUsers.map(x => `<@${x}>`).join("  ") || "\`Yok\`"}\nEngellenen ${res.blockedUsers.length === 1 ? `Kullanıcı` : res.blockedUsers.length === 0 ? `Kullanıcı` : `Kullanıcılar`}: ${res.blockedUsers.map(x => `<@${x}>`).join("  ") || "\`Yok\`"}`))
       }
     }

     if (args[0] === "engelle") {
      if (!args[1]) return client.message(client.normalEmbed(`Komut ismi veya ID'si belirt ve tekrardan dene!`, msg), msg.channel.id)
      if (Number(args[1])) {
       let res = await CommandsDatabase.findOne({ cmdID: args[1] }) 
       if (!res) return client.message(client.normalEmbed(`\`${args[1]}\` numaralı bir komut bulunamadı.`, msg), msg.channel.id)
       if (msg.author.id !== res.cmdOwner && msg.member.hasPermission(8)) return client.message(client.normalEmbed(`\`${res.cmdName}\` isimli komutu düzenlemek için **yönetici** veya **komut sahibi** olmalısın.`, msg), msg.channel.id)
       let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[2])
       if (!member) return client.message(client.normalEmbed(`Bir üye belirt ve tekrardan dene!`, msg), msg.channel.id)
       if (res.blockedUsers.includes(member.user.id)) {
        await res.blockedUsers.splice(res.blockedUsers.indexOf(member.user.id), 1)
        await res.save()
         return client.message(client.normalEmbed(`${member} üyesinin \`${res.cmdName}\` isimli komuta kullanım engeli başarıyla kaldırıldı.`, msg), msg.channel.id)
      } else {
        await res.blockedUsers.push(member.user.id)
        await res.save()
         return client.message(client.normalEmbed(`${member} üyesi \`${res.cmdName}\` komutunun kullanımından engellendi.`, msg), msg.channel.id)
      }
      } else { 
       let res = await CommandsDatabase.findOne({ cmdName: args[1] }) 
       if (!res) return client.message(client.normalEmbed(`\`${args[1]}\` adında bir komut bulunamadı.`, msg), msg.channel.id)
       if (msg.author.id !== res.cmdOwner && msg.member.hasPermission(8)) return client.message(client.normalEmbed(`\`${res.cmdName}\` isimli komutu düzenlemek için **yönetici** veya **komut sahibi** olmalısın.`, msg), msg.channel.id)
       let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[2])
       if (!member) return client.message(client.normalEmbed(`Bir üye belirt ve tekrardan dene!`, msg), msg.channel.id)
       if (res.blockedUsers.includes(member.user.id)) {
        await res.blockedUsers.splice(res.blockedUsers.indexOf(member.user.id), 1)
        await res.save()
         return client.message(client.normalEmbed(`${member} üyesinin \`${res.cmdName}\` isimli komuta kullanım engeli başarıyla kaldırıldı.`, msg), msg.channel.id)
       } else {
        await res.blockedUsers.push(member.user.id)
        await res.save()
         return client.message(client.normalEmbed(`${member} üyesi \`${res.cmdName}\` komutunun kullanımından engellendi.`, msg), msg.channel.id)
      }       
      }
     }    
    
}}