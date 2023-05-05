const cfg = require("../Configs/config.json");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment");
const client = global.client;
const GeneralDatabase = require("../Models/General");
const SetupDatabase = require("../Models/Setup")

module.exports = async(member, role) => {
 
  try {
  if (member.user.bot) return;
  const res = await SetupDatabase.findOne({guildID: member.guild.id})
  let rolLog = res && res.rolLog ? res.rolLog : ""
  const entry = await member.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first())
  if(entry.executor.bot) return;
  let GeneralData = await GeneralDatabase.findOne({ guildID: member.guild.id, userID: member.id})
  if(!GeneralData) {let newGeneralDatabase = new GeneralDatabase({guildID: member.guild.id, userID: member.id, rollogtotal: 1, rollog: [{role: `${cfg.Emoji.RedEmoji} Rol: ${role} Yetkili: ${entry.executor}\nTarih: ${moment(Date.now()).locale("TR").format("LLL")}`}]}).save();} else{
  GeneralData.rollog.push({role: `${cfg.Emoji.RedEmoji} Rol: ${role} Yetkili: ${entry.executor}\nTarih: ${moment(Date.now()).locale("TR").format("LLL")}`}); 
  await GeneralDatabase.findOneAndUpdate({ guildID: member.guild.id, userID: member.id}, { $inc: { rollogtotal: 1 } }, { upsert: true })
  GeneralData.save();}
  if (client.channels.cache.get(rolLog)) client.channels.cache.get(rolLog).send(new MessageEmbed().addField("Alan Kişi", `${entry.executor} (\`${entry.executor.tag}\` - \`${entry.executor.id}\`)`, false).addField("Alınan Rol", `${role} (\`${role.name}\` - \`${role.id}\`)`, false).addField("Alınan Tarih", `${moment(Date.now()).locale("TR").format("LLL")}`, false).setDescription(`${member} (\`${member.user.tag}\` - \`${member.id}\`) kişisinden bir rol alındı.`).setThumbnail(entry.executor.avatarURL({dynamic:true})).setColor(role.hexColor).setAuthor(entry.executor.tag, entry.executor.avatarURL({dynamic:true})))} catch(err) {{}}}

module.exports.conf = {
  name: "guildMemberRoleRemove",
};
