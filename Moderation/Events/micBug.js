const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const ms = require("ms");
const client = global.client;
const Discord = require("discord.js");
const GeneralDatabase = require("../Models/General");
const VoiceMuteDatabase = require("../Models/VoiceMute");
const SetupDatabase = require("../Models/Setup")

module.exports = async (oldState, newState) => {

  const res = await GeneralDatabase.findOne({guildID: newState.guild.id, userID: newState.member.user.id})
  const setup = await SetupDatabase.findOne({guildID: newState.guild.id})
  let voiceMuteLog = res && res.voiceMuteLog ? res.voiceMuteLog : ""
  let botCommandsChannel = res && res.botCommandsChannel ? res.botCommandsChannel : ""
  
  if (newState.member.hasPermission(8)) return
  if (oldState.channelID && !oldState.selfMute && newState.selfMute) {
   let date = res ? Date.now()-res.micBugDate : 0 
   let count = res ? res.micBugCount : 0

  if (date === 0) {
    await GeneralDatabase.findOneAndUpdate({guildID: newState.guild.id, userID: newState.member.user.id}, {$set: { micBugDate: Date.now(), micBugCount: 1}}, {upsert:true}) 
  }
    
  if (date !== 0) {
   if (60000 > date) {
    await GeneralDatabase.findOneAndUpdate({guildID: newState.guild.id, userID: newState.member.user.id}, {$inc: { micBugCount: 1}}) 
  } else {
   await GeneralDatabase.findOneAndUpdate({guildID: newState.guild.id, userID: newState.member.user.id}, {$set: { micBugDate: Date.now(), micBugCount: 1}}, {upsert:true}) 
  } 
  }
    
   let doc = await GeneralDatabase.findOne({guildID: newState.guild.id, userID: newState.member.user.id})
   
   if ((doc ? doc.micBugCount : 0) === 4) {
    await GeneralDatabase.findOneAndUpdate({guildID: newState.guild.id, userID: newState.member.user.id}, {$set: { micBugDate: 0, micBugCount: 0}}, {upsert:true})      
    const data = await VoiceMuteDatabase.findOne({ guildID: newState.guild.id, userID: newState.member.user.id, voicemuted: true})
    if (!data) {
     if (client.channels.cache.get(voiceMuteLog)) client.channels.cache.get(voiceMuteLog).send(`:hourglass_flowing_sand: ${newState.member.user} Mic bugu yaptığın tespit edildiği için ses kanallarında 40 saniye susturuldun.`)
     if (client.channels.cache.get(botCommandsChannel)) client.channels.cache.get(botCommandsChannel).send(`!vmute ${newState.member.user.id} 40s Mic bugu yaptığı tespit edildi.`)

    } else {
 
     if (client.channels.cache.get(voiceMuteLog)) client.channels.cache.get(voiceMuteLog).send(`:hourglass_flowing_sand: ${newState.member.user} Mic bugu yaptığın tespit edildiği için susturulma sürene + 40 saniye daha eklendi.`)
     let time = require("humanize-duration")(ms(`40s`), { language: "tr", round: true, conjunction: ", ", serialComma: false}) 
     let zmn = data.finishDate+ms(`40s`)
     data.time = time
     data.finishDate = zmn
     data.save()
      
    }
   
   }}
  
}
module.exports.conf = {
  name: "voiceStateUpdate"
};
