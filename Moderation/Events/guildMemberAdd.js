const { MessageEmbed }= require("discord.js");
const CezaDatabase = require("../Models/Ceza");
const CezaSayıDatabase = require("../Models/CezaSayı");
const client = global.client;
const ControlsDatabase = require("../Models/Controls");
const CezaExtraRolesDatabase = require("../Models/ExtraCeza");
const moment = require("moment");
const SetupDatabase = require("../Models/Setup")

module.exports = async(member) => {
 
  const res = await SetupDatabase.findOne({guildID: member.guild.id})
  let log = res && res.joinLeaveLog ? res.joinLeaveLog : ""
  let mutedRole = res && res.mutedRole ? res.mutedRole : ""
  let bannedTagRole = res && res.bannedTagRole ? res.bannedTagRole : ""
  let bannedTagLog = res && res.bannedTagLog ? res.bannedTagLog : ""
  let boosterTrue = res && res.boosterRole ? res.boosterRole : ""
  let punitiveRole = res && res.punitiveRole ? res.punitiveRole : ""
  
  await ControlsDatabase.findOneAndUpdate({guildID: member.guild.id}, {$inc: {guildMemberAddCountTotal: 1, guildMemberAddCount12Hours: 1, guildMemberAddCount6Hours: 1}}, {upsert:true})
  if (client.channels.cache.get(log)) client.channels.cache.get(log).send(new MessageEmbed().setDescription(`${member} sunucuya katıldı.\n\nHesap Kurulma: **${moment(member.user.createdAt).locale("TR").format("LLL")} (${moment(member.user.createdAt).locale("TR").fromNow()})**\n\n\`\`\`Kullanıcı: ${member.user.tag} (${member.id})\nSunucuya Katılma: ${moment(Date.now()).locale("TR").format("LLL")}\`\`\``).setThumbnail(member.user.avatarURL({dynamic:true})).setAuthor(member.user.tag, member.user.avatarURL({dynamic:true})).setColor("GREEN"))
  
  let CezaData = await CezaDatabase.findOne({ guildID: member.guild.id, userID: member.id, chatmuted: true}) 
  if (CezaData && CezaData.chatmuted === true) {
  if (mutedRole === "") return
  await member.roles.add(mutedRole).catch(() => { })
  CezaData.chatmuted = false
  CezaData.save()}
   
  let CezaDataa = await CezaDatabase.findOne({ guildID: member.guild.id, userID: member.id, voicemuted: true}) 
  if((CezaDataa && CezaDataa.voicemuted === true) && member.voice.channel) {
  member.voice.setMute(true).catch(() => { })
  CezaDataa.voicemuted = false
  CezaDataa.save()}
  
  const JailData = await CezaDatabase.findOne({ guildID: member.guild.id, userID: member.id, jail: true})
  if(JailData && JailData.jail === true) {
  if (boosterTrue === "") return
  if (punitiveRole === "") return
  member.roles.cache.has(boosterTrue) ?  member.roles.set([boosterTrue, punitiveRole]) : member.roles.set([punitiveRole])
  let CezaDatax2 = await CezaDatabase.findOne({ guildID: member.guild.id, userID: member.id, jail: true}) 
  CezaDatax2.jail = false
  CezaDatax2.save()}

  const JailDatax2 = await CezaDatabase.findOne({ guildID: member.guild.id, userID: member.id, jail3days: true})
  if(JailDatax2 && JailDatax2.jail3days === true) {
  if (punitiveRole === "") return
  if (boosterTrue === "") return
  member.roles.cache.has(boosterTrue) ?  member.roles.set([boosterTrue, punitiveRole]) : member.roles.set([punitiveRole])
  let RolesData = await CezaExtraRolesDatabase.findOne({ guildID: member.guild.id, userID: member.id})
  if(RolesData) {RolesData.delete()}
  let CezaDatax2 = await CezaDatabase.findOne({ guildID: member.guild.id, userID: member.id, jail3days: true}) 
  CezaDatax2.jail3days = false
  CezaDatax2.save()}
  
  let YasaklıTagData = await ControlsDatabase.findOne({ guildID: member.guild.id})
  let yasakTaglar = YasaklıTagData && YasaklıTagData.yasaklıtag;
  if(YasaklıTagData && yasakTaglar.some(tag => member.user.tag.includes(tag))) {
  if (bannedTagRole === "") return
  member.roles.set([bannedTagRole])
  member.setNickname('Yasaklı Tag');
  if (client.channels.cache.get(bannedTagLog)) client.channels.cache.get(bannedTagLog).send(new MessageEmbed().setAuthor(member.guild.name, member.guild.iconURL({dynamic: true})).setColor("RANDOM").setDescription(`${member} üyesi sunucuya katıldı fakat sunucumuzun yasaklı taglar listesinde bulunan bir tagı isminde bulundurduğu için cezalıya atmak zorunda kaldım.`));
  member.send("İsminde bulunan yasaklı tagdan dolayı sunucumuzda yasaklı taga atıldın. İsmindeki yasaklı tagı kaldırarak sunucumuza erişim sağlayabilirsin. Eğer her hangi bir problemin varsa üst yöneticilerimize ulaşmaktan çekinme !").catch(() => { });}
}

module.exports.conf = {
  name: "guildMemberAdd",
};
