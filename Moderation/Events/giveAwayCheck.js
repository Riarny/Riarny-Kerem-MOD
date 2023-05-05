const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const client = global.client;
const VoiceJoinedDateDatabase = require("../Models/VoiceJoined.js")
const SetupDatabase = require("../Models/Setup")

module.exports = async (msg) => {

  if(msg.content.includes("Congratulations")) {  
   let args = msg.content.split(" ");
   let members;
    if (msg.mentions.members.size >= 1) {
     members = msg.mentions.members.map(r => r.id);
   } else {
    if (!members) return
    members = args.splice(0, 1).map(id => msg.guild.members.cache.get(id)).filter(r => r != undefined);
  }
   members.map(async(a) => {
   let member;
   member = msg.guild.members.cache.get(a)
   if (!member.voice.channel) return msg.channel.send(new MessageEmbed().setColor(member.displayHexColor).setAuthor(`Kazanan Ses Kontrol`, member.user.avatarURL({dynamic:true})).setDescription("<@" + member.id + "> bir ses kanalına bağlı değil."))
   let mic = member.voice.selfMute == true ? "kapalı" : "açık"
   let hop = member.voice.selfDeaf == true ? "kapalı" : "açık"
   let data = await VoiceJoinedDateDatabase.findOne({ userID: member.id})
   let süre = data && data.date ? data.date : Date.now()
    msg.channel.send(new MessageEmbed().setColor(member.displayHexColor).setAuthor(`Kazanan Ses Kontrol`, member.user.avatarURL({dynamic:true})).setDescription("<@" + member.id + "> kişisi " + member.voice.channel.name + " kanalında. Mikrofonu " + mic + ", kulaklığı " + hop + ".\n───────────────\nKullanıcı <#"+ member.voice.channel +"> kanalına "+moment(süre).locale(`TR`).fromNow()+" giriş yapmış."))
  })
  }
 }

module.exports.conf = {
  name: "message",
};
