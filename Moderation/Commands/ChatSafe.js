module.exports = {
  conf: {
    aliases: ["chatsafe","chatwhite"],
    name: "chatgüvenli",
    serverowner: true
  },

  run: async ({client, msg, args, guild, ChatGuardDatabase, uye, cfg, prefix}) => {
    
    let seçenek = args[0] 
    const data = await ChatGuardDatabase.findOne({ guildID: guild});
    if(!seçenek) return client.timemessage(client.normalEmbed(`Lütfen tüm argümanları doğru giriniz!\nÖrnek Kullanım: ${prefix}chatsafe {user}`, msg), msg.channel.id, 5000)
    if(seçenek.toLowerCase() === "liste" || seçenek.toLowerCase() === "list"){client.message(client.normalEmbed(`Chat Guard Güvenli Üyeleri:\n\n ${data && data.Safe ? `${data.Safe.map((x ,i) => `\`${i+1}.\` <@!${x}> - (\`${x}\`)`).join('\n')}`: '**Veritabanında güvenli üye bulunamadı.**'}`, msg), msg.channel.id)
    }else{  
    if (!uye) return client.timemessage(client.normalEmbed(`Lütfen tüm argümanları doğru giriniz!\nÖrnek Kullanım: ${prefix}guardsafe {user}`, msg), msg.channel.id, 5000)
    if (!data) {client.message(client.normalEmbed(`${uye} üyesi başarıyla güvenli veritabanına eklendi!`, msg), msg.channel.id);new ChatGuardDatabase({guildID: msg.guild.id, Safe: uye.id}).save();} else {
    let Safe = data.Safe;
    if(Safe.includes(uye.id)) {client.message(client.normalEmbed(`${uye} üyesi başarıyla güvenli veritabanından çıkarıldı!`, msg), msg.channel.id);Safe.remove(uye.id);data.save();return}client.message(client.normalEmbed(`${uye} üyesi başarıyla güvenli veritabanına eklendi!`, msg), msg.channel.id); Safe.push(uye.id);data.save();}}}}