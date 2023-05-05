const cfg = require("../Configs/config.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const client = global.client;
const MsgDeleteDatabase = require("../Models/MessageDelete");
const SetupDatabase = require("../Models/Setup")

module.exports = async (msg) => {

  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let messageLog = res && res.messageLog ? res.messageLog : ""  
  let Attachment = (msg.attachments)
  if (Attachment){
  if (Attachment.array()[0]!==undefined){
  if (client.channels.cache.get(messageLog)) client.channels.cache.get(messageLog).send(new MessageEmbed().setThumbnail(msg.author.avatarURL({dynamic:true})).setColor("RANDOM").setDescription(`${msg.author} üyesi ${msg.channel} kanalında bir resim sildi.\n\n\`\`\`Kanal: ${msg.channel.name} (${msg.channel.id})\nKullanıcı: ${msg.author.tag} (${msg.author.id})\nMesaj ID: ${msg.id}\nMesaj Atılış: ${moment(msg.createdTimestamp+10800000).locale("TR").format("LLL")}\`\`\`\n**__Silinen Resim__:**`).setImage(Attachment.array()[0].proxyURL).setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true})))}}
 
  if (!msg || !msg.content) return;
  let MsgDeleteData = await MsgDeleteDatabase.findOne({guildID: msg.guild.id, channelID: msg.channel.id})
  if(!MsgDeleteData) {let newMsgData = new MsgDeleteDatabase({guildID: msg.guild.id, channelID: msg.channel.id, msg: [{userID: msg.author.id, msg: msg.content, date: Date.now()}]}).save();} else{
  MsgDeleteData.msg.push({userID: msg.author.id, msg: msg.content, date: Date.now()}); 
  MsgDeleteData.save();}
  if (client.channels.cache.get(messageLog)) client.channels.cache.get(messageLog).send(new MessageEmbed().setThumbnail(msg.author.avatarURL({dynamic:true})).setColor("RANDOM").setDescription(`${msg.author} üyesi ${msg.channel} kanalında mesajını sildi.\n\n **__Silinen Mesaj__:** \`${msg.content.replace("`", "")}\`\n\n\`\`\`Kanal: ${msg.channel.name} (${msg.channel.id})\nKullanıcı: ${msg.author.tag} (${msg.author.id})\nMesaj ID: ${msg.id}\nMesaj Atılış: ${moment(msg.createdTimestamp+10800000).locale("TR").format("LLL")}\`\`\``).setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true})))

}
module.exports.conf = {
  name: "messageDelete"
};
