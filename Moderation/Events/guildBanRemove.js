const { MessageEmbed } = require("discord.js");
const client = global.client;
const Discord = require("discord.js");
const AçılmazBanDatabase = require("../Models/AçılmazBan");
const CezaDatabase = require("../Models/Ceza");
const SetupDatabase = require("../Models/Setup")

module.exports = async(guild, user) => {
     
    const CezaData = await CezaDatabase.findOne({ guildID: guild.id, userID: user.id, ban: true})
    CezaData.ban = false
    CezaData.save() 
    await AçılmazBanDatabase.findOne({ user: user.id }, async (err, res) => {
    if (!res) return
    await guild.fetchAuditLogs({
     type: "MEMBER_BAN_REMOVE"}).then(async (audit) => {
    let ayar = audit.entries.first()
    let hedef = ayar.target
    let yapan = ayar.executor
    if (yapan.id == res.mod) {res.delete().catch(e => console.log(e))
    return} else {
    CezaData.ban = true
    CezaData.save()  
    guild.members.ban(user, { reason: res.sebep })}})})}

module.exports.conf = {
  name: "guildBanRemove",
};