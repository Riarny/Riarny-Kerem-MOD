const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const client = global.client;
const Discord = require("discord.js");
const ms = require('ms')
const VoiceMuteDatabase = require("../Models/VoiceMute");
const CezaDatabase = require("../Models/Ceza");
const SetupDatabase = require("../Models/Setup")
const VoiceUnmuteDatabase = require("../Models/VoiceUnmute");

module.exports = async(oldState, newState) => {

    const res = await SetupDatabase.findOne({guildID: oldState.member.guild.id})
    let voiceMuteLog = res && res.voiceMuteLog ? res.voiceMuteLog : ""
    const VoiceUnmuteStatusData = await VoiceUnmuteDatabase.findOne({ guildID: oldState.member.guild.id, userID: oldState.member.id})
    if (!oldState.channelID) {
     if (VoiceUnmuteStatusData && VoiceUnmuteStatusData.unmutedurum === "Kaldırılamadı") {
     let author = client.users.cache.get(VoiceUnmuteStatusData && VoiceUnmuteStatusData.authorID)
     if (VoiceUnmuteStatusData) {VoiceUnmuteStatusData.delete()}
      newState.setMute(false)
    }}
    const VoiceMuteStatusData = await VoiceMuteDatabase.findOne({ guildID: oldState.member.guild.id, userID: oldState.member.id})
    if (!oldState.channelID) {
     if (VoiceMuteStatusData) { 
      const author = client.users.cache.get(VoiceMuteStatusData && VoiceMuteStatusData.authorID)
      const time = VoiceMuteStatusData && VoiceMuteStatusData.time
      const Reason = VoiceMuteStatusData && VoiceMuteStatusData.Reason
      const cezaID = VoiceMuteStatusData && VoiceMuteStatusData.cezaID
      const timereplace = VoiceMuteStatusData && VoiceMuteStatusData.timems
      const muteDate = VoiceMuteStatusData && VoiceMuteStatusData.date
      var tarih2 = ms(timereplace)
      var tarih3 = Date.now()+timereplace
       newState.setMute(true)
       if (client.channels.cache.get(voiceMuteLog)) client.channels.cache.get(voiceMuteLog).send(new MessageEmbed().setColor("RED").setFooter(`Ceza Numarası: #${cezaID}`).setAuthor(author.tag, author.avatarURL({dynamic:true})).setDescription(`<@${newState.id}> (\`${newState.id}\`) üyesinin ses kanallarındaki susturulması şimdi başlatıldı.\n\n• Mute Atılma: \`${moment(muteDate).locale('TR').format('LLL')}\`\n• Mute Bitiş: \`${moment(tarih3).locale('TR').format('LLL')}\`\n• Süre: \`${time}\`\n\n• Sebep: \`${Reason}\``)) 
       setTimeout(async() => {
        if (!newState.channelID) {
         if (client.channels.cache.get(voiceMuteLog)) client.channels.cache.get(voiceMuteLog).send(new MessageEmbed().setColor("GREEN").setFooter(`Ceza Numarası: #${cezaID}`).setAuthor(author.tag, author.avatarURL({dynamic:true})).setDescription(`<@${newState.id}> (\`${newState.id}\`) üyesi susturulması biteceği süre içinde sesli kanallarda bulunmadığı için süresi sıfırlandı, bir kanala girerse tekrar başlayacak.\n\n• Mute Atılma: \`${moment(muteDate).locale('TR').format('LLL')}\`\n• Mute Bitiş: \`${moment(tarih3).locale('TR').format('LLL')}\`\n• Süre: \`${time}\`\n\n• Sebep: \`${Reason}\``)) 
    } else if(newState.channelID) {
     newState.setMute(false)
     if (client.channels.cache.get(voiceMuteLog)) client.channels.cache.get(voiceMuteLog).send(new MessageEmbed().setFooter(`Ceza Numarası: #${cezaID}`).setDescription(`<@${newState.id}> (\`${newState.id}\`) üyesinin ses kanallarında bulunan susturulması kaldırıldı.\n\n• Mute Atılma: \`${moment(muteDate).locale("TR").format("LLL")}\`\n• Mute Bitiş: \`${moment(tarih3).locale("TR").format("LLL")}\`\n• Süre: \`${time}\`\n\n• Sebep: \`${Reason}\``).setAuthor(author.tag, author.avatarURL({dynamic:true})).setColor("GREEN"))
     let CezaData = await CezaDatabase.findOne({ guildID: oldState.member.guild.id, userID: oldState.member.id}) 
     CezaData.voicemuted = false
     CezaData.save()
     let VoiceMuteData = await VoiceMuteDatabase.findOne({ guildID: oldState.member.guild.id, userID: oldState.member.id})  
     if (VoiceMuteData) {VoiceMuteData.delete()}
     VoiceMuteStatusData.delete()}
    }, timereplace)}}}

module.exports.conf = {
  name: "voiceStateUpdate",
};
