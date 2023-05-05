const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const client = global.client;
const humanizeDuration = require("humanize-duration")
const StreamerDatabase = require("../Models/Streamer");
const SetupDatabase = require("../Models/Setup")
const GeneralDatabase = require("../Models/General");

module.exports = async (oldState, newState) => {
  

  try {
   if (!oldState.channelID && newState.channelID) {
   let GeneralData = await GeneralDatabase.findOne({ guildID: newState.member.guild.id, userID: newState.member.id})
   const res = await SetupDatabase.findOne({guildID: newState.member.guild.id})
   let channels = res && res.AgeLimits ? res.AgeLimits : []  
   let streamerCezalıLog = res && res.streamerCezalıLog ? res.streamerCezalıLog : ""  
   let streamerPunishedRole = res && res.streamerPunishedRole ? res.streamerPunishedRole : ""  
   if (newState.member.bot) return
   if (newState.member.hasPermission(8)) return
    if (!newState.member.nickname && !newState.member.nickname.includes("|") && !isNaN(newState.member.nickname.split("| ")[1] || "")) return
    if (!channels.includes(newState.member.voice.channelID)) return 
    if (Number(newState.member.nickname.split("| ")[1]) < 18) { 
     newState.member.voice.setChannel(null)
     await GeneralDatabase.findOneAndUpdate({ guildID: newState.member.guild.id, userID: newState.member.id}, { $inc: { streamer18: 1 } }, { upsert: true })
   if (GeneralData && GeneralData.streamer18+1 === 3) {
    await GeneralDatabase.findOneAndUpdate({ guildID: newState.member.guild.id, userID: newState.member.id}, { $set: { streamer18: 0 } }, { upsert: true })
    if (newState.member.guild.roles.cache.get(streamerPunishedRole)) newState.member.roles.add(streamerPunishedRole)
    if (client.channels.cache.get(streamerCezalıLog)) client.channels.cache.get(streamerCezalıLog).send(`${newState.member} üyesi **18 yaşından** küçük olmasına rağmen +18 kanallara giriş yaptığından dolayı sesten atıldı! Girdiği kanal: ${newState.channel.name}`)
   return
     }
    }
   }
  } catch { { } }
  

  try{
   const res = await SetupDatabase.findOne({guildID: newState.member.guild.id})
   let streamerDenetim = res && res.streamerDenetim ? res.streamerDenetim : ""  
   let StreamerData = await StreamerDatabase.findOne({ guildID: newState.member.guild.id, userID: newState.member.id})
   if (!StreamerData) {
    if (newState.member.voice.streaming) { 
     let Streamer = await new StreamerDatabase({guildID: newState.member.guild.id, userID: newState.member.id, date: Date.now()}).save()                                  
  } return;
    return
  }
   if (StreamerData) {
   if (newState.member.voice.streaming === false) {
    let süre = `${humanizeDuration(Date.now() - StreamerData.date, {largest: 2, round: true}).replace("second", "saniye").replace("seconds", "saniye").replace("minute", "dakika").replace("minutes", "dakika").replace("hour", "saat").replace("hours", "saat").replace("day", "gün").replace("week", "hafta").replace("month", "ay").replace("year", "yıl").replace("haftas", "hafta").replace("güns", "gün").replace("ays", "ay").replace("yıls", "yıl").replace("dakikas", "dakika").replace("saats", "saat").replace("saniyes", "saniye")}`
    if (client.channels.cache.get(streamerDenetim)) client.channels.cache.get(streamerDenetim).send(new MessageEmbed().setFooter(`📑 Yayına ${moment(StreamerData.date).locale("TR").fromNow()} önce başlamış.`).setDescription(`>  \`>\` ${newState.guild.members.cache.get(newState.id)} - (\`${newState.id}\`) kullanıcısı **${süre}** yayın yapmış.\n>  \n>  \`>\` Başlangıç Tarihi: **${moment(StreamerData.date).locale("TR").format("LLL")}**\n>  \n>  \`>\` Yayın yaptığı kanal: \`${newState.guild.channels.cache.get(oldState.channelID).name} - (${oldState.channelID})\` `).setAuthor(newState.member.user.tag, newState.member.user.avatarURL({dynamic:true})).setColor(0x2F3136)) 
    StreamerData.delete()
  }
   return
  }
  } catch { { } }
  
}
module.exports.conf = {
  name: "voiceStateUpdate"
};
