module.exports = {
  conf: {
    aliases: ["n","ses-bilgi","nerede","seskontrol"],
    name: "sesbilgi",
    usage: 'sesbilgi',
    description: 'Belirttiğiniz kullanıcının hangi ses kanalında olduğuna dair bilgi alırsınız.',
},

 run: async ({client, msg, args, author, MessageEmbed, uye, moment, VoiceJoinedDateDatabase, SetupDatabase}) => {
        
   const res = await SetupDatabase.findOne({guildID: msg.guild.id})
   let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : []  
   let tagged = res && res.taggedRole ? res.taggedRole : ""
   if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.has(tagged)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)                              
    
   if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 7000)
   if (!uye.voice.channel) return client.timemessage(client.normalEmbed("<@" + uye.id + "> bir ses kanalına bağlı değil.", msg), msg.channel.id, 7000)
   let mic = uye.voice.selfMute == true ? "kapalı" : "açık"
   let hop = uye.voice.selfDeaf == true ? "kapalı" : "açık"
   let data = await VoiceJoinedDateDatabase.findOne({ userID: uye.id})
   let süre = data && data.date ? data.date : Date.now()
   client.message(client.normalEmbed("<@" + uye.id + "> kişisi " + uye.voice.channel.name + " kanalında. Mikrofonu " + mic + ", kulaklığı " + hop + ".\n───────────────\nKullanıcı <#"+ uye.voice.channel +"> kanalına "+moment(süre).locale(`TR`).fromNow()+" giriş yapmış.", msg), msg.channel.id)}}