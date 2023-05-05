module.exports = {
  conf: {
    aliases: ["unceza", "cezakaldır", "removeceza", "unmute", "vunmute", "voiceunmute", "unchatmute", "chatunmute", "unjail", "af", "unslave"],
    name: "remove",
    usage: "remove [üye]",
    description: "Belirttiğiniz kullanıcının aktif cezasını kaldırırsınız.",
  },
  
  run: async ({client, msg, args, cfg, uye, MessageEmbed, SetupDatabase, CezaDatabase, moment, VoiceUnmuteDatabase, VoiceMuteDatabase, CezalıRolesDatabase}) => {
 
     const res = await SetupDatabase.findOne({guildID: msg.guild.id})
     let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : []  
     let jailTrue = res && res.jailRoles ? res.allCommandsTrue : []  
     let punitiveRole = res && res.punitiveRole ? res.punitiveRole : ""
     let unregisterRoles = res && res.unregisterRoles ? res.unregisterRoles : []
     let jailLog = res && res.jailLog ? res.jailLog : ""
     let chatMuteTrue = res && res.chatMuteRoles ? res.chatMuteRoles : []
     let chatMuteLog = res && res.chatMuteLog ? res.chatMuteLog : ""
     let mutedRole = res && res.mutedRole ? res.mutedRole : ""  
     let voiceMuteTrue = res && res.voiceMuteRoles ? res.voiceMuteRoles : [] 
     let voiceMuteLog = res && res.voiceMuteLog ? res.voiceMuteLog : ""
     let botCommandsTrue = res && res.botCommandsRoles ? res.botCommandsRoles : [] 
       
     if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.some(r => botCommandsTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
     if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`,msg), msg.channel.id, 7000)
     if (uye.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
     if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
     if (mutedRole === "") return client.message(client.normalEmbed(`Henüz muted rolünün kurulumu yapılmamış, kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)  
     if (punitiveRole === "") return client.message(client.normalEmbed(`Henüz jail rolünün kurulumu yapılmamış, kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)  
     if (unregisterRoles.length === 0) return client.message(client.normalEmbed(`Henüz kayıtsız rolünün kurulumu yapılmamış, kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)  
     if (msg.member.roles.highest.position < uye.roles.highest.position) return client.timemessage(client.normalEmbed(`Kendi rolünden yüksek kişilere işlem uygulayamazsın!`, msg), msg.channel.id, 5000) 
 
     let Array = []
     let array = []
     let Arr = []
     
     await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id, jail: true }, async (err, doc) => {
      if (!doc) {
       if (uye.roles.cache.has(punitiveRole)) {
        await Arr.push(`1 | JAIL`)
        await Array.push(`\`#1\` Numaralı ceza türü **__JAIL__**\n\`•\` Bu ceza bot ile atılmadığı için detaylı bilgi gösteremiyorum.`)
      }
     } else {
      if (doc.jail == true) {
      await Arr.push(`1 | JAIL`)
      await Array.push(`\`#1\` Numaralı ceza türü **__JAIL__**\n\`•\` Ceza Sebebi: \`${doc.Reason}\`\n\`•\` Ceza Başlangıç Tarihi: \`${moment(doc.date).locale("TR").format("LLL")}\`\n\`•\` Ceza Bitiş Tarihi: \`${moment(doc.finishDate).locale("TR").format("LLL")}\`\n\`•\` Cezalandıran Yetkili: <@!${doc.authorID}> (\`${doc.authorID}\`)`)
     } else {
       }
      }
     })
     await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id, chatmuted: true }, async (err, doc) => {
      if (!doc) {
       if (uye.roles.cache.has(mutedRole)) {
        await Arr.push(`${Array.length === 1 ? 2 : Array.length === 2 ? 2 : 1} | CHAT MUTE`)
        await Array.push(`\`#${Array.length === 1 ? 2 : Array.length === 2 ? 2 : 1}\` Numaralı ceza türü **__CHAT MUTE__**\n\`•\` Bu ceza bot ile atılmadığı için detaylı bilgi gösteremiyorum.`)
      }
     } else {
      if (doc.chatmuted == true) {
      await Arr.push(`${Array.length === 1 ? 2 : Array.length === 2 ? 2 : 1} | CHAT MUTE`)
      await Array.push(`\`#${Array.length === 1 ? 2 : Array.length === 2 ? 2 : 1}\` Numaralı ceza türü **__CHAT MUTE__**\n\`•\` Ceza Sebebi: \`${doc.Reason}\`\n\`•\` Ceza Başlangıç Tarihi: \`${moment(doc.date).locale("TR").format("LLL")}\`\n\`•\` Ceza Bitiş Tarihi: \`${moment(doc.finishDate).locale("TR").format("LLL")}\`\n\`•\` Cezalandıran Yetkili: <@!${doc.authorID}> (\`${doc.authorID}\`)`)
     } else {
       }
      }
     })
     await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id, voicemuted: true }, async (err, doc) => {
      if (!doc) {
       if (uye.voice.serverMute == true) {
        await Arr.push(`${Array.length === 2 ? 3 : Array.length === 1 ? 2 : 1} | VOICE MUTE`)
        await Array.push(`\`#${Array.length === 2 ? 3 : Array.length === 1 ? 2 : 1}\` Numaralı ceza türü **__VOICE MUTE__**\n\`•\` Bu ceza bot ile atılmadığı için detaylı bilgi gösteremiyorum.`)         
       }
     } else {
      if (doc.voicemuted == true) {
      await Arr.push(`${Array.length === 2 ? 3 : Array.length === 1 ? 2 : 1} | VOICE MUTE`)
      await Array.push(`\`#${Array.length === 2 ? 3 : Array.length === 1 ? 2 : 1}\` Numaralı ceza türü **__VOICE MUTE__**\n\`•\` Ceza Sebebi: \`${doc.Reason}\`\n\`•\` Ceza Başlangıç Tarihi: \`${moment(doc.date).locale("TR").format("LLL")}\`\n\`•\` Ceza Bitiş Tarihi: \`${moment(doc.finishDate).locale("TR").format("LLL")}\`\n\`•\` Cezalandıran Yetkili: <@!${doc.authorID}> (\`${doc.authorID}\`)`)
     } else {
       }
      }
     }) 
     if (Array.length === 0) return client.message(client.normalEmbed(`Bu üyenin veritabanında aktif cezası bulunmamakta.`, msg), msg.channel.id)
     if (Array.length === 1) array.push(cfg.Emoji.Number1)
     if (Array.length === 2) array.push(cfg.Emoji.Number1, cfg.Emoji.Number2)
     if (Array.length === 3) array.push(cfg.Emoji.Number1, cfg.Emoji.Number2, cfg.Emoji.Number3)
     if (Array.length === 4) array.push(cfg.Emoji.Number1, cfg.Emoji.Number2, cfg.Emoji.Number3, cfg.Emoji.Number4)
     const filter = (reaction, user) => {
      return array.includes(reaction.emoji.id) && user.id === msg.author.id;
     };  

     msg.channel.send(new MessageEmbed().setDescription(`Merhabalar ${msg.author}, aşağıda cezasını kaldırmak istediğiniz ${uye} üyesinin aktif \`${Array.length}\` cezası görülmektedir. Kaldırmak istediğiniz cezaya karşılık gelen tepkiye basarak o cezayı kaldırabilirsınız.\n\n${Array.map(a => a).join(`\n\n`)}`).setAuthor(msg.author.tag, msg.author.avatarURL({dynamic: true})).setTimestamp().setFooter(`Bir işlem yapmak için toplam 30 saniyeniz mevcut`).setColor("RANDOM")).then(async(m) => {
      await msgReact(m)
      await m.awaitReactions(filter, { max: 1, time: 30000, errors: ["time"]}).then(async collected => {
       const reaction = collected.first();
     if (reaction.emoji.id === cfg.Emoji.Number1) {
      cezaCheck(1, m)       
     } else if (reaction.emoji.id === cfg.Emoji.Number2) {
      cezaCheck(2, m) 
     } else if (reaction.emoji.id === cfg.Emoji.Number3) {
      cezaCheck(3, m) 
     } else if (reaction.emoji.id === cfg.Emoji.Number4) {
      cezaCheck(4, m) 
     }
    }).catch(() => m.edit(new MessageEmbed().setColor("RANDOM").setAuthor(msg.author.tag, msg.member.user.avatarURL( { dynamic:true } )).setDescription(`Seçim için belirtilen sürede tepkiye tıklanmadığı için işlem iptal edildi.`)) && m.reactions.removeAll())
     })
  
    function msgReact(message) {
     for (var react of array) {
      message.react(react)
     }     
    }
    
    function cezaCheck(number, message) {
     for (var ceza of Arr) {
      if (ceza.includes(number)) {
       let type = ceza.split("| ")[1]
       setTimeout(async() => {
       if (type === "CHAT MUTE") {
        await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id, chatmuted: true }, async (err, doc) => {
         uye.roles.remove(mutedRole).catch(() => { })
         message.delete()
         client.message(client.normalEmbed(`${uye} üyesinin metin kanallarında olan susturulması, ${msg.author} tarafından kaldırıldı.`, msg), msg.channel.id)
         client.react(msg, "tick")
        if (!doc) {
         if (client.channels.cache.get(chatMuteLog)) client.channels.cache.get(chatMuteLog).send(new MessageEmbed().setColor("GREEN").setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesinin metin kanallarında bulunan susturulması kaldırıldı.\n\n• Yetkili: ${msg.author} (\`${msg.author.id}\`)\n• Tarih: \`${moment(Date.now()).locale("TR").format("LLL")}\``))          
        } else {
         doc.chatmuted = false
         doc.save()   
         if (client.channels.cache.get(chatMuteLog)) client.channels.cache.get(chatMuteLog).send(new MessageEmbed().setColor("GREEN").setFooter(`Ceza Numarası: #${doc.cezaID}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesinin metin kanallarında bulunan susturulması kaldırıldı.\n\n• Mute Atılma: \`${moment(doc.date).locale("TR").format("LLL")}\`\n• Mute Bitiş: \`${moment(doc.finishDate).locale("TR").format("LLL")}\`\n• Süre: \`${doc.time}\`\n\n• Sebep: \`${doc.Reason}\``))         
        }
        })
       } else if (type === "VOICE MUTE") {
        await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id, voicemuted: true }, async (err, doc) => {
         message.delete() 
         client.react(msg, "tick")
         client.message(client.normalEmbed(`${uye} üyesinin ses susturulması, ${msg.author} tarafından kaldırıldı.`, msg), msg.channel.id)
        if (!doc) {   
         uye.voice.setMute(false)
         client.channels.cache.get(voiceMuteLog).send(new MessageEmbed().setColor("GREEN").setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesinin ses kanallarında bulunan susturulması kaldırıldı.\n\n• Tarih: \`${moment(Date.now()).locale("TR").format("LLL")}\`\n• Yetkili: ${msg.author} (\`${msg.author.id}\`)`))
        } else {
         doc.voicemuted = false
         doc.save()
        if (uye.voice.channel == undefined) {
         await VoiceUnmuteDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id, authorID: uye.id}, { $set: { unmutedurum: "Kaldırılamadı"} }, { upsert: true })
         let VoiceMuteData = await VoiceMuteDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})  
         if (VoiceMuteData) {
          VoiceMuteData.delete()
         }
         client.channels.cache.get(voiceMuteLog).send(new MessageEmbed().setColor("GREEN").setFooter(`Ceza Numarası: #${doc.cezaID}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesinin ses kanallarında bulunan susturulması kaldırılamadı. Üye sese bağlanınca kaldırılacak.\n\n• Mute Atılma: \`${moment(doc.date).locale('TR').format('LLL')}\`\n• Mute Bitiş: \`${moment(doc.finishDate).locale('TR').format('LLL')}\`\n• Süre: \`${doc.time}\`\n\n• Sebep: \`${doc.Reason}\``)) 
         } else if (uye.voice.channel) {
          uye.voice.setMute(false)
          let VoiceMuteData = await VoiceMuteDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})  
          if (VoiceMuteData) {
           VoiceMuteData.delete()
          }
          client.channels.cache.get(voiceMuteLog).send(new MessageEmbed().setColor("GREEN").setFooter(`Ceza Numarası: #${doc.cezaID}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesinin ses kanallarında bulunan susturulması kaldırıldı.\n\n• Mute Atılma: \`${moment(doc.date).locale('TR').format('LLL')}\`\n• Mute Bitiş: \`${moment(doc.finishDate).locale('TR').format('LLL')}\`\n• Süre: \`${doc.time}\`\n\n• Sebep: \`${doc.Reason}\``))
         }    
        }
        })
       } else if (type === "JAIL") {
        await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id, jail: true }, async (err, doc) => {
        await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id, jail3days: true }, async (err, doc2) => {
         message.delete()
         client.message(client.normalEmbed(`${uye} üyesinin cezalı rolü, ${msg.author} tarafından kaldırıldı.`, msg), msg.channel.id)
         client.react(msg, "tick")  
        if (!doc && !doc2) {
         client.setRoles(uye.id, unregisterRoles)
         if (client.channels.cache.get(jailLog)) client.channels.cache.get(jailLog).send(new MessageEmbed().setColor("GREEN").setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesinin cezalı rolü kaldırıldı.\n\n• Yetkili: ${msg.author} (\`${msg.author.id}\`)\n• Tarih: \`${moment(Date.now()).locale("TR").format("LLL")}\``))
         } else {  
        if (client.channels.cache.get(jailLog)) client.channels.cache.get(jailLog).send(new MessageEmbed().setColor("GREEN").setFooter(`Ceza Numarası: #${doc.cezaID}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesinin cezası kaldırıldı.\n\n• Ceza Atılma: \`${moment(doc.date).locale('TR').format('LLL')}\`\n• Ceza Bitiş: \`${moment(doc.finishDate).locale('TR').format('LLL')}\`\n• Süre: \`${doc.time}\`\n\n• Sebep: \`${doc.Reason}\``))
        let RolesData = await CezalıRolesDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
        let RolesDataExtra = await CezalıRolesDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
         doc.jail = false
         doc.save()
        if (RolesData && RolesData.roles) {
         setTimeout(() => {
         uye.roles.set(RolesData.roles).catch(() => { })
         RolesData.delete()
         }, 5000)
       } else {
        client.setRoles(uye.id, unregisterRoles)
       }
      if (doc2 && doc2.jail3days) {
       doc2.jail3days = false
       doc2.save()
      if (RolesDataExtra) {
       RolesDataExtra.delete()
             }
            }
           }
          })
         })
        }                                 
       }, 1)
      }      
     }     
    }   
  }}