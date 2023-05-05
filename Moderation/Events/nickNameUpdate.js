const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const client = global.client;
const SetupDatabase = require("../Models/Setup")

module.exports = async (member, old, nev) => {

  const res = await SetupDatabase.findOne({guildID: member.guild.id})
  let nickNameLog = res && res.nickNameLog ? res.nickNameLog : ""
  if (client.channels.cache.get(nickNameLog)) client.channels.cache.get(nickNameLog).send(new MessageEmbed().setDescription(`${member} üyesinin sunucu ismi değiştirildi.\n\nNick Değişimi:\nÖnce: ${old ? old : member.user.username}\nSonra: ${nev ? nev : member.user.username}\n\n\`\`\`Kullanıcı: ${member.user.tag} (${member.id})\nDeğişim Tarihi: ${moment(Date.now()).locale("TR").format("LLL")}\`\`\``).setThumbnail(member.user.avatarURL({dynamic:true})).setAuthor(member.user.tag, member.user.avatarURL({dynamic:true})).setColor("GREEN")) 
  
}

module.exports.conf = {
  name: "guildMemberNicknameUpdate",
};
