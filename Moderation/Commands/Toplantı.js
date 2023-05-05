const { table } = require('table');

module.exports = {
  conf: {
    aliases: ["meeting", "tplntı", "mett"],
    name: "toplantı",
    usage: 'toplantı',
    description: 'Toplantı sistemi.',
  },

 run: async ({client, msg, args, author, ToplantıDatabase, MessageEmbed, moment, prefix, GeneralDatabase, SetupDatabase}) => {

   const res = await SetupDatabase.findOne({guildID: msg.guild.id})
   let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : [] 
   
   if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  
   let sec = args[0]
   prefix = `\`⦁\` `+ prefix
   if(sec === "başlat" || sec === "start" || sec === "kur") {

    let res = await GeneralDatabase.findOne({guildID: msg.guild.id, userID: msg.author.id, toplantıWait: true})  
    let doc = await ToplantıDatabase.findOne({guildID: msg.guild.id, authorID: msg.author.id, toplantıDurum: true})  
    if (res || doc) return client.message(client.normalEmbed(`Zaten ${moment(((res && res.toplantıWaitDate ? res.toplantıWaitDate : 0) === 0 ? doc.toplantıDate : res.toplantıWaitDate)-10800000).locale("TR").fromNow()} önce bir toplantı başlatmışsın, yeniden bir toplantı başlatamazsın.`, msg), msg.channel.id)  
    let başlık = args[1] 
    let role = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[2])
    let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[3])
    let count = await ToplantıDatabase.countDocuments().exec();
     count = count == 0 ? 1 : count + 1;  
    if (!author.voice.channel) return client.timemessage(client.normalEmbed("Bu komutu kullanmak için bir sesli kanalda olman gerek.", msg), msg.channel.id, 5000);   
    if (!başlık) return client.message(client.normalEmbed(`Toplantının başlığını belirtip tekrar dene!`, msg), msg.channel.id)
    if (!role) return client.message(client.normalEmbed(`Toplantının yapılacağı rolü belirtip tekrar dene!`, msg), msg.channel.id)
    if (!channel) return client.message(client.normalEmbed(`Toplantının yapılacağı ses kanalını belirtip tekrar dene!`, msg), msg.channel.id)
    if (!client.channels.cache.get(channel.id)) return client.message(client.normalEmbed(`Toplantının yapılacağı ses kanalını belirtip tekrar dene!`, msg), msg.channel.id)
    if (client.channels.cache.get(channel.id).type === "text") return client.message(client.normalEmbed(`Toplantının yapılacağı kanal bir metin kanalı olamaz.`, msg), msg.channel.id)
    if (client.channels.cache.get(channel.id).type === "category") return client.message(client.normalEmbed(`Toplantının yapılacağı kanal bir kategori olamaz.`, msg), msg.channel.id)
 
     başlık = (başlık.charAt(0).replace('i', "İ").toUpperCase() + başlık.slice(1).toLowerCase()) + " Toplantısı"
 
    await GeneralDatabase.findOneAndUpdate({guildID: msg.guild.id, userID: msg.author.id}, {$set: {toplantıWait: true, toplantıWaitDate: Date.now()}}, {upsert:true})
    msg.channel.send(
     new MessageEmbed()
      .setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true}))
      .setColor("RANDOM")
      .setDescription(`**${başlık}** adlı toplantı **5 dakika** içerisinde başlayacak.`)
      ).then(r => {
     
    let channelMembers = role.members.filter(x => !x.user.bot && x.voice.channel).map(x => x.id)
     for (let i = 0; i < channelMembers.length; i++) {
      setTimeout(() => {
       msg.guild.members.cache.get(channelMembers[i]).voice.setChannel(channel.id).catch(() => { })
    }, (i + 1) * 1000)
    }
    let channelNoMembers = role.members.filter(x => !x.user.bot && !x.voice.channel).map(x => x.id)
     for (let i = 0; i < channelMembers.length; i++) {
      setTimeout(() => {
       msg.guild.members.cache.get(channelMembers[i]).send(`Merhaba <@!${channelMembers[i]}>,\n**${msg.guild.name}** sunucusunda **${başlık}** başlıklı toplantı **${channel.name}** kanalında **5 dakika** sonra başlayacak. Toplantıya katılman gerekiyor!`).catch(() => { })
    }, (i + 1) * 1000)
    }
       msg.guild.members.cache.get(msg.author.id).voice.setChannel(channel.id).catch(() => { })
    
  setTimeout(async() => {
    channel.createInvite({unique: true}).then(invite => {
    r.edit(
     new MessageEmbed()
      .setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true}))
      .setColor("RANDOM")
      .setDescription(`**${başlık}** adlı toplantı başarıyla başlatıldı. [[Katıl]](https://discord.gg/${invite.code})`)
      .addField(`❯ Toplantı Detayları`,`\`⦁\` Düzenleyen: ${msg.author} (\`${msg.author.id}\`)\n\`⦁\` Başlık: **${başlık}**\n\`⦁\` ID: **#${count}**\n\`⦁\` Durum: **Aktif**\n\`⦁\` Rol: **${role.name}** (\`${role.id}\`)\n\`⦁\` Kanal: **${channel.name}** (\`${channel.id}\`)\n\`⦁\` Tarih: **${moment(Date.now()).locale("TR").format("LLL")}**`))})  
     
     
    await new ToplantıDatabase({guildID: msg.guild.id, authorID: msg.author.id, toplantıDurum: true, toplantıID: count, toplantıChannel: channel.id, toplantıBaşlık: başlık, toplantıRol: role.id, toplantıMembers: role.members.filter(x =>  !x.user.bot && (x.user.presence.status !== "offline") && x.voice.channel).map(x => x.id), toplantıNoMembers: role.members.filter(x => !x.user.bot && (x.user.presence.status !== "offline") && !x.voice.channel).map(x => x.id), toplantıDate: Date.now()}).save()
    let res2 = await GeneralDatabase.findOne({guildID: msg.guild.id, userID: msg.author.id})  
    res2.toplantıWait = false
    res2.toplantıWaitDate = 0
    res2.save()
    
  }, 300000) //300000
  })   
   } else if (sec === "bitir" || sec === "finish" || sec === "sonlandır") {
    let res = await ToplantıDatabase.findOne({guildID: msg.guild.id, authorID: msg.author.id, toplantıDurum: true})  
    if (!res) return client.message(client.normalEmbed(`Başlattığın aktif bir toplantı bulunmuyor.`, msg), msg.channel.id)     
     res.toplantıDurum = false
     res.save()
    msg.channel.send(
     new MessageEmbed()
      .setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true}))
      .setColor("RANDOM")
      .setDescription(`**${res.toplantıBaşlık}** Başlıklı toplantı başarıyla sonlandırıldı. `)
      .addField(`❯ Toplantı Detayları`,`\`⦁\` Düzenleyen: ${msg.author} (\`${msg.author.id}\`)\n\`⦁\` Başlık: **${res.toplantıBaşlık}**\n\`⦁\` ID: **#${res.toplantıID}**\n\`⦁\` Durum: **Kapalı**\n\`⦁\` Rol: **${msg.guild.roles.cache.get(res.toplantıRol).name}** (\`${res.toplantıRol}\`)\n\`⦁\` Kanal: **${msg.guild.channels.cache.get(res.toplantıChannel).name}** (\`${res.toplantıChannel}\`)\n\`⦁\` Tarih: **${moment(res.toplantıDate).locale("TR").format("LLL")}**`))    
     
   } else if (sec === "katılmayanlar") {
      let ID = args[1]
      if (!ID || isNaN(ID)) return client.message(client.normalEmbed(`Geçerli bir toplantı ID'si gir ve tekrar dene!`, msg), msg.channel.id)
      let res = await ToplantıDatabase.findOne({guildID: msg.guild.id, toplantıID: ID})  
      if (!res) return client.message(client.normalEmbed(`Bu ID'ye sahip bir toplantı bulamıyorum geçerli bir ID gir ve tekrar dene!`, msg), msg.channel.id)
     
      let currentPage = 1;
      const pageLimit = 15;
      let list = res.toplantıNoMembers.map(x => `<@!${x}> - (\`${x}\`)`)
      const pages = list.chunk(pageLimit);
      msg.channel.send(new MessageEmbed().setDescription(`**${res.toplantıBaşlık}na katılmayanlar (${res.toplantıNoMembers.length})**\n\n ${list.slice(currentPage === 1 ? 0 : Number((currentPage * pageLimit) - pageLimit), Number(currentPage * pageLimit)).join("\n")}`).setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true})).setColor("RANDOM")).then(async m => {
      if (list.length > pageLimit) {
       await m.react("◀");
       await m.react("❌");
       await m.react("▶");
      let collector = m.createReactionCollector((react, user) => ["◀","▶", "❌"].some(e => e == react.emoji.name) && user.id == msg.author.id, { time: 200000 });
      collector.on("collect", async reaction => {
       if (reaction.emoji.name === "◀") {
       if (currentPage === 1) return;
        await reaction.users.remove(msg.author.id).catch(() => { });
        currentPage--;
        m.edit(new MessageEmbed().setFooter(`Sayfa: ${currentPage}/${pages.length}`).setDescription(`**${res.toplantıBaşlık}na katılmayanlar (${res.toplantıNoMembers.length})**\n\n ${list.slice(currentPage === 1 ? 0 : Number((currentPage * pageLimit) - pageLimit), Number(currentPage * pageLimit)).join("n")}`).setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true})).setColor("RANDOM"));
   } else if (reaction.emoji.name === "▶") {
     if (currentPage === pages.length) return;
      await reaction.users.remove(msg.author.id).catch(() => { });
      currentPage++;
      m.edit(new MessageEmbed().setFooter(`Sayfa: ${currentPage}/${pages.length}`).setDescription(`**${res.toplantıBaşlık}na katılmayanlar (${res.toplantıNoMembers.length})**\n\n ${list.slice(currentPage === 1 ? 0 : Number((currentPage * pageLimit) - pageLimit), Number(currentPage * pageLimit)).join("\n")}`).setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true})).setColor("RANDOM"));
   } else if (reaction.emoji.name === "❌") {
      m.delete();
      collector.stop()}})}})
     
   } else if (sec === "katılanlar") {
      let ID = args[1]
      if (!ID || isNaN(ID)) return client.message(client.normalEmbed(`Geçerli bir toplantı ID'si gir ve tekrar dene!`, msg), msg.channel.id)
      let res = await ToplantıDatabase.findOne({guildID: msg.guild.id, toplantıID: ID})  
      if (!res) return client.message(client.normalEmbed(`Bu ID'ye sahip bir toplantı bulamıyorum geçerli bir ID gir ve tekrar dene!`, msg), msg.channel.id)
     
      let currentPage = 1;
      const pageLimit = 15;
      let list = res.toplantıMembers.map(x => `<@!${x}> - (\`${x}\`)`)
      const pages = list.chunk(pageLimit);
      msg.channel.send(new MessageEmbed().setDescription(`**${res.toplantıBaşlık}na katılanlar (${res.toplantıMembers.length})**\n\n ${list.slice(currentPage === 1 ? 0 : Number((currentPage * pageLimit) - pageLimit), Number(currentPage * pageLimit)).join("\n")}`).setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true})).setColor("RANDOM")).then(async m => {
      if (list.length > pageLimit) {
       await m.react("◀");
       await m.react("❌");
       await m.react("▶");
      let collector = m.createReactionCollector((react, user) => ["◀","▶", "❌"].some(e => e == react.emoji.name) && user.id == author.id, { time: 200000 });
      collector.on("collect", async reaction => {
       if (reaction.emoji.name === "◀") {
       if (currentPage === 1) return;
        await reaction.users.remove(author.id).catch(() => { });
        currentPage--;
        m.edit(new MessageEmbed().setFooter(`Sayfa: ${currentPage}/${pages.length}`).setDescription(`**${res.toplantıBaşlık}na katılanlar (${res.toplantıNoMembers.length})**\n\n ${list.slice(currentPage === 1 ? 0 : Number((currentPage * pageLimit) - pageLimit), Number(currentPage * pageLimit)).join("n")}`).setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true})).setColor("RANDOM"));
   } else if (reaction.emoji.name === "▶") {
     if (currentPage === pages.length) return;
      await reaction.users.remove(author.id).catch(() => { });
      currentPage++;
      m.edit(new MessageEmbed().setFooter(`Sayfa: ${currentPage}/${pages.length}`).setDescription(`**${res.toplantıBaşlık}na katılanlar (${res.toplantıNoMembers.length})**\n\n ${list.slice(currentPage === 1 ? 0 : Number((currentPage * pageLimit) - pageLimit), Number(currentPage * pageLimit)).join("\n")}`).setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true})).setColor("RANDOM"));
   } else if (reaction.emoji.name === "❌") {
      m.delete();
      collector.stop()}})}})
     
   } else if(sec === "bilgi" || sec === "info" || sec === "i") {
      let ID = args[1]
      if (!ID || isNaN(ID)) return client.message(client.normalEmbed(`Geçerli bir toplantı ID'si gir ve tekrar dene!`, msg), msg.channel.id)
      let res = await ToplantıDatabase.findOne({guildID: msg.guild.id, toplantıID: ID})  
      if (!res) return client.message(client.normalEmbed(`Bu ID'ye sahip bir toplantı bulamıyorum geçerli bir ID gir ve tekrar dene!`, msg), msg.channel.id)
     
      msg.channel.send(
       new MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true}))
        .setColor("RANDOM")
        .setDescription(`**${res.toplantıBaşlık}** Başlıklı toplantı bilgisi. `)
        .addField(`❯ Toplantı Detayları`,`\`⦁\` Düzenleyen: ${msg.author} (\`${msg.author.id}\`)\n\`⦁\` Başlık: **${res.toplantıBaşlık}**\n\`⦁\` ID: **#${res.toplantıID}**\n\`⦁\` Durum: ${res.toplantıDurum === true ? "**Aktif**": "**Kapalı**"}\n\`⦁\` Katılanlar: **${prefix.replace("\`⦁\`", "")}toplantı katılanlar ${ID}**\n\`⦁\` Katılmayanlar: **${prefix.replace("\`⦁\`", "")}toplantı katılmayanlar ${ID}**\n\`⦁\` Rol: **${msg.guild.roles.cache.get(res.toplantıRol).name}** (\`${res.toplantıRol}\`)\n\`⦁\` Kanal: **${msg.guild.channels.cache.get(res.toplantıChannel).name}** (\`${res.toplantıChannel}\`)\n\`⦁\` Tarih: **${moment(res.toplantıDate).locale("TR").format("LLL")}**`))           
     
   } else if (sec === "liste") {
     await ToplantıDatabase.find({ guildID: msg.guild.id }).sort({ toplantıID: "descending" }).exec(async (err, res) => {
       
    let datax = [["ID", "Tarih", "Düzenleyen", "Başlık", "Durum"]];
    let dataxe = [["ID", "Tarih", "Düzenleyen", "Başlık", "Durum"]];
       
    let config = {
     border: {
      topBody: ``,
      topJoin: ``,
      topLeft: ``,
      topRight: ``,
      bottomBody: ``,
      bottomJoin: ``,
      bottomLeft: ``,
      bottomRight: ``,
      bodyLeft: `│`,
      bodyRight: `│`,
      bodyJoin: `│`,
      joinBody: ``,
      joinLeft: ``,
      joinRight: ``,
      joinJoin: ``}}
       
    res.map(x => { datax.push([x.toplantıID, moment(x.toplantıDate).locale("TR").format("LLL"), client.users.cache.get(x.authorID).tag, x.toplantıBaşlık, x.toplantıDurum === true ? `Aktif` : `Kapalı`]) })
    res.map(x => { dataxe.push([x.toplantıID, moment(x.toplantıDate).locale("TR").format("LLL"), client.users.cache.get(x.authorID).tag, x.toplantıBaşlık, x.toplantıDurum === true ? `Aktif` : `Kapalı`]) })
    let out = table(dataxe, config)       
    let outi = table(datax.slice(0, 10), config)      
    let currentPage = 1;
    const pageLimit = 15;
     msg.channel.send(''+msg.guild.name+' adlı sunucuda toplam '+res.length+' toplantı yapılmış son 10 toplantı aşağıda belirtilmiştir.Tüm toplantı bilgi dosyasını indirmek için 🚫 emojisine basabilirsin.Tekli bir toplantıya bakmak için \`!toplantı bilgi ID\` komutunu uygulayınız.```'+outi+'```').then(message => {
     message.react("🚫")
     message.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == '🚫'), { max: 1, time: 30000 }).then(async collected => {
    if (collected.first().emoji.name == '🚫') {
     message.channel.send(`${msg.guild.name} adlı sunucuda yapılan toplam ${datax.length} toplantı aşağıdaki belgede yazmaktadır.`, { files: [{ attachment: Buffer.from(out), name: `${msg.guild.name}toplantılar.txt` }] }).then(msg => {
     message.delete({ timeout: 5000 })})}})})})
   
   
   } else if (sec === "katıldı" || sec === "rol") {
    let res = await ToplantıDatabase.findOne({guildID: msg.guild.id, authorID: msg.author.id, toplantıDurum: true})  
    if (!res) return client.message(client.normalEmbed(`Başlattığın aktif bir toplantı bulunmuyor.`, msg), msg.channel.id)     
    const yesVegas = "✅";
    const noVegas = "❌";
    let yetkililer = msg.guild.members.cache.filter(y => y.roles.cache.has(res.toplantıRol));
    let islem = args[1];
    if (islem === "dağıt" || islem === "ver") {
     function bitArtikAmınaKoyduğumunToplantıKodu(r, u) {
      return [yesVegas, noVegas].includes(r.emoji.name) && u.id === author.id };
   let role = msg.guild.roles.cache.get(args[2]) || msg.mentions.roles.first();
   if (!role) return client.timemessage(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id, 5000);
   let ytler = yetkililer.filter(yetkili => yetkili.voice.channel && !yetkili.bot && msg.guild.members.cache.get(yetkili.id).voice.channel.id === author.voice.channel.id && !yetkili.roles.cache.get(role.id));
   if (ytler.size === 0) return client.timemessage(client.normalEmbed("Ses kanalında \`"+role.name+"\` rolünü vereceğim üye bulunmuyor.", msg), msg.channel.id, 5000);
    msg.channel.send(new MessageEmbed().setDescription(`\`${author.voice.channel.name}\` adlı ses kanalındaki üyelere \`${role.name}\` rolünü vermek istiyor musun?`).setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true})).setColor("RANDOM")).then(async msj => {
    await msj.react(yesVegas);
    await msj.react(noVegas);
    msj.awaitReactions(bitArtikAmınaKoyduğumunToplantıKodu, { max: 1, time: client.getDate(15, "saniye"), errors:["time"]}).then(async collected => {
     let cvp = collected.first();
  if (cvp.emoji.name === yesVegas) {
   await msj.delete();
   await msg.delete();
   await msg.channel.send(client.normalEmbed(`Başarıyla \`${ytler.size}\` adet kişiye \`${role.name}\` rolünü veriyorum.`, msg)).catch(() => {});
   ytler.map(y => y.roles.add(role.id));
  } else {
   await msj.delete().catch(() => { })
   client.timemessage(client.normalEmbed(`Komut başarıyla iptal edildi.`, msg), msg.channel.id, 5000);};}).catch(() => [msj.delete(), msg.delete()]);;});
  } else if (islem === "al" || islem === "topla") {
   function bitArtikAmınaKoyduğumunToplantıKodu(r, u) { return [yesVegas, noVegas].includes(r.emoji.name) && u.id === author.id };
  let role = msg.guild.roles.cache.get(args[2]) || msg.mentions.roles.first();
  if (!role) return client.message(client.normalEmbed(`Bir rol belirt ve tekrardan dene!`, msg), msg.channel.id, 5000);
  let ytler = msg.guild.members.cache.filter(u => u.roles.cache.get(role.id));
  if (ytler.size === 0) return client.message(client.normalEmbed("\`"+role.name+"\` rolüne sahip üye bulunmuyor.", msg), msg.channel.id, 5000);
   msg.channel.send(new MessageEmbed().setDescription(`Katıldı permine sahip tüm üyelerden katıldı permini almak istiyor musun?`).setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true})).setColor("RANDOM")).then(async msj => {
   await msj.react(yesVegas);
   await msj.react(noVegas);
   msj.awaitReactions(bitArtikAmınaKoyduğumunToplantıKodu, { max: 1, time: client.getDate(15, "saniye"), errors:["time"]}).then(async collected => {
  let cvp = collected.first();
  if (cvp.emoji.name === yesVegas) {
   await msj.delete();
   await msg.delete();
   await msg.channel.send(client.normalEmbed(`Başarıyla \`${ytler.size}\` adet kişiden \`${role.name}\` rolünü alıyorum.`, msg)).catch(() => {});
   ytler.map(y => y.roles.remove(role.id));} else {await msj.delete().catch(() => { })
  client.timemessage(client.normalEmbed(`Komut başarıyla iptal edildi.`, msg), msg.channel.id, 5000);};}).catch(() => [msj.delete(), msg.delete()]);;});};
   
  } else return msg.channel.send(
   new MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true}))
    .setColor("RANDOM")
    .setDescription(`Belirttiğiniz komut geçerli değil lütfen aşağıdaki verilere göre komutu uygulayınız.\n\n${prefix}toplantı başlat [Başlık] [Rol] [Ses Kanalı]\n${prefix}toplantı bitir\n${prefix}toplantı bilgi [ID]\n${prefix}toplantı liste\n${prefix}toplantı katıldı [al/ver] [rol]\n${prefix}toplantı katılanlar [ID]\n${prefix}toplantı katılmayanlar [ID]`)) }}
