const cfg = require("../Configs/config.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const client = global.client;
const SetupDatabase = require("../Models/Setup")

module.exports = async (oldMsg, newMsg) => {
 
  const res = await SetupDatabase.findOne({guildID: newMsg.guild.id})
  let messageLog = res && res.messageLog ? res.messageLog : ""
  if (oldMsg.content === newMsg.content) return;
  if (client.channels.cache.get(messageLog)) client.channels.cache.get(messageLog).send(new MessageEmbed().setThumbnail(oldMsg.author.avatarURL({dynamic:true})).setColor("RANDOM").setDescription(`${oldMsg.author} üyesi ${oldMsg.channel} kanalında bir mesajını düzenledi.\n\n**__Eski Mesaj__:** \`${oldMsg.content}\`\n**__Düzenlenen Mesaj__:** \`${newMsg.content}\`\n\n\`\`\`Kanal: ${oldMsg.channel.name} (${oldMsg.channel.id})\nKullanıcı: ${oldMsg.author.tag} (${oldMsg.author.id})\nMesaj ID: ${oldMsg.id}\nMesaj Atılış: ${moment(oldMsg.createdTimestamp+10800000).locale("TR").format("LLL")}\`\`\``).setAuthor(newMsg.author.tag, newMsg.author.avatarURL({dynamic:true})))
                                                   
}
module.exports.conf = {
  name: "messageUpdate"
};
