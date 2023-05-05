const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const client = global.client;
const cfg = require("../Configs/config.json");
const menüCfg = require("../Configs/Menü.js");

module.exports = async (menü) => {
  
  let member = client.guilds.cache.get(menü.guild.id).members.cache.get(menü.clicker.member.id)
  let guild = client.guilds.cache.get(menü.guild.id)
  let add = []
  let remove = []
  let addText = ""
  let removeText = ""
   menü.values.forEach(async(a) => {
    if (member.roles.cache.has(a)) {
     member.roles.remove(a)
     remove.push(a)
  }
   if (!member.roles.cache.has(a)) {
    member.roles.add(a) 
    add.push(a)
  }
 })
  if (add.length >= 1) addText += `Aşağıdaki roller başarıyla üstünüze eklendi:\n\n• ${add.map(x => guild.roles.cache.get(x).name).join("\n• ")}`
  if (remove.length >= 1) removeText += `Aşağıdaki roller başarıyla üstünüzden alındı:\n\n• ${remove.map(x => guild.roles.cache.get(x).name).join("\n• ")}`
  await menü.reply.send(`${addText}\n\n${removeText}`, true);
  
}

module.exports.conf = {
  name: "clickMenu",
};