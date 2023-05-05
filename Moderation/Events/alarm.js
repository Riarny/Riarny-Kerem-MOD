const { MessageEmbed } = require("discord.js");
const client = global.client;
const Discord = require("discord.js");
const AlarmDatabase = require("../Models/Alarm");
const SetupDatabase = require("../Models/Setup")

module.exports = async() => {
  
  setInterval(async() => {
   let muted = await AlarmDatabase.find({ "alarm": true, "endDate": { $lte: Date.now() } })
   
   muted.forEach(async memberdata => {
    const res = await SetupDatabase.findOne({})
    let guildID = res && res.guildID ? res.guilID : ""
    if (guildID === "") return
    let sunucu = client.guilds.cache.get(guildID)
    if (!sunucu) return;
    let member = sunucu.members.cache.get(memberdata.user) || await sunucu.members.cacahe.fetch(memberdata.user).catch((err) => {
     AlarmDatabase.deleteOne({ user: memberdata.user }, async (err) => {
      if (err) { { } }
    })
     { }
    });
     
    if (!member) return;
    let kanal = sunucu.channels.cache.get(memberdata.channel)
     kanal.send(":alarm_clock: | <@!" + member + "> `" + memberdata.sebep + "` sebebi ile alarm kurmamı istemiştin.")
    let mem = sunucu.members.cache.get(memberdata.user)
     mem.send(":alarm_clock: | <@!" + member + "> `" + memberdata.sebep + "` sebebi ile alarm kurmamı istemiştin.")
     AlarmDatabase.deleteOne({ user: memberdata.user }, async (err) => {
    if (err) { { } }
    })
   });
  } , 1000)
  
}

module.exports.conf = {
  name: "ready",
};