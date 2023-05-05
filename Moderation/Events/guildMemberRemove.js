const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const client = global.client;
const RegisterDatabase = require("../Models/Register");
const SetupDatabase = require("../Models/Setup")
const ControlsDatabase = require("../Models/Controls");

module.exports = async member => {

  const res = await SetupDatabase.findOne({guildID: member.guild.id})
  let log = res && res.joinLeaveLog ? res.joinLeaveLog : ""
  let unregisterRole = res && res.unregisterRoles ? res.unregisterRoles : []  
  
  await ControlsDatabase.findOneAndUpdate({guildID: member.guild.id}, {$inc: {guildMemberRemoveCountTotal: 1, guildMemberRemoveCount12Hours: 1, guildMemberRemoveCount6Hours: 1}}, {upsert:true})
  if (client.channels.cache.get(log)) client.channels.cache.get(log).send(new MessageEmbed().setDescription(`${member} sunucudan ayrıldı.\n\nHesap Kurulma: **${moment(member.user.createdAt).locale("TR").format("LLL")} (${moment(member.user.createdAt).locale("TR").fromNow()})**\n\n\`\`\`Kullanıcı: ${member.user.tag} (${member.id})\nSunucuya Katılma: ${moment(member.user.joinedAt).locale("TR").format("LLL")}\`\`\`\n Sunucudan ayrıldığında ki rolleri:\n${member.roles.cache.filter(r => r.name !== "@everyone").map(r => r).join(", ")}`).setThumbnail(member.user.avatarURL({dynamic:true})).setAuthor(member.user.tag, member.user.avatarURL({dynamic:true})).setColor("RED"))

  if (unregisterRole.length === 0) return
  if (member.roles.cache.some(r => unregisterRole.includes(r.id))) return;
  await RegisterDatabase.findOneAndUpdate({ guildID: member.guild.id, userID: member.id}, { $inc: { isimlerayrılma: 1 } }, { upsert: true })     
  const RegisterData = await RegisterDatabase.findOne({ guildID: member.guild.id, userID: member.id});
  if(!RegisterData) {let newRegisterDatabase = new RegisterDatabase({guildID: member.guild.id, userID: member.id, authorID: member.id, isimler: [{ name: `${member.displayName}`, type: `Sunucudan Ayrılma`, staff: client.user.id }]}).save();} else{
  RegisterData.isimler.push({ name: `${member.displayName}`, type: `Sunucudan Ayrılma`, staff: client.user.id }); 
  RegisterData.save();}}

module.exports.conf = {
  name: "guildMemberRemove",
};
