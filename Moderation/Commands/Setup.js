module.exports = {
  conf: {
    aliases: [],
    name: "setup",
    usage: 'setup',
    description: 'yarrak.',
  },
  
  run: async ({client, msg, args, SetupDatabase, MessageEmbed, cfg, prefix, MessageButton}) => {
    
   let res = await SetupDatabase.findOne({guildID: msg.guild.id})
   let sec = args[0]
   let sec2 = args[1]
   let sec3 = args[2]
   let Embed = new MessageEmbed().setColor("RANDOM").setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true}))
   let OldEmbed = new MessageEmbed().setColor("RANDOM").setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true}))
   let NewEmbed = new MessageEmbed().setColor("RANDOM").setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true}))
   let NewEmbed2 = new MessageEmbed().setColor("RANDOM").setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true}))
   const filter = (reaction, user) => {return ["1102699813264441465"].includes(reaction.emoji.id) && user.id === msg.author.id;};
   let secArray = ["1 - Sunucu İsmi", "2 - Bot Ses Kanalı", "3 - Foto Chat", "4 - Kayıt Kanalları", "5 - Kayıt Kanalı İsmi", "6 - Yasaklı Tag Log Kanalı", "7 - Mesaj Log", "8 - Ses Log", "8 - Rol Log", "10 - Public Kategorisi", "11 - Chat Kanalı", "12 - Register Chat Kanalı", "13 - + 18 Ses Kanalı", "14 - + 18 Streamer Cezalı Log Kanalı", "15 - Tag Log Kanalı", "16 - Tag Ayrıcalıkları Kanalı", "17 - Streamer Denetim Kanalı", "18 - Chat Mute Log Kanalı", "19 - Ban Log Kanalı", "20 - Voice Mute Log Kanalı", "21 - Jail Log Kanalı", "22 - Ceza Puanı Log Kanalı", "23 - Leader Board Kanalı", "24 - Chat Stats Leader Board Mesaj ID", "25 - Voice Stats Leader Board Mesaj ID", "26 - Tagged Stats Leader Board Mesaj ID", "27 - Invite Stats Leader Board Mesaj ID", "28 - Register Stats Leader Board Mesaj ID", "29 - Bot Commands Kanalı", "30 - Yetki Saldı Log Kanalı", "31 - Komut Log Kanalı", "32 - Giriş-Çıkış Log Kanalı", "33 - İsim Log Kanalı", "34 - Yetki Atladı Log Kanalı", "35 - Kayıt Log Kanalı", "36 - Kayıt Kanalı Kategorisi", "37 - Sorun Çözme Kategorisi", "38 - Private Kategorisi", "39 - Alone Kategorisi", "40 - Streamer Kategorisi", "41 - Oyun Kanalı Kategorileri", "42 - Sleep Kanalı", "43 - Kayıt Etme Puanı", "44 - Kayıt Etme Coini", "45 - Tag Aldırma Puanı", "46 - Tag Aldırma Coini", "47 - Yetkili Rolleri", "48 - Taglı Üye Rolü", "49 - Sunucu Tagı", "50 - Sunucu Tagsız Üye Sembolü", "51 - Ban Hammer Rolü", "52 - Tüm Komutları Kullanabilecek Roller", "53 - Bot Commands Rolü", "54 - Yetki Verme Rolü", "55 - Voice Mute Rolü", "56 - Chat Mute Rolü", "57 - Jail Hammer Rolü", "58 - Move Rolü", "59 - Rol Alma Verme Rolü", "60 - Erkek Rolü", "61 - Kız Rolü", "62 - Booster Rolü", "63 - Vip Rolü", "64 - En Alt Yetkili Rolü", "65 - Yasaklı Tag Rolü", "66 - Kayıtsız Rolü", "67 - Yönetici Rolü", "68 - Cezalı Rolü", "69 - Yeni Hesap Rolü", "70 - Muted Rolü", "71 - Streamer Cezalı Rolü", "72 - Sponsor Rolü", "73 - Müzisyen Rolü", "74 - Durum", "75 - Status", "76 - Ban Limit", "77 - Jail Limit", "78 - Chat Mute Limit", "79 - Voice Mute Limit", "80 - Kayıt Limit", "81 - İsim Değiştirme Limit", "82 - Sıfırlama Log Kanalı", "83 - Oto Yetki Sistemini Açıp Kapatma", "84 - Oto Yetki Sistemine Dahil Edilmeyecek Roller", "85 - Oto Yetki Sisteminde Verilecek Roller", "86 - Davet Puanı", "87 - Davet Coini", "88 - Oto Tag", "89 - Kurallar Kanalı", "90 - Yeni Hesap Log Kanalı", "91 - Davet Log Kanalı", "92 - Seviye Log Kanalı", "93 - Hoş geldin mesajı sunucu ismi", "94 - Chat Guard Log", "95 - Spotify Engel", "96 - Caps Engel", "97 - Mesaj Limit Engel", "98 - Etiket Engel", "99 - Link Engel", "100 - Küfür Engel", "101 - Emoji Spam Engel", "102 - Spam Engel", "103 - Spotify Davet Engellenmeyen Kanallar", "104 - Caps Engellenmeyen Kanallar", "105 - Mesaj Limit Engellenmeyen Kanallar", "106 - Etiket Spam Engellenmeyen Kanallar", "107 - Link Engellenmeyen Kanallar", "108 - Küfür Engellenmeyen Kanallar", "109 - Emoji Spam Engellenmeyen Kanallar", "110 - Mesaj Limit", "111 - Link Limit", "112 - Spam Engellenmeyen Kanallar", "113 - Spam Limit", "114 - Caps Engel Limit", "115 - Etiket Spam Engel Limit", "116 - Mesaj Limit Engel Uyarı Sayısı", "117 - Küfür Engel Limit", "118 - Emoji Spam Engel Limit"]

   if (!sec) return client.message(client.normalEmbed(`Belirttiğiniz seçim geçerli değil lütfen aşağıdaki verilere göre komutu uygulayınız.\n\n${secArray.map(a => "\`"+a+"\`").join("\n")}\n\n\`Örnek kullanım:\n${prefix}setup 75 online\n${prefix}setup 1 Sunucu İsmi\n${prefix}setup 60 @Man\``, msg), msg.channel.id)
   if (sec === "1") {
    if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
    if (!sec2) return client.message(client.normalEmbed(`Bir sunucu ismi belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (Number(sec2)) return client.message(client.normalEmbed(`Geçerli bir sunucu ismi belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (!(res && res.guildName)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { guildName: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde sunucu ismini \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Sunucu ismi zaten ayarlı olarak görünüyor, belirttiğin isim ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("1102699813264441465").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "1102699813264441465") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { guildName: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde sunucu ismini \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))  
   } else if (sec === "2") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir ses kanalı belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "text") return client.message(client.normalEmbed(`Geçerli bir ses kanalı belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir ses kanalı belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.botVoiceChannel)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { botVoiceChannel: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde ses kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Ses kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("1102699813264441465").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "1102699813264441465") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { botVoiceChannel: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde ses kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "3") {
      if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
      let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
      if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
      if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
      if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
      if (!(res && res.fotoChat)) {
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { fotoChat: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde foto chat kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
       client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Kanal zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("1102699813264441465").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "1102699813264441465") {
        m.delete().catch(() => { })
        await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { fotoChat: channel.id } }, { upsert: true })
        client.message(client.normalEmbed(`Başarılı bir şekilde foto chat kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
        client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))      
    } else if (sec === "4") {
      if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
      let channels;
      if (msg.mentions.channels.size >= 1) {
       channels = msg.mentions.channels.map(r => r.id);
     } else {
      if (!channels) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)    
       channels = args.splice(0, 1).map(id => msg.guild.channels.cache.get(id)).filter(r => r != undefined);
     }  
     let durum = res && res.RegisterVoices ? res.RegisterVoices.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { RegisterVoices: channels } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde kayıt kanalını ${channels.map(a => `<#${a}>`)} olarak ayarladınız.`, msg), msg.channel.id)
       client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Kayıt kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("1102699813264441465").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "1102699813264441465") {
        m.delete().catch(() => { })
        await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { RegisterVoices: channels } }, { upsert: true })
        client.message(client.normalEmbed(`Başarılı bir şekilde kayıt kanalını ${channels.map(a => `<#${a}>`)} olarak güncellediniz.`, msg), msg.channel.id)
        client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))  
    } else if (sec === "5") {
      if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
      if (!sec2) return client.message(client.normalEmbed(`Bir kanal ismi belirt ve tekrardan dene!`, msg), msg.channel.id)
      if (Number(sec2)) return client.message(client.normalEmbed(`Geçerli bir kanal ismi belirt ve tekrardan dene!`, msg), msg.channel.id)
      if (!(res && res.RegisterVoiceName)) {
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { RegisterVoiceName: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde kayıt kanalı ismini \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
       client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Kayıt kanalı ismi zaten ayarlı olarak görünüyor, belirttiğin isim ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("1102699813264441465").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "1102699813264441465") {
        m.delete().catch(() => { })
        await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { RegisterVoiceName: sec2 } }, { upsert: true })
        client.message(client.normalEmbed(`Başarılı bir şekilde kayıt kanalı ismini \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
        client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))  
    } else if (sec === "6") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.bannedTagLog)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { bannedTagLog: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde yasaklı tag log kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Yasaklı tag log kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("1102699813264441465").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "1102699813264441465") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { bannedTagLog: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde yasaklı tag log kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "7") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.messageLog)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { messageLog: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde mesaj log kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Mesaj log kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("1102699813264441465").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "1102699813264441465") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { messageLog: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde mesaj log kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "8") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.voiceLog)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { voiceLog: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde ses log kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Ses log kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("1102699813264441465").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "1102699813264441465") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { voiceLog: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde ses log kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "9") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.rolLog)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { rolLog: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde rol log kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Rol log kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("1102699813264441465").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "1102699813264441465") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { rolLog: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde rol log kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "10") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kategori belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kategori belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "text") return client.message(client.normalEmbed(`Geçerli bir kategori belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.publicCategory)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { publicCategory: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde public kategorisini \`${channel.name}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Public kategorisi zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("1102699813264441465").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "1102699813264441465") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { publicCategory: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde public kategorisini \`${channel.name}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "11") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.chat)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { chat: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde chat kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Chat kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("1102699813264441465").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "1102699813264441465") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { chat: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde chat kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "12") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.registerChat)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { registerChat: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde register chat kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Register chat kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("1102699813264441465").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "1102699813264441465") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { registerChat: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde register chat kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "13") {
      if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
      let channels;
      if (msg.mentions.channels.size >= 1) {
       channels = msg.mentions.channels.map(r => r.id);
     } else {
      if (!channels) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)    
       channels = args.splice(0, 1).map(id => msg.guild.channels.cache.get(id)).filter(r => r != undefined);
     }  
     let durum = res && res.AgeLimits ? res.AgeLimits.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { AgeLimits: channels } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde + 18 ses kanalını ${channels.map(a => `<#${a}>`)} olarak ayarladınız.`, msg), msg.channel.id)
       client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`+ 18 Ses kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("1102699813264441465").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "1102699813264441465") {
        m.delete().catch(() => { })
        await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { AgeLimits: channels } }, { upsert: true })
        client.message(client.normalEmbed(`Başarılı bir şekilde + 18 ses kanalını ${channels.map(a => `<#${a}>`)} olarak güncellediniz.`, msg), msg.channel.id)
        client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))  
    } else if (sec === "14") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.streamerCezalıLog)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { streamerCezalıLog: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde streamer cezalı log kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Streamer cezalı log kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("1102699813264441465").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "1102699813264441465") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { streamerCezalıLog: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde streamer cezalı log kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "15") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.tagLog)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { tagLog: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde tag log kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Tag log kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("1102699813264441465").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "1102699813264441465") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { tagLog: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde tag log kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "16") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.tagAyrıcalıkları)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { tagAyrıcalıkları: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde tag ayrıcalıkları kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Tag ayrıcalıkları kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("1102699813264441465").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "1102699813264441465") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { tagAyrıcalıkları: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde tag ayrıcalıkları kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "17") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.streamerDenetim)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { streamerDenetim: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde streamer denetim kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Streamer denetim kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("1102699813264441465").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "1102699813264441465") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { streamerDenetim: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde streamer denetim kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "18") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.chatMuteLog)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { chatMuteLog: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde chat mute log kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Chat mute log kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("1102699813264441465").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "1102699813264441465") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { chatMuteLog: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde chat mute log kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "19") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.banLog)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { banLog: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde ban log kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Ban log kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("1102699813264441465").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "1102699813264441465") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { banLog: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde ban log kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "20") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.voiceMuteLog)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { voiceMuteLog: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde voice mute log kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Voice mute log kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("1102699813264441465").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "1102699813264441465") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { voiceMuteLog: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde voice mute log kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "21") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.jailLog)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { jailLog: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde jail log kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Jail log kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("1102699813264441465").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "1102699813264441465") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { jailLog: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde jail log kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "22") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.cezaPuanıLog)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { cezaPuanıLog: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde ceza puanı log kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Ceza puanı log kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("1102699813264441465").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "1102699813264441465") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { cezaPuanıLog: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde ceza puanı log kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "23") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.leaderBoard)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { leaderBoard: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde leader board kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Leader board kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { leaderBoard: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde leader board kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "24") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (!(res && res.leaderBoard)) return client.message(client.normalEmbed(`Henüz leader board kanalı kurulumunu yapmamışsın kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)
     try{let message = await msg.guild.channels.cache.get(res.leaderBoard).messages.fetch(sec2)}catch{return client.message(client.normalEmbed(`<#${res.leaderBoard}> kanalına yazılmış bir mesaj id gir ve tekrardan dene!`, msg), msg.channel.id)}
     if (!(res && res.chatStatsLeaderBoardMessageID)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { chatStatsLeaderBoardMessageID: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde mesaj id'sini \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Mesaj id'si zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { chatStatsLeaderBoardMessageID: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde mesaj id'sini \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "25") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (res && !res.leaderBoard) return client.message(client.normalEmbed(`Henüz leader board kanalı kurulumunu yapmamışsın kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)
     let message = await msg.guild.channels.cache.get(res.leaderBoard).messages.fetch(sec2)
     if (!message) return client.message(client.normalEmbed(`<#${res.leaderBoard}> kanalına yazılmış bir mesaj id gir ve tekrardan dene!`, msg), msg.channel.id)
     if (!(res && res.voiceStatsLeaderBoardMessageID)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { voiceStatsLeaderBoardMessageID: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde mesaj id'sini \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Nesaj id'si zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { voiceStatsLeaderBoardMessageID: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde mesaj id'sini \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "26") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (res && !res.leaderBoard) return client.message(client.normalEmbed(`Henüz leader board kanalı kurulumunu yapmamışsın kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)
     let message = await msg.guild.channels.cache.get(res.leaderBoard).messages.fetch(sec2)
     if (!message) return client.message(client.normalEmbed(`<#${res.leaderBoard}> kanalına yazılmış bir mesaj id gir ve tekrardan dene!`, msg), msg.channel.id)
     if (!(res && res.taggedStatsLeaderBoardMessageID)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { taggedStatsLeaderBoardMessageID: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde mesaj id'sini \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Mesaj id'si zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { taggedStatsLeaderBoardMessageID: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde mesaj id'sini \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "27") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (res && !res.leaderBoard) return client.message(client.normalEmbed(`Henüz leader board kanalı kurulumunu yapmamışsın kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)
     let message = await msg.guild.channels.cache.get(res.leaderBoard).messages.fetch(sec2)
     if (!message) return client.message(client.normalEmbed(`<#${res.leaderBoard}> kanalına yazılmış bir mesaj id gir ve tekrardan dene!`, msg), msg.channel.id)
     if (!(res && res.inviteStatsLeaderBoardMessageID)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { inviteStatsLeaderBoardMessageID: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde mesaj id'sini \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Mesaj id'si zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { inviteStatsLeaderBoardMessageID: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde mesaj id'sini \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "28") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (res && !res.leaderBoard) return client.message(client.normalEmbed(`Henüz leader board kanalı kurulumunu yapmamışsın kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)
     let message = await msg.guild.channels.cache.get(res.leaderBoard).messages.fetch(sec2)
     if (!message) return client.message(client.normalEmbed(`<#${res.leaderBoard}> kanalına yazılmış bir mesaj id gir ve tekrardan dene!`, msg), msg.channel.id)
     if (!(res && res.registerStatsLeaderBoardMessageID)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { registerStatsLeaderBoardMessageID: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde mesaj id'sini \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Register stats leader board mesaj id zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { registerStatsLeaderBoardMessageID: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde mesaj id'sini \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "29") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.botCommandsChannel)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { botCommandsChannel: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde bot commands kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Bot commands kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { botCommandsChannel: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde bot commands kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "30") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.AuthorityLeft)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { AuthorityLeft: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde yetki saldı kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Yetki saldı kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { AuthorityLeft: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde yetki saldı kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "31") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.commandsLog)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { commandsLog: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde komut log kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Komut log kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { commandsLog: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde komut log kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "32") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.joinLeaveLog)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { joinLeaveLog: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde giriş-çıkış log kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Giriş-Çıkış log kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { joinLeaveLog: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde giriş-çıkış log kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "33") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.nickNameLog)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { nickNameLog: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde isim log kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`İsim log kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { nickNameLog: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde isim log kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "34") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.yetkiUpLog)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { yetkiUpLog: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde yetki atladı log kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Yetki atladı log kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { yetkiUpLog: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde yetki atladı log kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "35") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.registerLog)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { registerLog: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde kayıt log kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Kayıt log kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { registerLog: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde kayıt log kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "36") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kategori belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kategori belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "text") return client.message(client.normalEmbed(`Geçerli bir kategori belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.registerCategory)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { registerCategory: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde register kategorisini \`${channel.name}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Register kategorisi zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { registerCategory: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde register kategorisini \`${channel.name}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "37") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kategori belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kategori belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "text") return client.message(client.normalEmbed(`Geçerli bir kategori belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.sorunÇözmeCategory)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { sorunÇözmeCategory: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde sorun çözme kategorisini \`${channel.name}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Sorun çözme kategorisi zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { sorunÇözmeCategory: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde sorun çözme kategorisini \`${channel.name}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "38") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kategori belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kategori belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "text") return client.message(client.normalEmbed(`Geçerli bir kategori belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.privateCategory)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { privateCategory: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde private kategorisini \`${channel.name}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Private kategorisi zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { privateCategory: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde private kategorisini \`${channel.name}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "39") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kategori belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kategori belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "text") return client.message(client.normalEmbed(`Geçerli bir kategori belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.aloneCategory)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { aloneCategory: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde alone kategorisini \`${channel.name}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Alone kategorisi zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { aloneCategory: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde alone kategorisini \`${channel.name}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "40") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kategori belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kategori belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "text") return client.message(client.normalEmbed(`Geçerli bir kategori belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.streamerCategory)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { streamerCategory: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde streamer kategorisini \`${channel.name}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Streamer kategorisi zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { streamerCategory: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde streamer kategorisini \`${channel.name}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "41") {
      if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
      let channels;
      if (msg.mentions.channels.size >= 1) {
       channels = msg.mentions.channels.map(r => r.id);
     } else {
      if (!channels) return client.message(client.normalEmbed(`Bir oyun kategorisi belirt ve tekrardan dene!`, msg), msg.channel.id)    
       channels = args.splice(0, 1).map(id => msg.guild.channels.cache.get(id)).filter(r => r != undefined);
     }  
     let durum = res && res.gameParents ? res.gameParents.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { gameParents: channels } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde oyun kategorilerini \`${channels.map(a => `${msg.guild.channels.cache.get(a).name}`)}\` olarak ayarladınız.`, msg), msg.channel.id)
       client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Oyun kategorileri zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
        m.delete().catch(() => { })
        await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { gameParents: channels } }, { upsert: true })
        client.message(client.normalEmbed(`Başarılı bir şekilde oyun kategorilerini \`${channels.map(a => `${msg.guild.channels.cache.get(a).name}`)}\` olarak güncellediniz.`, msg), msg.channel.id)
        client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))  
    } else if (sec === "42") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "text") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.sleepChannel)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { sleepChannel: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde sleep kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Sleep kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { sleepChannel: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde sleep kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "43") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (!Number(sec2)) return client.message(client.normalEmbed(`Geçerli bir puan belirt ve tekrardan dene!`, msg), msg.channel.id)
     let durum = res && res.autoPerm === true ? res.autoPerm : res.autoPerm === false ? res.autoPerm : ""
     if (!durum || durum === false) return client.message(client.normalEmbed(`Oto yetki sistemi kapalı olarak gözüküyor, oto yetki sistemini açmadan bu ayarı yapamazsın.`, msg), msg.channel.id)
     if (!(res && res.registerPuan)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { registerPuan: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde kayıt puanını \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Kayıt puanı zaten ayarlı olarak görünüyor, belirttiğin puan ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { registerPuan: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde kayıt puanını \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "44") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (!Number(sec2)) return client.message(client.normalEmbed(`Geçerli bir coin belirt ve tekrardan dene!`, msg), msg.channel.id)
     let durum = res && res.autoPerm === true ? res.autoPerm : res.autoPerm === false ? res.autoPerm : ""
     if (!durum || durum === false) return client.message(client.normalEmbed(`Oto yetki sistemi kapalı olarak gözüküyor, oto yetki sistemini açmadan bu ayarı yapamazsın.`, msg), msg.channel.id)
      if (!(res && res.registerCoin)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { registerCoin: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde kayıt coinini \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Kayıt coini zaten ayarlı olarak görünüyor, belirttiğin coin ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { registerCoin: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde kayıt coinini \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "45") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (!Number(sec2)) return client.message(client.normalEmbed(`Geçerli bir puan belirt ve tekrardan dene!`, msg), msg.channel.id)
     let durum = res && res.autoPerm === true ? res.autoPerm : res.autoPerm === false ? res.autoPerm : ""
     if (!durum || durum === false) return client.message(client.normalEmbed(`Oto yetki sistemi kapalı olarak gözüküyor, oto yetki sistemini açmadan bu ayarı yapamazsın.`, msg), msg.channel.id)
     if (!(res && res.taggedPuan)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { taggedPuan: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde tagged puanını \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Tagged puanı zaten ayarlı olarak görünüyor, belirttiğin puan ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { taggedPuan: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde tagged puanını \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "46") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (!Number(sec2)) return client.message(client.normalEmbed(`Geçerli bir coin belirt ve tekrardan dene!`, msg), msg.channel.id)
     let durum = res && res.autoPerm === true ? res.autoPerm : res.autoPerm === false ? res.autoPerm : ""
     if (!durum || durum === false) return client.message(client.normalEmbed(`Oto yetki sistemi kapalı olarak gözüküyor, oto yetki sistemini açmadan bu ayarı yapamazsın.`, msg), msg.channel.id)
     if (!(res && res.taggedCoin)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { taggedCoin: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde tagged coinini \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Tagged coini zaten ayarlı olarak görünüyor, belirttiğin coin ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { taggedCoin: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde tagged coinini \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "47") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let roles;
      if (msg.mentions.roles.size >= 1) {
       roles = msg.mentions.roles.map(r => r.id);
     } else {
      if (!roles) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)    
       roles = args.splice(0, 1).map(id => msg.guild.roles.cache.get(id)).filter(r => r != undefined);
     } 
     let durum = res && res.staffRoles ? res.staffRoles.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { staffRoles: roles } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde yetkili rollerini ${roles.map(a => `<@&${a}>`)} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Yetkili rolleri zaten ayarlı olarak görünüyor, belirttiğin roller ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { staffRoles: roles } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde yetkili rollerini ${roles.map(a => `<@&${a}>`)} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "48") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let role = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[1]);
     if (!role) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (!(res && res.taggedRole)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { taggedRole: role.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde taglı rolünü ${role} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Taglı rolü zaten ayarlı olarak görünüyor, belirttiğin rol ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { taggedRole: role.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde taglı rolünü ${role} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "49") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (Number(sec2)) return client.message(client.normalEmbed(`Geçerli bir tag belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (!(res && res.guildTag)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { guildTag: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde sunucu tagını \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Sunucu tagı zaten ayarlı olarak görünüyor, belirttiğin tag ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { guildTag: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde sunucu tagını \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "50") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (Number(sec2)) return client.message(client.normalEmbed(`Geçerli bir sembol belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (!(res && res.guildNoTag)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { guildNoTag: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde sunucu tagsız üye sembolünü \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Sunucu tagsız üye sembolü zaten ayarlı olarak görünüyor, belirttiğin sembol ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { guildNoTag: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde sunucu tagsız üye sembolünü \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "51") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let roles;
      if (msg.mentions.roles.size >= 1) {
       roles = msg.mentions.roles.map(r => r.id);
     } else {
      if (!roles) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)    
       roles = args.splice(0, 1).map(id => msg.guild.roles.cache.get(id)).filter(r => r != undefined);
     } 
     let durum = res && res.banHammerRoles ? res.banHammerRoles.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { banHammerRoles: roles } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde ban hammer rollerini ${roles.map(a => `<@&${a}>`)} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Ban hammer zaten ayarlı olarak görünüyor, belirttiğin roller ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { banHammerRoles: roles } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde ban hammer rollerini ${roles.map(a => `<@&${a}>`)} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "52") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let roles;
      if (msg.mentions.roles.size >= 1) {
       roles = msg.mentions.roles.map(r => r.id);
     } else {
      if (!roles) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)    
       roles = args.splice(0, 1).map(id => msg.guild.roles.cache.get(id)).filter(r => r != undefined);
     } 
     let durum = res && res.allCommandsTrue ? res.allCommandsTrue.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { allCommandsTrue: roles } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde tüm komutları kullanabilecek rolleri ${roles.map(a => `<@&${a}>`)} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Tüm komutları kullanabilecek roller zaten ayarlı olarak görünüyor, belirttiğin roller ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { allCommandsTrue: roles } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde tüm komutları kullanabilecek rolleri ${roles.map(a => `<@&${a}>`)} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "53") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let roles;
      if (msg.mentions.roles.size >= 1) {
       roles = msg.mentions.roles.map(r => r.id);
     } else {
      if (!roles) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)    
       roles = args.splice(0, 1).map(id => msg.guild.roles.cache.get(id)).filter(r => r != undefined);
     } 
     let durum = res && res.botCommandsRoles ? res.botCommandsRoles.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { botCommandsRoles: roles } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde bot commands rollerini ${roles.map(a => `<@&${a}>`)} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Bot commands rolleri zaten ayarlı olarak görünüyor, belirttiğin roller ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { botCommandsRoles: roles } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde bot commands rollerini ${roles.map(a => `<@&${a}>`)} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "54") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let roles;
      if (msg.mentions.roles.size >= 1) {
       roles = msg.mentions.roles.map(r => r.id);
     } else {
      if (!roles) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)    
       roles = args.splice(0, 1).map(id => msg.guild.roles.cache.get(id)).filter(r => r != undefined);
     } 
     let durum = res && res.staffRolesAddTrue ? res.staffRolesAddTrue.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { staffRolesAddTrue: roles } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde yetki verebilecek olan rolleri ${roles.map(a => `<@&${a}>`)} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Yetki verebilecek roller zaten ayarlı olarak görünüyor, belirttiğin roller ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { staffRolesAddTrue: roles } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde yetki verebilecek olan rolleri ${roles.map(a => `<@&${a}>`)} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "55") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let roles;
      if (msg.mentions.roles.size >= 1) {
       roles = msg.mentions.roles.map(r => r.id);
     } else {
      if (!roles) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)    
       roles = args.splice(0, 1).map(id => msg.guild.roles.cache.get(id)).filter(r => r != undefined);
     } 
     let durum = res && res.voiceMuteRoles ? res.voiceMuteRoles.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { voiceMuteRoles: roles } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde ses mute atabilecek rolleri ${roles.map(a => `<@&${a}>`)} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Ses mute atabilecek roller zaten ayarlı olarak görünüyor, belirttiğin roller ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { voiceMuteRoles: roles } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde ses mute atabilecek rolleri ${roles.map(a => `<@&${a}>`)} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "56") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let roles;
      if (msg.mentions.roles.size >= 1) {
       roles = msg.mentions.roles.map(r => r.id);
     } else {
      if (!roles) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)    
       roles = args.splice(0, 1).map(id => msg.guild.roles.cache.get(id)).filter(r => r != undefined);
     } 
     let durum = res && res.chatMuteRoles ? res.chatMuteRoles.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { chatMuteRoles: roles } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde chat mute atabilecek rolleri ${roles.map(a => `<@&${a}>`)} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Chat mute atabilecek roller zaten ayarlı olarak görünüyor, belirttiğin roller ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { chatMuteRoles: roles } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde chat mute atabilecek rolleri ${roles.map(a => `<@&${a}>`)} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "57") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let roles;
      if (msg.mentions.roles.size >= 1) {
       roles = msg.mentions.roles.map(r => r.id);
     } else {
      if (!roles) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)    
       roles = args.splice(0, 1).map(id => msg.guild.roles.cache.get(id)).filter(r => r != undefined);
     } 
     let durum = res && res.jailRoles ? res.jailRoles.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { jailRoles: roles } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde jail atabilecek rolleri ${roles.map(a => `<@&${a}>`)} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Jail atabilecek roller zaten ayarlı olarak görünüyor, belirttiğin roller ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { jailRoles: roles } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde jail atabilecek rolleri ${roles.map(a => `<@&${a}>`)} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "58") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let roles;
      if (msg.mentions.roles.size >= 1) {
       roles = msg.mentions.roles.map(r => r.id);
     } else {
      if (!roles) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)    
       roles = args.splice(0, 1).map(id => msg.guild.roles.cache.get(id)).filter(r => r != undefined);
     } 
     let durum = res && res.moveRoles ? res.moveRoles.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { moveRoles: roles } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde move rollerini ${roles.map(a => `<@&${a}>`)} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Move rolü zaten ayarlı olarak görünüyor, belirttiğin roller ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { moveRoles: roles } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde move rollerini ${roles.map(a => `<@&${a}>`)} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "59") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let roles;
      if (msg.mentions.roles.size >= 1) {
       roles = msg.mentions.roles.map(r => r.id);
     } else {
      if (!roles) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)    
       roles = args.splice(0, 1).map(id => msg.guild.roles.cache.get(id)).filter(r => r != undefined);
     } 
     let durum = res && res.roleAddRemoveRoles ? res.roleAddRemoveRoles.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { roleAddRemoveRoles: roles } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde rol alıp verebilecek olan rolleri ${roles.map(a => `<@&${a}>`)} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Rol alıp verebilecek olan roller zaten ayarlı olarak görünüyor, belirttiğin roller ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { roleAddRemoveRoles: roles } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde rol alıp verebilecek olan rolleri ${roles.map(a => `<@&${a}>`)} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "60") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let roles;
      if (msg.mentions.roles.size >= 1) {
       roles = msg.mentions.roles.map(r => r.id);
     } else {
      if (!roles) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)    
       roles = args.splice(0, 1).map(id => msg.guild.roles.cache.get(id)).filter(r => r != undefined);
     } 
     let durum = res && res.manRoles ? res.manRoles.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { manRoles: roles } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde erkek rollerini ${roles.map(a => `<@&${a}>`)} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Erkek rolleri zaten ayarlı olarak görünüyor, belirttiğin roller ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { manRoles: roles } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde erkek rollerini ${roles.map(a => `<@&${a}>`)} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "61") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let roles;
      if (msg.mentions.roles.size >= 1) {
       roles = msg.mentions.roles.map(r => r.id);
     } else {
      if (!roles) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)    
       roles = args.splice(0, 1).map(id => msg.guild.roles.cache.get(id)).filter(r => r != undefined);
     } 
     let durum = res && res.ladyRoles ? res.ladyRoles.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { ladyRoles: roles } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde kız rollerini ${roles.map(a => `<@&${a}>`)} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Kız rolleri zaten ayarlı olarak görünüyor, belirttiğin roller ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { ladyRoles: roles } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde kız rollerini ${roles.map(a => `<@&${a}>`)} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "62") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let role = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[1]);
     if (!role) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (!(res && res.boosterRole)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { boosterRole: role.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde booster rolünü ${role} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Booster rolü zaten ayarlı olarak görünüyor, belirttiğin rol ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { boosterRole: role.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde booster rolünü ${role} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "63") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let role = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[1]);
     if (!role) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (!(res && res.vipRole)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { vipRole: role.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde vip rolünü ${role} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Vip rolü zaten ayarlı olarak görünüyor, belirttiğin rol ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { vipRole: role.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde vip rolünü ${role} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "64") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let role = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[1]);
     if (!role) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (!(res && res.minStaffRole)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { minStaffRole: role.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde en alt yetkili rolünü ${role} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`En alt yetkili rolü zaten ayarlı olarak görünüyor, belirttiğin rol ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { minStaffRole: role.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde en alt yetkili rolünü ${role} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "65") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let role = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[1]);
     if (!role) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (!(res && res.bannedTagRole)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { bannedTagRole: role.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde yasaklı tag rolünü ${role} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Yasaklı tag rolü zaten ayarlı olarak görünüyor, belirttiğin rol ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { bannedTagRole: role.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde yasaklı tag rolünü ${role} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "66") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let roles;
      if (msg.mentions.roles.size >= 1) {
       roles = msg.mentions.roles.map(r => r.id);
     } else {
      if (!roles) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)    
       roles = args.splice(0, 1).map(id => msg.guild.roles.cache.get(id)).filter(r => r != undefined);
     } 
     let durum = res && res.unregisterRoles ? res.unregisterRoles.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { unregisterRoles: roles } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde kayıtsız rollerini ${roles.map(a => `<@&${a}>`)} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Kayıtsız rolleri zaten ayarlı olarak görünüyor, belirttiğin roller ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { unregisterRoles: roles } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde kayıtsız rollerini ${roles.map(a => `<@&${a}>`)} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "67") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let role = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[1]);
     if (!role) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (!(res && res.adminRole)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { adminRole: role.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde yönetici rolünü ${role} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Yönetici rolü zaten ayarlı olarak görünüyor, belirttiğin rol ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { adminRole: role.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde yönetici rolünü ${role} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "68") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let role = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[1]);
     if (!role) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (!(res && res.punitiveRole)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { punitiveRole: role.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde cezalı rolünü ${role} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Cezalı rolü zaten ayarlı olarak görünüyor, belirttiğin rol ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { punitiveRole: role.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde cezalı rolünü ${role} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "69") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let role = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[1]);
     if (!role) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (!(res && res.newAccRole)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { newAccRole: role.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde yeni hesap rolünü ${role} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Yeni hesap rolü zaten ayarlı olarak görünüyor, belirttiğin rol ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { newAccRole: role.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde yeni hesap rolünü ${role} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "70") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let role = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[1]);
     if (!role) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (!(res && res.mutedRole)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { mutedRole: role.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde muted rolünü ${role} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Muted rolü zaten ayarlı olarak görünüyor, belirttiğin rol ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { mutedRole: role.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde muted rolünü ${role} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "71") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let role = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[1]);
     if (!role) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (!(res && res.streamerPunishedRole)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { streamerPunishedRole: role.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde streamer cezalı rolünü ${role} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Streamer cezalı rolü zaten ayarlı olarak görünüyor, belirttiğin rol ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { streamerPunishedRole: role.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde streamer cezalı rolünü ${role} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "72") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let role = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[1]);
     if (!role) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (!(res && res.sponsorRole)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { sponsorRole: role.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde sponsor rolünü ${role} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Sponsor cezalı rolü zaten ayarlı olarak görünüyor, belirttiğin rol ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { sponsorRole: role.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde streamer sponsor rolünü ${role} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "73") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let role = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[1]);
     if (!role) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (!(res && res.musicianRole)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { musicianRole: role.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde müzisyen rolünü ${role} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Müzisyen rolü zaten ayarlı olarak görünüyor, belirttiğin rol ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { musicianRole: role.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde müzisyen rolünü ${role} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "74") {
     if (!cfg.Bot.Owners.includes(msg.author.id)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (!(res && res.durum)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { durum: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde botun durumunu \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Durum zaten ayarlı olarak görünüyor, belirttiğin durum ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { durum: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde botun durumunu \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "75") {
     if (!cfg.Bot.Owners.includes(msg.author.id)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (sec2 === "dnd" || sec2 === "online" || sec2 === "invisible" || sec2 === "idle") {
     if (!(res && res.status)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { status: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde botun statusunu \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Status zaten ayarlı olarak görünüyor, belirttiğin status ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { status: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde botun statusunu \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red")))) 
     } else return client.message(client.normalEmbed(`Lütfen geçerli bir durum türü seçip tekrar dene!\n\n${cfg.Emoji.Idle} - (\`idle\`)\n${cfg.Emoji.Dnd} - (\`dnd\`)\n${cfg.Emoji.Online} - (\`online\`)\n${cfg.Emoji.Offline} - (\`invisible\`)`, msg), msg.channel.id)
    } else if (sec === "76") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (!(res && res.banLimit)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { banLimit: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde ban limitini \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Limit zaten ayarlı olarak görünüyor, belirttiğin limit ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { banLimit: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde ban limitini \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red")))) 
    } else if (sec === "77") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (!(res && res.jailLimit)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { jailLimit: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde jail limitini \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Limit zaten ayarlı olarak görünüyor, belirttiğin limit ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { jailLimit: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde jail limitini \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red")))) 
    } else if (sec === "78") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (!(res && res.chatMuteLimit)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { chatMuteLimit: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde chat mute limitini \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Limit zaten ayarlı olarak görünüyor, belirttiğin limit ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { chatMuteLimit: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde chat mute limitini \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red")))) 
    } else if (sec === "79") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (!(res && res.voiceMuteLimit)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { voiceMuteLimit: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde voice mute limitini \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Limit zaten ayarlı olarak görünüyor, belirttiğin limit ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { voiceMuteLimit: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde voice mute limitini \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red")))) 
    } else if (sec === "80") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (!(res && res.registerLimit)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { registerLimit: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde kayıt limitini \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Limit zaten ayarlı olarak görünüyor, belirttiğin limit ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { registerLimit: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde kayıt limitini \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red")))) 
    } else if (sec === "81") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (!(res && res.changeNameLimit)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { changeNameLimit: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde isim değiştirme limitini \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Limit zaten ayarlı olarak görünüyor, belirttiğin limit ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { changeNameLimit: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde isim değiştirme limitini \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red")))) 
    } else if (sec === "82") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (!(res && res.veriResetLog)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { veriResetLog: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde sıfırlama log kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Kanal zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { veriResetLog: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde sıfırlama log kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red")))) 
    } else if (sec === "83") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000)      
     if (!sec2) return client.message(client.normalEmbed(`Bir seçim belirt ve tekrardan dene!`, msg), msg.channel.id)
     let durum = res && res.autoPerm === true ? res.autoPerm : res.autoPerm === false ? res.autoPerm : ""
     
     if (sec2 === "aç" || sec2 === "on") { 
      if (durum === true) return client.message(client.normalEmbed(`Oto yetki sistemi zaten açık olarak gözüküyor.`, msg), msg.channel.id)
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { autoPerm: true } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde oto yetki sistemini açtınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else if (sec2 === "kapat" || sec2 === "off") { 
      if (durum === false) return client.message(client.normalEmbed(`Oto yetki sistemi zaten kapalı olarak gözüküyor.`, msg), msg.channel.id)
      res.autoPerm = false
      res.save()
      client.message(client.normalEmbed(`Başarılı bir şekilde oto yetki sistemini kapattınız.`, msg), msg.channel.id)
      client.react(msg, "tick")       
     } else return client.message(client.normalEmbed(`Geçerli bir seçim belirt ve tekrardan dene! (\`aç/kapat\`)`, msg), msg.channel.id)
    } else if (sec === "84") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let roles;
      if (msg.mentions.roles.size >= 1) {
       roles = msg.mentions.roles.map(r => r.id);
     } else {
      if (!roles) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id)    
       roles = args.splice(0, 1).map(id => msg.guild.roles.cache.get(id)).filter(r => r != undefined);
     } 
     let durum = res && res.noAutoPerm ? res.noAutoPerm.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { noAutoPerm: roles } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde oto yetki sistemine dahil edilmeyecek rolleri ${roles.map(a => `<@&${a}>`)} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Oto yetki sistemine dahil edilmeyecek roller zaten ayarlı olarak görünüyor, belirttiğin roller ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { noAutoPerm: roles } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde oto yetki sistemine dahil edilmeyecek rolleri ${roles.map(a => `<@&${a}>`)} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "85") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     
     if (sec2 === "ekle" || sec2 === "add") {
      if (!sec3 || isNaN(sec3)) return client.message(client.normalEmbed(`Geçerli bir puan belirt ve tekrardan dene!`, msg), msg.channel.id)
      if (client.puanData.some(a => a.puan === parseInt(sec3))) return client.message(client.normalEmbed(`**${ parseInt(sec3)}** coin sayısına ulaşınca verilecek rol zaten ayarlı!`, msg), msg.channel.id)
      const roles = msg.mentions.roles.array();
      if (!roles || !roles.length) return client.message(client.normalEmbed(`Eklenecek rolleri belirt ve tekrardan dene!`, msg), msg.channel.id)
      res.autoAuthorizationRoles.push({ role: roles.map(b => b.id), puan: parseInt(sec3) })
      res.save()
      client.message(client.normalEmbed(`**${ parseInt(sec3)}** puan sayısına ulaşınca ${roles.map(c => `<@&${c.id}>`).join(", ")} rolleri verilmek üzere başarıyla ayarlandı!`, msg), msg.channel.id)
    } else if (sec2 === "sil" || sec2 === "delete") {
      if (!sec3|| isNaN(sec3)) return client.message(client.normalEmbed(`Geçerli bir puan belirt ve tekrardan dene!`, msg), msg.channel.id)
      let doc = res && res.autoAuthorizationRoles ? res.autoAuthorizationRoles : []
      if (!client.puanData.some(a => a.puan === parseInt(sec3))) return client.message(client.normalEmbed(`Belirttiğin puana ait bir veri bulamıyorum!`, msg), msg.channel.id)
      res.autoAuthorizationRoles = res.autoAuthorizationRoles.filter(b => b.puan != (parseInt(sec3) || parseInt(sec3)));
      res.save()
      client.message(client.normalEmbed(`**${parseInt(sec3)}** puan sayısına gelince verilecek roller başarıyla silindi!`, msg), msg.channel.id)    
    } else if (sec2 === "temizle" || sec2 === "allDelete" || sec2 === "allSil" || sec2 === "allTemizle") {
      let doc = res && res.autoAuthorizationRoles ? res.autoAuthorizationRoles : []
      if (doc.length === 0) return client.message(client.normalEmbed(`Veritabanında zaten veri yok.`, msg), msg.channel.id)
      res.autoAuthorizationRoles = []
      res.save()
      client.message(client.normalEmbed(`Sistemde bulunan rollerin ve puanların tümü başarıyla silindi.`, msg), msg.channel.id)
    } else if (sec2 === "liste" || sec2 === "list") {
      let doc = res && res.autoAuthorizationRoles ? res.autoAuthorizationRoles : []
      if (doc.length === 0) return client.message(client.normalEmbed(`Veritabanında listelenecek veri bulamıyorum.`, msg), msg.channel.id)
      client.message(client.normalEmbed(`${res.autoAuthorizationRoles.sort((a, b) => a.puan - b.puan).map((a) => `${a.role.length === 1 ? `Rol` : `Roller`}: ${a.role.length === 1 ? `<@&${a.role}>` : a.role.map(b => `<@&${b}>`)} - Gereken Puan: \`${a.puan}\``).join("\n")}`, msg), msg.channel.id);
    }
      
    } else if (sec === "86") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (!Number(sec2)) return client.message(client.normalEmbed(`Geçerli bir puan belirt ve tekrardan dene!`, msg), msg.channel.id)
     let durum = res && res.autoPerm === true ? res.autoPerm : res.autoPerm === false ? res.autoPerm : ""
     if (!durum || durum === false) return client.message(client.normalEmbed(`Oto yetki sistemi kapalı olarak gözüküyor, oto yetki sistemini açmadan bu ayarı yapamazsın.`, msg), msg.channel.id)
     if (!(res && res.invitePuan)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { invitePuan: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde invite puanını \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Invite puanı zaten ayarlı olarak görünüyor, belirttiğin puan ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { invitePuan: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde invite puanını \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "87") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (!Number(sec2)) return client.message(client.normalEmbed(`Geçerli bir coin belirt ve tekrardan dene!`, msg), msg.channel.id)
     let durum = res && res.autoPerm === true ? res.autoPerm : res.autoPerm === false ? res.autoPerm : ""
     if (!durum || durum === false) return client.message(client.normalEmbed(`Oto yetki sistemi kapalı olarak gözüküyor, oto yetki sistemini açmadan bu ayarı yapamazsın.`, msg), msg.channel.id)
      if (!(res && res.inviteCoin)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { inviteCoin: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde invite coinini \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Invite coini zaten ayarlı olarak görünüyor, belirttiğin coin ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { inviteCoin: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde invite coinini \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "88") {
     let otoTag = args.slice(1).join(' ') 
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (Number(otoTag)) return client.message(client.normalEmbed(`Geçerli bir oto tag belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (!(res && res.otoTag)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { otoTag: otoTag } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde oto tagı \`${otoTag}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Oto tag zaten ayarlı olarak görünüyor, belirttiğin tag ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { otoTag: otoTag } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde oto tagı \`${otoTag}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "89") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.rules)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { rules: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde kurallar kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Kurallar kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { rules: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde kurallar kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "90") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.newAccLog)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { newAccLog: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde yeni hesap log kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Yeni hesap log kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { newAccLog: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde yeni hesap log kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "91") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.inviteLog)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { inviteLog: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde invite log kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Invite log kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { inviteLog: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde invite log kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "92") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.levelLog)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { levelLog: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde seviye log kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Seviye log kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { levelLog: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde seviye log kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "93") {
     let name = args.slice(1).join(' ') 
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (Number(name)) return client.message(client.normalEmbed(`Geçerli bir hoş geldin mesajı sunucu ismi belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (!(res && res.welcomeMessageGuildName)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { welcomeMessageGuildName: name } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde hoş geldin mesajı sunucu ismini \`${name}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Hoş geldin mesajı sunucu ismi zaten ayarlı olarak görünüyor, belirttiğin tag ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { welcomeMessageGuildName: name } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde hoş geldin mesajı sunucu ismini \`${name}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "94") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1]);
     if (!channel) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)
     if (client.channels.cache.get(channel.id).type === "voice") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)   
     if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Geçerli bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id) 
     if (!(res && res.chatGuardLog)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { chatGuardLog: channel.id } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde chat guard log kanalını ${channel} olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Chat guard log kanalı zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { chatGuardLog: channel.id } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde chat guard log kanalını ${channel} olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))     
    } else if (sec === "95") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000)      
     if (!sec2) return client.message(client.normalEmbed(`Bir seçim belirt ve tekrardan dene!`, msg), msg.channel.id)
     let durum = res && res.spotifyMode === true ? res.spotifyMode : res.spotifyMode === false ? res.spotifyMode : ""
     
     if (sec2 === "aç" || sec2 === "on") { 
      if (durum === true) return client.message(client.normalEmbed(`Spotify engel sistemi zaten açık olarak gözüküyor.`, msg), msg.channel.id)
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { spotifyMode: true } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde spotify engel sistemini açtınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else if (sec2 === "kapat" || sec2 === "off") { 
      if (durum === false) return client.message(client.normalEmbed(`Spotify engel sistemi zaten kapalı olarak gözüküyor.`, msg), msg.channel.id)
      res.spotifyMode = false
      res.save()
      client.message(client.normalEmbed(`Başarılı bir şekilde spotify engel sistemini kapattınız.`, msg), msg.channel.id)
      client.react(msg, "tick")       
     } else return client.message(client.normalEmbed(`Geçerli bir seçim belirt ve tekrardan dene! (\`aç/kapat\`)`, msg), msg.channel.id)
    } else if (sec === "96") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000)      
     if (!sec2) return client.message(client.normalEmbed(`Bir seçim belirt ve tekrardan dene!`, msg), msg.channel.id)
     let durum = res && res.capsMode === true ? res.capsMode : res.capsMode === false ? res.capsMode : ""
     
     if (sec2 === "aç" || sec2 === "on") { 
      if (durum === true) return client.message(client.normalEmbed(`Caps engel sistemi zaten açık olarak gözüküyor.`, msg), msg.channel.id)
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { capsMode: true } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde caps engel sistemini açtınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else if (sec2 === "kapat" || sec2 === "off") { 
      if (durum === false) return client.message(client.normalEmbed(`Caps engel sistemi zaten kapalı olarak gözüküyor.`, msg), msg.channel.id)
      res.capsMode = false
      res.save()
      client.message(client.normalEmbed(`Başarılı bir şekilde caps engel sistemini kapattınız.`, msg), msg.channel.id)
      client.react(msg, "tick")       
     } else return client.message(client.normalEmbed(`Geçerli bir seçim belirt ve tekrardan dene! (\`aç/kapat\`)`, msg), msg.channel.id)
    } else if (sec === "97") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000)      
     if (!sec2) return client.message(client.normalEmbed(`Bir seçim belirt ve tekrardan dene!`, msg), msg.channel.id)
     let durum = res && res.msgLimitMode === true ? res.msgLimitMode : res.msgLimitMode === false ? res.msgLimitMode : ""
     
     if (sec2 === "aç" || sec2 === "on") { 
      if (durum === true) return client.message(client.normalEmbed(`Mesaj limit engel sistemi zaten açık olarak gözüküyor.`, msg), msg.channel.id)
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { msgLimitMode: true } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde mesaj limit engel sistemini açtınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else if (sec2 === "kapat" || sec2 === "off") { 
      if (durum === false) return client.message(client.normalEmbed(`Mesaj limit engel sistemi zaten kapalı olarak gözüküyor.`, msg), msg.channel.id)
      res.msgLimitMode = false
      res.save()
      client.message(client.normalEmbed(`Başarılı bir şekilde mesaj limit engel sistemini kapattınız.`, msg), msg.channel.id)
      client.react(msg, "tick")       
     } else return client.message(client.normalEmbed(`Geçerli bir seçim belirt ve tekrardan dene! (\`aç/kapat\`)`, msg), msg.channel.id)
    } else if (sec === "98") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000)      
     if (!sec2) return client.message(client.normalEmbed(`Bir seçim belirt ve tekrardan dene!`, msg), msg.channel.id)
     let durum = res && res.tagMode === true ? res.tagMode : res.tagMode === false ? res.tagMode : ""
     
     if (sec2 === "aç" || sec2 === "on") { 
      if (durum === true) return client.message(client.normalEmbed(`Etiket engel sistemi zaten açık olarak gözüküyor.`, msg), msg.channel.id)
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { tagMode: true } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde etiket engel sistemini açtınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else if (sec2 === "kapat" || sec2 === "off") { 
      if (durum === false) return client.message(client.normalEmbed(`Etiket engel sistemi zaten kapalı olarak gözüküyor.`, msg), msg.channel.id)
      res.tagMode = false
      res.save()
      client.message(client.normalEmbed(`Başarılı bir şekilde etiket engel sistemini kapattınız.`, msg), msg.channel.id)
      client.react(msg, "tick")       
     } else return client.message(client.normalEmbed(`Geçerli bir seçim belirt ve tekrardan dene! (\`aç/kapat\`)`, msg), msg.channel.id)
    } else if (sec === "99") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000)      
     if (!sec2) return client.message(client.normalEmbed(`Bir seçim belirt ve tekrardan dene!`, msg), msg.channel.id)
     let durum = res && res.linkMode === true ? res.linkMode : res.linkMode === false ? res.linkMode : ""
     
     if (sec2 === "aç" || sec2 === "on") { 
      if (durum === true) return client.message(client.normalEmbed(`Link engel sistemi zaten açık olarak gözüküyor.`, msg), msg.channel.id)
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { linkMode: true } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde link engel sistemini açtınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else if (sec2 === "kapat" || sec2 === "off") { 
      if (durum === false) return client.message(client.normalEmbed(`Link engel sistemi zaten kapalı olarak gözüküyor.`, msg), msg.channel.id)
      res.linkMode = false
      res.save()
      client.message(client.normalEmbed(`Başarılı bir şekilde link engel sistemini kapattınız.`, msg), msg.channel.id)
      client.react(msg, "tick")       
     } else return client.message(client.normalEmbed(`Geçerli bir seçim belirt ve tekrardan dene! (\`aç/kapat\`)`, msg), msg.channel.id)
    } else if (sec === "100") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000)      
     if (!sec2) return client.message(client.normalEmbed(`Bir seçim belirt ve tekrardan dene!`, msg), msg.channel.id)
     let durum = res && res.swearMode === true ? res.swearMode : res.swearMode === false ? res.swearMode : ""
     
     if (sec2 === "aç" || sec2 === "on") { 
      if (durum === true) return client.message(client.normalEmbed(`Küfür engel sistemi zaten açık olarak gözüküyor.`, msg), msg.channel.id)
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { swearMode: true } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde küfür engel sistemini açtınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else if (sec2 === "kapat" || sec2 === "off") { 
      if (durum === false) return client.message(client.normalEmbed(`Küfür engel sistemi zaten kapalı olarak gözüküyor.`, msg), msg.channel.id)
      res.swearMode = false
      res.save()
      client.message(client.normalEmbed(`Başarılı bir şekilde küfür engel sistemini kapattınız.`, msg), msg.channel.id)
      client.react(msg, "tick")       
     } else return client.message(client.normalEmbed(`Geçerli bir seçim belirt ve tekrardan dene! (\`aç/kapat\`)`, msg), msg.channel.id)
    } else if (sec === "101") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000)      
     if (!sec2) return client.message(client.normalEmbed(`Bir seçim belirt ve tekrardan dene!`, msg), msg.channel.id)
     let durum = res && res.emojiMode === true ? res.emojiMode : res.emojiMode === false ? res.emojiMode : ""
     
     if (sec2 === "aç" || sec2 === "on") { 
      if (durum === true) return client.message(client.normalEmbed(`Emoji spam engel sistemi zaten açık olarak gözüküyor.`, msg), msg.channel.id)
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { emojiMode: true } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde emoji spam engel sistemini açtınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else if (sec2 === "kapat" || sec2 === "off") { 
      if (durum === false) return client.message(client.normalEmbed(`Emoji spam engel sistemi zaten kapalı olarak gözüküyor.`, msg), msg.channel.id)
      res.emojiMode = false
      res.save()
      client.message(client.normalEmbed(`Başarılı bir şekilde emoji spam engel sistemini kapattınız.`, msg), msg.channel.id)
      client.react(msg, "tick")       
     } else return client.message(client.normalEmbed(`Geçerli bir seçim belirt ve tekrardan dene! (\`aç/kapat\`)`, msg), msg.channel.id)
    } else if (sec === "102") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000)      
     if (!sec2) return client.message(client.normalEmbed(`Bir seçim belirt ve tekrardan dene!`, msg), msg.channel.id)
     let durum = res && res.spamMode === true ? res.spamMode : res.spamMode === false ? res.spamMode : ""
     
     if (sec2 === "aç" || sec2 === "on") { 
      if (durum === true) return client.message(client.normalEmbed(`Spam engel sistemi zaten açık olarak gözüküyor.`, msg), msg.channel.id)
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { spamMode: true } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde spam engel sistemini açtınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else if (sec2 === "kapat" || sec2 === "off") { 
      if (durum === false) return client.message(client.normalEmbed(`Spam engel sistemi zaten kapalı olarak gözüküyor.`, msg), msg.channel.id)
      res.spamMode = false
      res.save()
      client.message(client.normalEmbed(`Başarılı bir şekilde spam engel sistemini kapattınız.`, msg), msg.channel.id)
      client.react(msg, "tick")       
     } else return client.message(client.normalEmbed(`Geçerli bir seçim belirt ve tekrardan dene! (\`aç/kapat\`)`, msg), msg.channel.id)
    } else if (sec === "103") {
      if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
      let channels;
      if (msg.mentions.channels.size >= 1) {
       channels = msg.mentions.channels.map(r => r.id);
     } else {
      if (!channels) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)    
       channels = args.splice(0, 1).map(id => msg.guild.channels.cache.get(id)).filter(r => r != undefined);
     }  
     let durum = res && res.spotifyTrue ? res.spotifyTrue.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { spotifyTrue: channels } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde spotify davet engellenmeyen kanalları ${channels.map(a => `<#${a}>`)} olarak ayarladınız.`, msg), msg.channel.id)
       client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Kanal zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
        m.delete().catch(() => { })
        await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { spotifyTrue: channels } }, { upsert: true })
        client.message(client.normalEmbed(`Başarılı bir şekilde spotify davet engellenmeyen kanalları ${channels.map(a => `<#${a}>`)} olarak güncellediniz.`, msg), msg.channel.id)
        client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))  
    } else if (sec === "104") {
      if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
      let channels;
      if (msg.mentions.channels.size >= 1) {
       channels = msg.mentions.channels.map(r => r.id);
     } else {
      if (!channels) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)    
       channels = args.splice(0, 1).map(id => msg.guild.channels.cache.get(id)).filter(r => r != undefined);
     }  
     let durum = res && res.capsTrue ? res.capsTrue.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { capsTrue: channels } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde caps engellenmeyen kanalları ${channels.map(a => `<#${a}>`)} olarak ayarladınız.`, msg), msg.channel.id)
       client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Kanal zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
        m.delete().catch(() => { })
        await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { capsTrue: channels } }, { upsert: true })
        client.message(client.normalEmbed(`Başarılı bir şekilde caps engellenmeyen kanalları ${channels.map(a => `<#${a}>`)} olarak güncellediniz.`, msg), msg.channel.id)
        client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))  
    } else if (sec === "105") {
      if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
      let channels;
      if (msg.mentions.channels.size >= 1) {
       channels = msg.mentions.channels.map(r => r.id);
     } else {
      if (!channels) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)    
       channels = args.splice(0, 1).map(id => msg.guild.channels.cache.get(id)).filter(r => r != undefined);
     }  
     let durum = res && res.msgLimitTrue ? res.msgLimitTrue.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { msgLimitTrue: channels } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde mesaj limit engellenmeyen kanalları ${channels.map(a => `<#${a}>`)} olarak ayarladınız.`, msg), msg.channel.id)
       client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Kanal zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
        m.delete().catch(() => { })
        await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { msgLimitTrue: channels } }, { upsert: true })
        client.message(client.normalEmbed(`Başarılı bir şekilde mesaj limit engellenmeyen kanalları ${channels.map(a => `<#${a}>`)} olarak güncellediniz.`, msg), msg.channel.id)
        client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))  
    } else if (sec === "106") {
      if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
      let channels;
      if (msg.mentions.channels.size >= 1) {
       channels = msg.mentions.channels.map(r => r.id);
     } else {
      if (!channels) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)    
       channels = args.splice(0, 1).map(id => msg.guild.channels.cache.get(id)).filter(r => r != undefined);
     }  
     let durum = res && res.tagTrue ? res.tagTrue.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { tagTrue: channels } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde etiket spam engellenmeyen kanalları ${channels.map(a => `<#${a}>`)} olarak ayarladınız.`, msg), msg.channel.id)
       client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Kanal zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
        m.delete().catch(() => { })
        await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { tagTrue: channels } }, { upsert: true })
        client.message(client.normalEmbed(`Başarılı bir şekilde etiket spam engellenmeyen kanalları ${channels.map(a => `<#${a}>`)} olarak güncellediniz.`, msg), msg.channel.id)
        client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))  
    } else if (sec === "107") {
      if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
      let channels;
      if (msg.mentions.channels.size >= 1) {
       channels = msg.mentions.channels.map(r => r.id);
     } else {
      if (!channels) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)    
       channels = args.splice(0, 1).map(id => msg.guild.channels.cache.get(id)).filter(r => r != undefined);
     }  
     let durum = res && res.linkTrue ? res.linkTrue.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { linkTrue: channels } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde link engellenmeyen kanalları ${channels.map(a => `<#${a}>`)} olarak ayarladınız.`, msg), msg.channel.id)
       client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Kanal zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
        m.delete().catch(() => { })
        await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { linkTrue: channels } }, { upsert: true })
        client.message(client.normalEmbed(`Başarılı bir şekilde link engellenmeyen kanalları ${channels.map(a => `<#${a}>`)} olarak güncellediniz.`, msg), msg.channel.id)
        client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))  
    } else if (sec === "108") {
      if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
      let channels;
      if (msg.mentions.channels.size >= 1) {
       channels = msg.mentions.channels.map(r => r.id);
     } else {
      if (!channels) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)    
       channels = args.splice(0, 1).map(id => msg.guild.channels.cache.get(id)).filter(r => r != undefined);
     }  
     let durum = res && res.swearTrue ? res.swearTrue.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { swearTrue: channels } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde küfür engellenmeyen kanalları ${channels.map(a => `<#${a}>`)} olarak ayarladınız.`, msg), msg.channel.id)
       client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Kanal zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
        m.delete().catch(() => { })
        await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { swearTrue: channels } }, { upsert: true })
        client.message(client.normalEmbed(`Başarılı bir şekilde küfür engellenmeyen kanalları ${channels.map(a => `<#${a}>`)} olarak güncellediniz.`, msg), msg.channel.id)
        client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))  
    } else if (sec === "109") {
      if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
      let channels;
      if (msg.mentions.channels.size >= 1) {
       channels = msg.mentions.channels.map(r => r.id);
     } else {
      if (!channels) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)    
       channels = args.splice(0, 1).map(id => msg.guild.channels.cache.get(id)).filter(r => r != undefined);
     }  
     let durum = res && res.emojiTrue ? res.emojiTrue.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { emojiTrue: channels } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde emoji spam engellenmeyen kanalları ${channels.map(a => `<#${a}>`)} olarak ayarladınız.`, msg), msg.channel.id)
       client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Kanal zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
        m.delete().catch(() => { })
        await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { emojiTrue: channels } }, { upsert: true })
        client.message(client.normalEmbed(`Başarılı bir şekilde emoji spam engellenmeyen kanalları ${channels.map(a => `<#${a}>`)} olarak güncellediniz.`, msg), msg.channel.id)
        client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))  
    } else if (sec === "110") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (!(res && res.msgLimitMode)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { msgLimitMode: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde mesaj limitini \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Limit zaten ayarlı olarak görünüyor, belirttiğin limit ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { msgLimitMode: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde mesaj limitini \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red")))) 
    } else if (sec === "111") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (!(res && res.linkLimit)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { linkLimit: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde link limitini \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Limit zaten ayarlı olarak görünüyor, belirttiğin limit ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { linkLimit: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde link limitini \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red")))) 
    } else if (sec === "112") {
      if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
      let channels;
      if (msg.mentions.channels.size >= 1) {
       channels = msg.mentions.channels.map(r => r.id);
     } else {
      if (!channels) return client.message(client.normalEmbed(`Bir kanal belirt ve tekrardan dene!`, msg), msg.channel.id)    
       channels = args.splice(0, 1).map(id => msg.guild.channels.cache.get(id)).filter(r => r != undefined);
     }  
     let durum = res && res.spamTrue ? res.spamTrue.length === 0 ? 0 : 1 : 0
     if (durum === 0) {
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { spamTrue: channels } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde spam engellenmeyen kanalları ${channels.map(a => `<#${a}>`)} olarak ayarladınız.`, msg), msg.channel.id)
       client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Kanal zaten ayarlı olarak görünüyor, belirttiğin kanal ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
        m.delete().catch(() => { })
        await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { spamTrue: channels } }, { upsert: true })
        client.message(client.normalEmbed(`Başarılı bir şekilde spam engellenmeyen kanalları ${channels.map(a => `<#${a}>`)} olarak güncellediniz.`, msg), msg.channel.id)
        client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red"))))  
    } else if (sec === "113") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (!(res && res.spamLimit)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { spamLimit: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde spam limitini \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Limit zaten ayarlı olarak görünüyor, belirttiğin limit ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { spamLimit: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde spam limitini \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red")))) 
    } else if (sec === "114") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (!(res && res.capsLimit)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { capsLimit: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde caps engel uyarı sayısını \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Limit zaten ayarlı olarak görünüyor, belirttiğin limit ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { capsLimit: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde caps engel uyarı sayısını \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red")))) 
    } else if (sec === "115") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (!(res && res.tagLimit)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { tagLimit: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde etiket spam engel uyarı sayısını \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Limit zaten ayarlı olarak görünüyor, belirttiğin limit ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { tagLimit: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde etiket spam engel uyarı sayısını \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red")))) 
    } else if (sec === "116") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (!(res && res.msgLimitLimit)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { msgLimitLimit: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde mesaj limit uyarı sayısını \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Limit zaten ayarlı olarak görünüyor, belirttiğin limit ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { msgLimitLimit: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde mesaj limit uyarı sayısını \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red")))) 
    } else if (sec === "117") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (!(res && res.swearLimit)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { swearLimit: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde küfür engel uyarı sayısını \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Limit zaten ayarlı olarak görünüyor, belirttiğin limit ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { swearLimit: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde küfür engel uyarı sayısını \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red")))) 
    } else if (sec === "118") {
     if (!cfg.Bot.Owners.includes(msg.author.id) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000) 
     if (!(res && res.emojiLimit)) {
      await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { emojiLimit: sec2 } }, { upsert: true })
      client.message(client.normalEmbed(`Başarılı bir şekilde emoji spam engel uyarı sayısını \`${sec2}\` olarak ayarladınız.`, msg), msg.channel.id)
      client.react(msg, "tick")
     } else return msg.channel.send(Embed.setDescription(`Limit zaten ayarlı olarak görünüyor, belirttiğin limit ile güncellemek istiyorsan emojiye basman yeterli.`)).then(m => m.react("976939143290572901").then(s => m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(async(collected) => {const reaction = collected.first()
      if (reaction.emoji.id === "976939143290572901") {
       m.delete().catch(() => { })
       await SetupDatabase.findOneAndUpdate({ guildID: msg.guild.id }, { $set: { emojiLimit: sec2 } }, { upsert: true })
       client.message(client.normalEmbed(`Başarılı bir şekilde emoji spam engel uyarı sayısını \`${sec2}\` olarak güncellediniz.`, msg), msg.channel.id)
       client.react(msg, "tick")
      }  
     }).catch(() => m.delete().catch(() => { }) && client.react(msg, "red")))) 
    } else if (sec === "durum" || sec === "Durum" || sec === "DURUM") {
     const Geri = new MessageButton().setLabel("◀").setStyle("blurple").setID("Geri")   
     const İptal = new MessageButton().setLabel("❌").setStyle("blurple").setID("İptal") 
     const İleri = new MessageButton().setLabel("▶").setStyle("blurple").setID("İleri")      
     let mesaj = await msg.channel.send(Embed.addField(`**Sunucu Ayarları**`, `\`•\` Sunucu ID: \`${msg.guild.id}\`\n\`•\` Sunucu İsmi: \`${res && res.guildName ? res.guildName : `Girilmemiş.`}\`\n\`•\` Sunucu Tagı: \`${res && res.guildTag ? res.guildTag : `Girilmemiş.`}\`\n\`•\` Kurallar Kanalı: ${res && res.rules ? `<#`+res.rules+`>` : `\`Girilmemiş.\``}\n\`•\` Oto Tag: \`${res && res.otoTag ? res.otoTag : `Girilmemiş.`}\`\n\`•\` Sunucu Normal Üye Sembolü: \`${res && res.guildNoTag ? res.guildNoTag : `Girilmemiş.`}\`\n\`•\` LeaderBoard Chat Stats Mesaj ID: \`${res && res.chatStatsLeaderBoardMessageID ? res.chatStatsLeaderBoardMessageID : `Girilmemiş.`}\`\n\`•\` LeaderBoard Voice Stats Mesaj ID: \`${res && res.voiceStatsLeaderBoardMessageID ? res.voiceStatsLeaderBoardMessageID : `Girilmemiş.`}\`\n\`•\` LeaderBoard Tagged Stats Mesaj ID: \`${res && res.taggedStatsLeaderBoardMessageID ? res.taggedStatsLeaderBoardMessageID : `Girilmemiş.`}\`\n\`•\` LeaderBoard Invite Stats Mesaj ID: \`${res && res.inviteStatsLeaderBoardMessageID ? res.inviteStatsLeaderBoardMessageID : `Girilmemiş.`}\`\n\`•\` LeaderBoard Register Stats Mesaj ID: \`${res && res.registerStatsLeaderBoardMessageID ? res.registerStatsLeaderBoardMessageID : `Girilmemiş.`}\`\n\`•\` Bot Durumu: \`${res && res.durum ? res.durum : `Juqest`}\`\n\`•\` Bot Statusu: \`${res && res.status ? res.status : `dnd`}\`\n\`•\` Bot Ses Kanalı: ${res && res.botVoiceChannel ? `<#`+res.botVoiceChannel+`>` : `\`Girilmemiş.\``}\n\`•\` Oto Yetki Sistemi: \`${res && res.autoPerm ? res.autoPerm === true ? `Açık` : `Kapalı` : `Girilmemiş.`}\``).addField(`**Rol Ayarları**`, `\`•\` Erkek ${res && res.manRoles ? res.manRoles.length > 1 ? `Rolleri` : `Rolü`: `Rolü`}: ${res && res.manRoles.length >= 1 ? `${res.manRoles.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Kız ${res && res.ladyRoles ? res.ladyRoles.length > 1 ? `Rolleri` : `Rolü`: `Rolü`}: ${res && res.ladyRoles.length >= 1 ? `${res.ladyRoles.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Kayıtsız ${res && res.unregisterRoles ? res.unregisterRoles.length > 1 ? `Rolleri` : `Rolü`: `Rolü`}: ${res && res.unregisterRoles.length >= 1 ? `${res.unregisterRoles.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Taglı Rolü: ${res && res.taggedRole ? `<@&`+res.taggedRole+`>` : `\`Girilmemiş.\``}\n\`•\` Vip Rolü: ${res && res.vipRole ? `<@&`+res.vipRole+`>` : `\`Girilmemiş.\``}\n\`•\` Booster Rolü: ${res && res.boosterRole ? `<@&`+res.boosterRole+`>` : `\`Girilmemiş.\``}\n\`•\` En Alt Yetkili Rolü: ${res && res.minStaffRole ? `<@&`+res.minStaffRole+`>` : `\`Girilmemiş.\``}\n\`•\` Yasaklı Tag Rolü: ${res && res.bannedTagRole ? `<@&`+res.bannedTagRole+`>` : `\`Girilmemiş.\``}\n\`•\` Yönetici Rolü: ${res && res.adminRole ? `<@&`+res.adminRole+`>` : `\`Girilmemiş.\``}\n\`•\` Cezalı Rolü: ${res && res.punitiveRole ? `<@&`+res.punitiveRole+`>` : `\`Girilmemiş.\``}\n\`•\` Yeni Hesap Rolü: ${res && res.newAccRole ? `<@&`+res.newAccRole+`>` : `\`Girilmemiş.\``}\n\`•\` Muted Rolü: ${res && res.mutedRole ? `<@&`+res.mutedRole+`>` : `\`Girilmemiş.\``}\n\`•\` Streamer Cezalı Rolü: ${res && res.streamerPunishedRole ? `<@&`+res.streamerPunishedRole+`>` : `\`Girilmemiş.\``}\n\`•\` Sponsor Rolü: ${res && res.sponsorRole ? `<@&`+res.sponsorRole+`>` : `\`Girilmemiş.\``}\n\`•\` Müzisyen Rolü: ${res && res.musicianRole ? `<@&`+res.musicianRole+`>` : `\`Girilmemiş.\``}\n\`•\` Yetkili ${res && res.staffRoles ? res.staffRoles.length > 1 ? `Rolleri` : `Rolü`: `Rolü`}: ${res && res.staffRoles.length >= 1 ? `${res.staffRoles.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}`).addField(`**Yetkili Ayarları**`, `\`•\` İsim Değiştirme Limit: ${res && res.changeNameLimit ? `\``+res.changeNameLimit+`\`` : `\`Girilmemiş.\``}\n\`•\` Kayıt Limit: ${res && res.registerLimit ? `\``+res.registerLimit+`\`` : `\`Girilmemiş.\``}\n\`•\` Voice Mute Limit: ${res && res.voiceMuteLimit ? `\``+res.voiceMuteLimit+`\`` : `\`Girilmemiş.\``}\n\`•\` Chat Mute Limit: ${res && res.chatMuteLimit ? `\``+res.chatMuteLimit+`\`` : `\`Girilmemiş.\``}\n\`•\` Jail Limit: ${res && res.jailLimit ? `\``+res.jailLimit+`\`` : `\`Girilmemiş.\``}\n\`•\` Ban Limit: ${res && res.banLimit ? `\``+res.banLimit+`\`` : `\`Girilmemiş.\``}\n\`•\` Tag Aldırma Puanı: ${res && res.taggedPuan ? `\``+res.taggedPuan+`\`` : `\`Girilmemiş.\``}\n\`•\` Tag Aldırma Coini: ${res && res.taggedCoin ? `\``+res.taggedCoin+`\`` : `\`Girilmemiş.\``}\n\`•\` Kayıt Puanı: ${res && res.registerPuan ? `\``+res.registerPuan+`\`` : `\`Girilmemiş.\``}\n\`•\` Kayıt Coini: ${res && res.registerCoin ? `\``+res.registerCoin+`\`` : `\`Girilmemiş.\``}\n\`•\` Davet Puanı: ${res && res.invitePuan ? `\``+res.invitePuan+`\`` : `\`Girilmemiş.\``}\n\`•\` Davet Coini: ${res && res.inviteCoin ? `\``+res.inviteCoin+`\`` : `\`Girilmemiş.\``}\n\`•\` Chat Mute Hammer: ${res && res.chatMuteRoles.length >= 1 ? `${res.chatMuteRoles.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Voice Mute Hammer: ${res && res.voiceMuteRoles.length >= 1 ? `${res.voiceMuteRoles.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Jail Hammer: ${res && res.jailRoles.length >= 1 ? `${res.jailRoles.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Ban Hammer: ${res && res.banHammerRoles.length >= 1 ? `${res.banHammerRoles.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Bot Commands: ${res && res.botCommandsRoles.length >= 1 ? `${res.botCommandsRoles.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Move Hammer: ${res && res.moveRoles.length >= 1 ? `${res.moveRoles.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Staff Hammer: ${res && res.staffRolesAddTrue.length >= 1 ? `${res.staffRolesAddTrue.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Commands Hammer: ${res && res.allCommandsTrue.length >= 1 ? `${res.allCommandsTrue.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Role Hammer: ${res && res.roleAddRemoveRoles.length >= 1 ? `${res.roleAddRemoveRoles.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Oto Yetki Sistemine Dahil Edilmeyecek Roller: ${res && res.noAutoPerm.length >= 1 ? `${res.noAutoPerm.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Oto Yetki Sisteminde Bulunan Roller: ${res && res.autoAuthorizationRoles.length >= 1 ? `${res.autoAuthorizationRoles.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}`).setThumbnail(msg.guild.iconURL({dynamic:true})), { components: [ { type: 1, components: [Geri, İleri, İptal]}]})
     let editedOldMessage = await OldEmbed.addField(`**Sunucu Ayarları**`, `\`•\` Sunucu ID: \`${msg.guild.id}\`\n\`•\` Sunucu İsmi: \`${res && res.guildName ? res.guildName : `Girilmemiş.`}\`\n\`•\` Sunucu Tagı: \`${res && res.guildTag ? res.guildTag : `Girilmemiş.`}\`\n\`•\` Kurallar Kanalı: ${res && res.rules ? `<#`+res.rules+`>` : `\`Girilmemiş.\``}\n\`•\` Oto Tag: \`${res && res.otoTag ? res.otoTag : `Girilmemiş.`}\`\n\`•\` Sunucu Normal Üye Sembolü: \`${res && res.guildNoTag ? res.guildNoTag : `Girilmemiş.`}\`\n\`•\` LeaderBoard Chat Stats Mesaj ID: \`${res && res.chatStatsLeaderBoardMessageID ? res.chatStatsLeaderBoardMessageID : `Girilmemiş.`}\`\n\`•\` LeaderBoard Voice Stats Mesaj ID: \`${res && res.voiceStatsLeaderBoardMessageID ? res.voiceStatsLeaderBoardMessageID : `Girilmemiş.`}\`\n\`•\` LeaderBoard Tagged Stats Mesaj ID: \`${res && res.taggedStatsLeaderBoardMessageID ? res.taggedStatsLeaderBoardMessageID : `Girilmemiş.`}\`\n\`•\` LeaderBoard Invite Stats Mesaj ID: \`${res && res.inviteStatsLeaderBoardMessageID ? res.inviteStatsLeaderBoardMessageID : `Girilmemiş.`}\`\n\`•\` LeaderBoard Register Stats Mesaj ID: \`${res && res.registerStatsLeaderBoardMessageID ? res.registerStatsLeaderBoardMessageID : `Girilmemiş.`}\`\n\`•\` Bot Durumu: \`${res && res.durum ? res.durum : `Juqest`}\`\n\`•\` Bot Statusu: \`${res && res.status ? res.status : `dnd`}\`\n\`•\` Bot Ses Kanalı: ${res && res.botVoiceChannel ? `<#`+res.botVoiceChannel+`>` : `\`Girilmemiş.\``}\n\`•\` Oto Yetki Sistemi: \`${res && res.autoPerm ? res.autoPerm === true ? `Açık` : `Kapalı` : `Girilmemiş.`}\``).addField(`**Rol Ayarları**`, `\`•\` Erkek ${res && res.manRoles ? res.manRoles.length > 1 ? `Rolleri` : `Rolü`: `Rolü`}: ${res && res.manRoles.length >= 1 ? `${res.manRoles.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Kız ${res && res.ladyRoles ? res.ladyRoles.length > 1 ? `Rolleri` : `Rolü`: `Rolü`}: ${res && res.ladyRoles.length >= 1 ? `${res.ladyRoles.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Kayıtsız ${res && res.unregisterRoles ? res.unregisterRoles.length > 1 ? `Rolleri` : `Rolü`: `Rolü`}: ${res && res.unregisterRoles.length >= 1 ? `${res.unregisterRoles.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Taglı Rolü: ${res && res.taggedRole ? `<@&`+res.taggedRole+`>` : `\`Girilmemiş.\``}\n\`•\` Vip Rolü: ${res && res.vipRole ? `<@&`+res.vipRole+`>` : `\`Girilmemiş.\``}\n\`•\` Booster Rolü: ${res && res.boosterRole ? `<@&`+res.boosterRole+`>` : `\`Girilmemiş.\``}\n\`•\` En Alt Yetkili Rolü: ${res && res.minStaffRole ? `<@&`+res.minStaffRole+`>` : `\`Girilmemiş.\``}\n\`•\` Yasaklı Tag Rolü: ${res && res.bannedTagRole ? `<@&`+res.bannedTagRole+`>` : `\`Girilmemiş.\``}\n\`•\` Yönetici Rolü: ${res && res.adminRole ? `<@&`+res.adminRole+`>` : `\`Girilmemiş.\``}\n\`•\` Cezalı Rolü: ${res && res.punitiveRole ? `<@&`+res.punitiveRole+`>` : `\`Girilmemiş.\``}\n\`•\` Yeni Hesap Rolü: ${res && res.newAccRole ? `<@&`+res.newAccRole+`>` : `\`Girilmemiş.\``}\n\`•\` Muted Rolü: ${res && res.mutedRole ? `<@&`+res.mutedRole+`>` : `\`Girilmemiş.\``}\n\`•\` Streamer Cezalı Rolü: ${res && res.streamerPunishedRole ? `<@&`+res.streamerPunishedRole+`>` : `\`Girilmemiş.\``}\n\`•\` Sponsor Rolü: ${res && res.sponsorRole ? `<@&`+res.sponsorRole+`>` : `\`Girilmemiş.\``}\n\`•\` Müzisyen Rolü: ${res && res.musicianRole ? `<@&`+res.musicianRole+`>` : `\`Girilmemiş.\``}\n\`•\` Yetkili ${res && res.staffRoles ? res.staffRoles.length > 1 ? `Rolleri` : `Rolü`: `Rolü`}: ${res && res.staffRoles.length >= 1 ? `${res.staffRoles.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}`).addField(`**Yetkili Ayarları**`, `\`•\` İsim Değiştirme Limit: ${res && res.changeNameLimit ? `\``+res.changeNameLimit+`\`` : `\`Girilmemiş.\``}\n\`•\` Kayıt Limit: ${res && res.registerLimit ? `\``+res.registerLimit+`\`` : `\`Girilmemiş.\``}\n\`•\` Voice Mute Limit: ${res && res.voiceMuteLimit ? `\``+res.voiceMuteLimit+`\`` : `\`Girilmemiş.\``}\n\`•\` Chat Mute Limit: ${res && res.chatMuteLimit ? `\``+res.chatMuteLimit+`\`` : `\`Girilmemiş.\``}\n\`•\` Jail Limit: ${res && res.jailLimit ? `\``+res.jailLimit+`\`` : `\`Girilmemiş.\``}\n\`•\` Ban Limit: ${res && res.banLimit ? `\``+res.banLimit+`\`` : `\`Girilmemiş.\``}\n\`•\` Tag Aldırma Puanı: ${res && res.taggedPuan ? `\``+res.taggedPuan+`\`` : `\`Girilmemiş.\``}\n\`•\` Tag Aldırma Coini: ${res && res.taggedCoin ? `\``+res.taggedCoin+`\`` : `\`Girilmemiş.\``}\n\`•\` Kayıt Puanı: ${res && res.registerPuan ? `\``+res.registerPuan+`\`` : `\`Girilmemiş.\``}\n\`•\` Kayıt Coini: ${res && res.registerCoin ? `\``+res.registerCoin+`\`` : `\`Girilmemiş.\``}\n\`•\` Davet Puanı: ${res && res.invitePuan ? `\``+res.invitePuan+`\`` : `\`Girilmemiş.\``}\n\`•\` Davet Coini: ${res && res.inviteCoin ? `\``+res.inviteCoin+`\`` : `\`Girilmemiş.\``}\n\`•\` Chat Mute Hammer: ${res && res.chatMuteRoles.length >= 1 ? `${res.chatMuteRoles.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Voice Mute Hammer: ${res && res.voiceMuteRoles.length >= 1 ? `${res.voiceMuteRoles.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Jail Hammer: ${res && res.jailRoles.length >= 1 ? `${res.jailRoles.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Ban Hammer: ${res && res.banHammerRoles.length >= 1 ? `${res.banHammerRoles.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Bot Commands: ${res && res.botCommandsRoles.length >= 1 ? `${res.botCommandsRoles.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Move Hammer: ${res && res.moveRoles.length >= 1 ? `${res.moveRoles.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Staff Hammer: ${res && res.staffRolesAddTrue.length >= 1 ? `${res.staffRolesAddTrue.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Commands Hammer: ${res && res.allCommandsTrue.length >= 1 ? `${res.allCommandsTrue.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Role Hammer: ${res && res.roleAddRemoveRoles.length >= 1 ? `${res.roleAddRemoveRoles.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Oto Yetki Sistemine Dahil Edilmeyecek Roller: ${res && res.noAutoPerm.length >= 1 ? `${res.noAutoPerm.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Oto Yetki Sisteminde Bulunan Roller: ${res && res.autoAuthorizationRoles.length >= 1 ? `${res.autoAuthorizationRoles.map(a => `<@&${a}>`).join(`, `)}` : `\`Girilmemiş.\``}`).setThumbnail(msg.guild.iconURL({dynamic:true}))
     let editedNewMessage = await NewEmbed.addField(`**Kanal Ayarları**`, `\`•\` Chat: ${res && res.Chat ? `<#`+res.Chat+`>` : `\`Girilmemiş.\``}\n\`•\` Bot Commands: ${res && res.botCommandsChannel ? `<#`+res.botCommandsChannel+`>` : `\`Girilmemiş.\``}\n\`•\` Foto Chat: ${res && res.fotoChat ? `<#`+res.fotoChat+`>` : `\`Girilmemiş.\``}\n\`•\` Welcome ${res && res.RegisterVoices ? res.RegisterVoices.length > 1 ? `Kanalları` : `Kanalı`: `Kanalı`}: ${res && res.RegisterVoices.length >= 1 ? `${res.RegisterVoices.map(a => `<#${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Welcome Ses Kanalı İsmi: \`${res && res.RegisterVoiceName ? res.RegisterVoiceName : `Girilmemiş.`}\`\n\`•\` Davet Log Kanalı: ${res && res.inviteLog ? `<#`+res.inviteLog+`>` : `\`Girilmemiş.\``}\n\`•\` Yeni Hesap Log Kanalı: ${res && res.newAccLog ? `<#`+res.newAccLog+`>` : `\`Girilmemiş.\``}\n\`•\` Yasaklı Tag Log: ${res && res.bannedTagLog ? `<#`+res.bannedTagLog+`>` : `\`Girilmemiş.\``}\n\`•\` Mesaj Log: ${res && res.messageLog ? `<#`+res.messageLog+`>` : `\`Girilmemiş.\``}\n\`•\` Ses Log: ${res && res.voiceLog ? `<#`+res.voiceLog+`>` : `\`Girilmemiş.\``}\n\`•\` Rol Log: ${res && res.rolLog ? `<#`+res.rolLog+`>` : `\`Girilmemiş.\``}\n\`•\` Register Chat: ${res && res.registerChat ? `<#`+res.registerChat+`>` : `\`Girilmemiş.\``}\n\`•\` Streamer Cezalı Log: ${res && res.streamerCezalıLog ? `<#`+res.streamerCezalıLog+`>` : `\`Girilmemiş.\``}\n\`•\` Tag Log: ${res && res.tagLog ? `<#`+res.tagLog+`>` : `\`Girilmemiş.\``}\n\`•\` Tag Ayrıcalıkları Kanalı: ${res && res.tagAyrıcalıkları ? `<#`+res.tagAyrıcalıkları+`>` : `\`Girilmemiş.\``}\n\`•\` Streamer Denetim Log: ${res && res.streamerDenetim ? `<#`+res.streamerDenetim+`>` : `\`Girilmemiş.\``}\n\`•\` Ban Log: ${res && res.banLog ? `<#`+res.banLog+`>` : `\`Girilmemiş.\``}\n\`•\` Jail Log: ${res && res.jailLog ? `<#`+res.jailLog+`>` : `\`Girilmemiş.\``}\n\`•\` Voice Mute Log: ${res && res.voiceMuteLog ? `<#`+res.voiceMuteLog+`>` : `\`Girilmemiş.\``}\n\`•\` Chat Mute Log: ${res && res.chatMuteLog ? `<#`+res.chatMuteLog+`>` : `\`Girilmemiş.\``}\n\`•\` Ceza Puanı Log: ${res && res.cezaPuanıLog ? `<#`+res.cezaPuanıLog+`>` : `\`Girilmemiş.\``}\n\`•\` Leader Board: ${res && res.leaderBoard ? `<#`+res.leaderBoard+`>` : `\`Girilmemiş.\``}\n\`•\` Sıfırlama Log: ${res && res.veriResetLog ? `<#`+res.veriResetLog+`>` : `\`Girilmemiş.\``}`).addField(`**Kanal Ayarları 2**`, `\`•\` Yetki Saldı Log: ${res && res.AuthorityLeft ? `<#`+res.AuthorityLeft+`>` : `\`Girilmemiş.\``}\n\`•\` Komut Log: ${res && res.commandsLog ? `<#`+res.commandsLog+`>` : `\`Girilmemiş.\``}\n\`•\` Join-Leave Log: ${res && res.joinLeaveLog ? `<#`+res.joinLeaveLog+`>` : `\`Girilmemiş.\``}\n\`•\` Yetki Atlama Log: ${res && res.yetkiUpLog ? `<#`+res.yetkiUpLog+`>` : `\`Girilmemiş.\``}\n\`•\` Kayıt Log: ${res && res.registerLog ? `<#`+res.registerLog+`>` : `\`Girilmemiş.\``}\n\`•\` Public Kategorisi: ${res && res.publicCategory ? `\`#`+msg.guild.channels.cache.get(res.publicCategory).name+`\`` : `\`Girilmemiş.\``}\n\`•\` Register Kategorisi: ${res && res.registerCategory ? `\`#`+msg.guild.channels.cache.get(res.registerCategory)+`\`` : `\`Girilmemiş.\``}\n\`•\` Sorun Çözme Kategorisi: ${res && res.sorunÇözmeCategory ? `\`#`+msg.guild.channels.cache.get(res.sorunÇözmeCategory)+`\`` : `\`Girilmemiş.\``}\n\`•\` Alone Kategorisi: ${res && res.aloneCategory ? `\`#`+msg.guild.channels.cache.get(res.aloneCategory)+`\`` : `\`Girilmemiş.\``}\n\`•\` Streamer Kategorisi: ${res && res.streamerCategory ? `\`#`+msg.guild.channels.cache.get(res.streamerCategory)+`\`` : `\`Girilmemiş.\``}\n\`•\` Sleep Kanalı: ${res && res.sleepChannel ? `<#`+res.sleepChannel+`>` : `\`Girilmemiş.\``}\n\`•\` Oyun ${res && res.gameParents ? res.gameParents.length > 1 ? `Kategorileri` : `Kategorisi`: `Kategorisi`}: ${res && res.gameParents.length >= 1 ? `${res.gameParents.map(a => `\`#${msg.guild.channels.cache.get(a).name}\``).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` + 18 Ses ${res && res.AgeLimits ? res.AgeLimits.length > 1 ? `Kanalları` : `Kanalı`: `Kanalı`}: ${res && res.AgeLimits.length >= 1 ? `${res.AgeLimits.map(a => `<#${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Seviye Log: ${res && res.levelLog ? `<#`+res.levelLog+`>` : `\`Girilmemiş.\``}`).setThumbnail(msg.guild.iconURL({dynamic:true}))
     let editedNew2Message = await NewEmbed2.addField(`**Mesaj Ayarları**`, `\`•\` Chat Guard Log: ${res && res.chatGuardLog ? `<#`+res.chatGuardLog+`>` : `\`Girilmemiş.\``}\n\`•\` Spotify Engel: \`${res && res.spotifyMode ? res.spotifyMode === true ? `Açık` : `Kapalı` : `Kapalı`}\`\n\`•\` Caps Engel: \`${res && res.capsMode ? res.capsMode === true ? `Açık` : `Kapalı` : `Kapalı`}\`\n\`•\` Mesaj Limit: \`${res && res.msgLimitMode ? res.msgLimitMode === true ? `Açık` : `Kapalı` : `Kapalı`}\`\n\`•\` Etiket Engel: \`${res && res.tagMode ? res.tagMode === true ? `Açık` : `Kapalı` : `Kapalı`}\`\n\`•\` Link Engel: \`${res && res.linkMode ? res.linkMode === true ? `Açık` : `Kapalı` : `Kapalı`}\`\n\`•\` Küfür Engel: \`${res && res.swearMode ? res.swearMode === true ? `Açık` : `Kapalı` : `Kapalı`}\`\n\`•\` Emoji Spam Engel: \`${res && res.emojiMode ? res.emojiMode === true ? `Açık` : `Kapalı` : `Kapalı`}\`\n\`•\` Spam Engel: \`${res && res.spamMode ? res.spamMode === true ? `Açık` : `Kapalı` : `Kapalı`}\`\n\`•\` Mesaj Limit Sayısı: \`${res && res.msgLimit ? res.msgLimit : `500`}\`\n\`•\` Reklam Limit: \`${res && res.advertisementLimit ? res.advertisementLimit : `3`}\`\n\`•\` Link Limit: \`${res && res.linkLimit ? res.linkLimit : `3`}\`\n\`•\` Caps Limit: \`${res && res.capsLimit ? res.capsLimit : `5`}\`\n\`•\` Etiket Spam Limit: \`${res && res.tagLimit ? res.tagLimit : `5`}\`\n\`•\` Mesaj Limit Uyarı Sayısı: \`${res && res.msgLimitLimit ? res.msgLimitLimit : `5`}\`\n\`•\` Küfür Limit: \`${res && res.swearLimit ? res.swearLimit : `5`}\`\n\`•\` Emoji Spam Limit: \`${res && res.emojiLimit ? res.emojiLimit : `5`}\`\n\`•\` Spam Limit: \`${res && res.spamLimit ? res.spamLimit : `8`}\`\n\`•\` Spotify Davet Atma ${res && res.spotifyTrue ? res.spotifyTrue.length > 1 ? `Kanalları` : `Kanalı`: `Kanalı`}: ${res && res.spotifyTrue.length >= 1 ? `${res.spotifyTrue.map(a => `<#${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Caps Engellenmeyen ${res && res.capsTrue ? res.capsTrue.length > 1 ? `Kanallar` : `Kanal`: `Kanal`}: ${res && res.capsTrue.length >= 1 ? `${res.capsTrue.map(a => `<#${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Mesaj Limit Engellenmeyen ${res && res.msgLimitTrue ? res.msgLimitTrue.length > 1 ? `Kanallar` : `Kanal`: `Kanal`}: ${res && res.msgLimitTrue.length >= 1 ? `${res.msgLimitTrue.map(a => `<#${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Etiket Spam Engellenmeyen ${res && res.tagTrue ? res.tagTrue.length > 1 ? `Kanallar` : `Kanal`: `Kanal`}: ${res && res.tagTrue.length >= 1 ? `${res.tagTrue.map(a => `<#${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Link Engellenmeyen ${res && res.linkTrue ? res.linkTrue.length > 1 ? `Kanallar` : `Kanal`: `Kanal`}: ${res && res.linkTrue.length >= 1 ? `${res.linkTrue.map(a => `<#${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Küfür Engellenmeyen ${res && res.swearTrue ? res.swearTrue.length > 1 ? `Kanallar` : `Kanal`: `Kanal`}: ${res && res.swearTrue.length >= 1 ? `${res.swearTrue.map(a => `<#${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Emoji Spam Engellenmeyen ${res && res.emojiTrue ? res.emojiTrue.length > 1 ? `Kanallar` : `Kanal`: `Kanal`}: ${res && res.emojiTrue.length >= 1 ? `${res.emojiTrue.map(a => `<#${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n\`•\` Spam Engellenmeyen ${res && res.spamTrue ? res.spamTrue.length > 1 ? `Kanallar` : `Kanal`: `Kanal`}: ${res && res.spamTrue.length >= 1 ? `${res.spamTrue.map(a => `<#${a}>`).join(`, `)}` : `\`Girilmemiş.\``}\n`).setThumbnail(msg.guild.iconURL({dynamic:true}))
 
     let filter = (button) => button.clicker.user.id === msg.author.id;   
     let collector = await mesaj.createButtonCollector(filter, { time: 30000 }) 
     let sayı = 0
      collector.on("collect", async (button) => { 
       if (button.id === "İptal") {
        mesaj.delete().catch(() => { })
        client.react(msg, "red")
         return}
        
       if (button.id === "İleri") {
        if (sayı === 0) {
         mesaj.edit(editedNewMessage) 
         sayı++
         client.api.interactions(button.discordID, button.token).callback.post( {data: { type: 4, data: { content: `Başarıyla ikinci sayfaya geçildi.`, flags: "64" }}})
        } else if (sayı === 1) { 
         mesaj.edit(editedNew2Message) 
         sayı++
         client.api.interactions(button.discordID, button.token).callback.post( {data: { type: 4, data: { content: `Başarıyla üçüncü sayfaya geçildi.`, flags: "64" }}})          
        }
       } else if (button.id === "Geri") {
        if (sayı === 2) {
         mesaj.edit(editedNewMessage)
         sayı--
         client.api.interactions(button.discordID, button.token).callback.post( {data: { type: 4, data: { content: `Başarıyla ikinci sayfaya geçildi.`, flags: "64" }}})
        } else if (sayı === 1) {
         mesaj.edit(editedOldMessage)
         sayı--
         client.api.interactions(button.discordID, button.token).callback.post( {data: { type: 4, data: { content: `Başarıyla birinci sayfaya geçildi.`, flags: "64" }}})
        }
       }        
      })    
     } else return client.message(client.normalEmbed(`Belirttiğiniz seçim geçerli değil lütfen aşağıdaki verilere göre komutu uygulayınız.\n\n${secArray.map(a => "\`"+a+"\`").join("\n")}\n\n\`Örnek kullanım:\n${prefix}setup 75 online\n${prefix}setup 1 Sunucu İsmi\n${prefix}setup 60 @Man\``, msg), msg.channel.id)
    }
   }