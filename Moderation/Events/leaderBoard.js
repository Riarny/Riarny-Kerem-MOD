const client = global.client;
const StatDatabase = require("../Models/Stat");
const Database = require("../Models/Yetkili");
const InviteDatabase = require("../Models/Invite");
const moment = require("moment");
const { MessageEmbed } = require("discord.js");
const SetupDatabase = require("../Models/Setup")

module.exports = async () => {

  const res = await SetupDatabase.findOne({})
  let guildID = res && res.guildID ? res.guildID : ""
  if (guildID === "") return
  const doc = await SetupDatabase.findOne({guildID: guildID})
  let guildName = doc && doc.guildName ? doc.guildName : "Challenger"
  let chatStatsLeaderBoardMessageID = res && res.chatStatsLeaderBoardMessageID ? res.chatStatsLeaderBoardMessageID : ""
  let voiceStatsLeaderBoardMessageID = res && res.voiceStatsLeaderBoardMessageID ? res.voiceStatsLeaderBoardMessageID : ""
  let taggedStatsLeaderBoardMessageID = res && res.taggedStatsLeaderBoardMessageID ? res.taggedStatsLeaderBoardMessageID : ""
  let inviteStatsLeaderBoardMessageID = res && res.inviteStatsLeaderBoardMessageID ? res.inviteStatsLeaderBoardMessageID : ""
  let registerStatsLeaderBoardMessageID = res && res.registerStatsLeaderBoardMessageID ? res.registerStatsLeaderBoardMessageID : ""
  let leaderBoard = res && res.leaderBoard ? res.leaderBoard : ""
  if (leaderBoard === "" || chatStatsLeaderBoardMessageID === "" || voiceStatsLeaderBoardMessageID === "" || taggedStatsLeaderBoardMessageID === "" || inviteStatsLeaderBoardMessageID === "" || registerStatsLeaderBoardMessageID === "") return
  let chatMsg = await client.guilds.cache.get(guildID).channels.cache.get(leaderBoard).messages.fetch(chatStatsLeaderBoardMessageID);
  let voiceMsg = await client.guilds.cache.get(guildID).channels.cache.get(leaderBoard).messages.fetch(voiceStatsLeaderBoardMessageID);
  let taggedMsg = await client.guilds.cache.get(guildID).channels.cache.get(leaderBoard).messages.fetch(taggedStatsLeaderBoardMessageID);
  let inviteMsg = await client.guilds.cache.get(guildID).channels.cache.get(leaderBoard).messages.fetch(inviteStatsLeaderBoardMessageID);
  let registerMsg = await client.guilds.cache.get(guildID).channels.cache.get(leaderBoard).messages.fetch(registerStatsLeaderBoardMessageID);

  let intervalCount = 1800000 //1800000
  
  setInterval(() => {
  checkChat()
  }, intervalCount)
  
  setInterval(() => {
  checkVoice()
  }, intervalCount)
  
  setInterval(() => {
  checkTagged()
  }, intervalCount)
  
  setInterval(() => {
  checkInvite()
  }, intervalCount)

  setInterval(() => {
  checkRegister()
  }, intervalCount)

  function checkChat() { 
  StatDatabase.find({ SunucuID: guildID }, async (err, res) => {
  res = res.filter(x => client.guilds.cache.get(guildID).members.cache.get(x.userID));
  const msgList = res.filter(x => x && x.MessageNumber !== 0).sort((x, y) => y.MessageNumber - x.MessageNumber).map((val, i) =>`\`${i + 1}.\` ${client.guilds.cache.get(guildID).members.cache.get(val.userID)}: ${val.MessageNumber} Mesaj`).splice(0, 30).join("\n");
  let chat = new MessageEmbed()
  chat.setColor("BLACK")
  chat.setAuthor(`${guildName} Mesaj Sıralaması | Tüm Zamanlar`, client.guilds.cache.get(guildID).iconURL({dynamic:true}))
  chat.setFooter(`Güncellenme: ${moment(Date.now()).locale("TR").format("LLL")}`)
  chat.setDescription(`${msgList.length === 0 ? `Veritabanında kayıtlı mesaj verisi yok bu yüzden bilgileri gösteremiyorum.` : msgList}` )
  chatMsg.edit(chat)})}
  
  function checkVoice() {  
   StatDatabase.find({ SunucuID: guildID }, async (err, res) => {
  res = res.filter(x => client.guilds.cache.get(guildID).members.cache.get(x.userID));
  const voiceList = res.filter(x => x && x.VoiceNumber !== 0).sort((x, y) => y.VoiceNumber - x.VoiceNumber).map((val, i) =>`\`${i + 1}.\` ${client.guilds.cache.get(guildID).members.cache.get(val.userID)}: ${client.parseTime(val.VoiceNumber)}`).splice(0, 30).join("\n");
  let voice = new MessageEmbed()
  voice.setColor("BLACK")
  voice.setAuthor(`${guildName} Ses Sıralaması | Tüm Zamanlar`, client.guilds.cache.get(guildID).iconURL({dynamic:true}))
  voice.setFooter(`Güncellenme: ${moment(Date.now()).locale("TR").format("LLL")}`)
  voice.setDescription(`${voiceList.length === 0 ? `Veritabanında kayıtlı ses verisi yok bu yüzden bilgileri gösteremiyorum.` : voiceList}` )
  voiceMsg.edit(voice);})}
  
  function checkTagged() {  
   Database.find({ guildID: guildID }, async (err, res) => {
  res = res.filter(x => client.guilds.cache.get(guildID).members.cache.get(x.userID));
  const voiceList = res.filter(x => x && x.tagaldıtotal !== 0).sort((x, y) => y.tagaldıtotal - x.tagaldıtotal).map((val, i) =>`\`${i + 1}.\` ${client.guilds.cache.get(guildID).members.cache.get(val.userID)}: Toplamda **${val.tagaldıtotal}** üyeye tag aldırmış.`).splice(0, 30).join("\n");
  let voice = new MessageEmbed()
  voice.setColor("BLACK")
  voice.setAuthor(`${guildName} Tag Aldırma Sıralaması | Tüm Zamanlar`, client.guilds.cache.get(guildID).iconURL({dynamic:true}))
  voice.setFooter(`Güncellenme: ${moment(Date.now()).locale("TR").format("LLL")}`)
  voice.setDescription(`${voiceList.length === 0 ? `Veritabanında kayıtlı tag aldırma verisi yok bu yüzden bilgileri gösteremiyorum.` : voiceList}` )
  taggedMsg.edit(voice);})}
  
  function checkInvite() {  
   InviteDatabase.find({ guildID: guildID }, async (err, res) => {
  res = res.filter(x => client.guilds.cache.get(guildID).members.cache.get(x.userID));
  const inviteList = res.filter(x => x && x.total !== 0).sort((x, y) => y.total - x.total).map((val, i) =>`\`${i + 1}.\` ${client.guilds.cache.get(guildID).members.cache.get(val.userID)}: Toplamda **${val.total}** daveti var. (**${(val.regular-val.leave-val.fake) > 0 ? (val.regular-val.leave-val.fake) : 0}** regular, **${val.bonus}** bonus, **${val.fake}** fake, **${val.leave}** ayrılan)`).splice(0, 30).join("\n");
  let invite = new MessageEmbed()
  invite.setColor("BLACK")
  invite.setAuthor(`${guildName} Invite Sıralaması | Tüm Zamanlar`, client.guilds.cache.get(guildID).iconURL({dynamic:true}))
  invite.setFooter(`Güncellenme: ${moment(Date.now()).locale("TR").format("LLL")}`)
  invite.setDescription(`${inviteList.length === 0 ? `Veritabanında kayıtlı invite verisi yok bu yüzden bilgileri gösteremiyorum.` : inviteList}` )
  inviteMsg.edit(invite);})}
  
  function checkRegister() {    
   Database.find({ guildID: guildID }, async (err, res) => {
  res = res.filter(x => client.guilds.cache.get(guildID).members.cache.get(x.userID));
  const registerList = res.filter(x => x && x.toplamkayıt !== 0).sort((x, y) => y.toplamkayıt - x.toplamkayıt).map((val, i) =>`\`${i + 1}.\` ${client.guilds.cache.get(guildID).members.cache.get(val.userID)}: Toplamda **${val.toplamkayıt}** kayıtı var (Erkek: **${val.erkekkayıt}**, Kadın: **${val.kızkayıt}**)`).splice(0, 30).join("\n");
  let reg = new MessageEmbed()
  reg.setColor("BLACK")
  reg.setAuthor(`${guildName} Kayıt Sıralaması | Tüm Zamanlar`, client.guilds.cache.get(guildID).iconURL({dynamic:true}))
  reg.setFooter(`Güncellenme: ${moment(Date.now()).locale("TR").format("LLL")}`)
  reg.setDescription(`${registerList.length === 0 ? `Veritabanında kayıtlı kayıt verisi yok bu yüzden bilgileri gösteremiyorum.` : registerList}` )
  registerMsg.edit(reg);})}

}

module.exports.conf = {
  name: "ready",
};