const cfg = require("../Configs/config.json");
const Discord = require("discord.js");
const client = global.client;
const database = require("../Models/Seviye");
const SetupDatabase = require("../Models/Setup");

module.exports = async (msg) => { 

  if (msg.author.bot || !msg.guild) return;
  let res = await database.findOne({guildID: msg.guild.id, userID: msg.author.id})
  const setup = await SetupDatabase.findOne({guildID: msg.guild.id})
  let levelLog = setup && setup.levelLog ? setup.levelLog : ""
  let msgs = res ? res.msgs : 0
  let xp = res ? res.xp : 0
  let lvl = res ? res.lvl : 0
  let xpToLvl = res ? res.xpToLvl : 0
   await database.findOneAndUpdate({guildID: msg.guild.id, userID: msg.author.id}, {$inc: {msgs: 1}}, {upsert:true})
  if (lvl === 0) {
   await database.findOneAndUpdate({guildID: msg.guild.id, userID: msg.author.id}, {$set: {xp: 5, lvl: 1, xpToLvl: 100}}, {upsert:true})
  } else {
   var random = Math.random() * (5 - 2) + 2;
   await database.findOneAndUpdate({guildID: msg.guild.id, userID: msg.author.id}, {$inc: {xp: random.toFixed()}}, {upsert:true})    
  let doc = await database.findOne({guildID: msg.guild.id, userID: msg.author.id}) 
  if ((doc ? doc.xp : 0) > (doc ? doc.xpToLvl : 0)) {
   await database.findOneAndUpdate({guildID: msg.guild.id, userID: msg.author.id}, {$inc: {lvl: 1, xpToLvl: -xp}}, {upsert:true})
   let q = await database.findOne({guildID: msg.guild.id, userID: msg.author.id}) 
   await database.findOneAndUpdate({guildID: msg.guild.id, userID: msg.author.id}, {$inc: {xpToLvl: (q ? q.lvl : 0) * 100}}, {upsert:true})
   await database.findOneAndUpdate({guildID: msg.guild.id, userID: msg.author.id}, {$set: {xp: 1}}, {upsert:true})
   let qq = await database.findOne({guildID: msg.guild.id, userID: msg.author.id}) 
   let lvl = qq ? qq.lvl : 0
   if (client.channels.cache.has(levelLog)) msg.guild.channels.cache.get(levelLog).send(`🎉 Tebrikler ${msg.author}; Başarıyla __metin__ kanallarında **${lvl}** level oldun!`)
   msg.reply(`sunucumuzda **${lvl}** seviyesine ulaştın. ${cfg.Emoji.YıldızEmoji}`).then((x) => x.delete({ timeout: 10000 })).catch(() => { })
   client.roleControl(lvl, msg.author)}}  
  
}

module.exports.conf = {
  name: "message",
};