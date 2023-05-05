const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const client = global.client;
const Discord = require("discord.js");
const SetupDatabase = require("../Models/Setup")

module.exports = async (old, nev) => {
 
  let mic = nev.member.voice.selfMute == true ? "**Kapalı**" : "**Açık**"
  let hop = nev.member.voice.selfDeaf == true ? "**Kapalı**" : "**Açık**"
  let sira = new Number()
  const res = await SetupDatabase.findOne({guildID: nev.member.guild.id})
  let voiceLog = res && res.voiceLog ? res.voiceLog : ""
  
  if (!old.channelID && nev.channelID) {
   if (client.channels.cache.get(voiceLog)) client.channels.cache.get(voiceLog).send(new MessageEmbed().setThumbnail(nev.member.user.avatarURL({dynamic:true})).setDescription(`${nev.member} üyesi <#${nev.guild.channels.cache.get(nev.channelID).id}> kanalına giriş yaptı.\n\nKanala Girdiği Anda:\nMikrofonu: ${mic}\nKulaklığı ${hop}\n\n\`\`\`Kanal: ${nev.guild.channels.cache.get(nev.channelID).name} (${nev.channelID})\nKullanıcı: ${nev.member.user.tag} (${nev.id})\nKanala Girme: ${moment(Date.now()).locale("TR").format("LLL")}\`\`\`\nGirdiği Kanalda Bulunan Üyeler:\n\n${nev.guild.channels.cache.get(nev.channelID).members.size === 0 ? `Kanalda hiç üye yok.` : nev.guild.channels.cache.get(nev.channelID).members.map((a, b) => `\`${sira++ === 0 ? 1 : sira++}.\` ${a} - \`${b}\``).slice(0, 20).join("\n")}${nev.guild.channels.cache.get(nev.channelID).members.size > 20 ? `${nev.guild.channels.cache.get(nev.channelID).members.size-20} daha...` : ``}`).setAuthor(nev.member.user.tag, nev.member.user.avatarURL({dynamic:true})).setColor("RANDOM")) 
  }
    
  if (old.channelID && !nev.channelID) {
   if (client.channels.cache.get(voiceLog)) client.channels.cache.get(voiceLog).send(new MessageEmbed().setThumbnail(nev.member.user.avatarURL({dynamic:true})).setDescription(`${nev.member} üyesi <#${old.guild.channels.cache.get(old.channelID).id}> kanalından ayrıldı.\n\nKanaldan Çıktığı Anda:\nMikrofonu: ${mic}\nKulaklığı ${hop}\n\n\`\`\`Kanal: ${old.guild.channels.cache.get(old.channelID).name} (${old.channelID})\nKullanıcı: ${nev.member.user.tag} (${nev.id})\nKanaldan Çıkma: ${moment(Date.now()).locale("TR").format("LLL")}\`\`\`\nKanalda Bulunan Üyeler:\n\n${old.guild.channels.cache.get(old.channelID).members.size === 0 ? `Kanalda hiç üye yok.` : old.guild.channels.cache.get(old.channelID).members.map((a, b) => `\`${sira++ === 0 ? 1 : sira++}.\` ${a} - \`${b}\``).slice(0, 20).join("\n")}${old.guild.channels.cache.get(old.channelID).members.size > 20 ? `${old.guild.channels.cache.get(old.channelID).members.size-20} daha...` : ``}`).setAuthor(nev.member.user.tag, nev.member.user.avatarURL({dynamic:true})).setColor("RANDOM"))
  }
    
  if (old.channelID && nev.channelID && old.channelID != nev.channelID) {
   if (client.channels.cache.get(voiceLog)) client.channels.cache.get(voiceLog).send(new MessageEmbed().setThumbnail(nev.member.user.avatarURL({dynamic:true})).setDescription(`${nev.member} üyesi <#${old.guild.channels.cache.get(old.channelID).id}> kanalından <#${nev.guild.channels.cache.get(nev.channelID).id}> kanalına geçiş yaptı.\n\nGeçiş Yaptığı Anda:\nMikrofonu: ${mic}\nKulaklığı ${hop}\n\n\`\`\`Eski Kanal: ${old.guild.channels.cache.get(old.channelID).name} (${old.channelID})\nYeni Kanal: ${nev.guild.channels.cache.get(nev.channelID).name} (${nev.channelID})\nKullanıcı: ${nev.member.user.tag} (${nev.id})\nGeçiş anı: ${moment(Date.now()).locale("TR").format("LLL")}\`\`\`\nEski Kanalında Bulunan Üyeler:\n\n${old.guild.channels.cache.get(old.channelID).members.size === 0 ? `Kanalda hiç üye yok.` : old.guild.channels.cache.get(old.channelID).members.map((a, b) => `\`${sira++ === 0 ? 1 : sira++}.\` ${a} - \`${b}\``).slice(0, 10).join("\n")}${old.guild.channels.cache.get(old.channelID).members.size > 10 ? `${old.guild.channels.cache.get(old.channelID).members.size-10} daha...` : ``}\n\nYeni Kanalında Bulunan Üyeler: \n\n${nev.guild.channels.cache.get(nev.channelID).members.size === 0 ? `Kanalda hiç üye yok.` : nev.guild.channels.cache.get(nev.channelID).members.map((a, b) => `\`${sira++ === 0 ? 1 : sira++}.\` ${a} - \`${b}\``).slice(0, 10).join("\n")}${nev.guild.channels.cache.get(nev.channelID).members.size > 10 ? `${nev.guild.channels.cache.get(nev.channelID).members.size-10} daha...` : ``}`).setAuthor(nev.member.user.tag, nev.member.user.avatarURL({dynamic:true})).setColor("RANDOM"))
  }
    
  if (old.channelID && old.selfMute && !nev.selfMute) {
   if (client.channels.cache.get(voiceLog)) client.channels.cache.get(voiceLog).send(new MessageEmbed().setThumbnail(nev.member.user.avatarURL({dynamic:true})).setDescription(`${nev.member} üyesi <#${nev.guild.channels.cache.get(nev.channelID).id}> kanalında susturmasını kaldırdı.\n\n\`\`\`Kanal: ${nev.guild.channels.cache.get(nev.channelID).name} (${nev.channelID})\nKullanıcı: ${nev.member.user.tag} (${nev.id})\nKaldırma Anı: ${moment(Date.now()).locale("TR").format("LLL")}\`\`\`\nKanalda Bulunan Üyeler:\n\n${nev.guild.channels.cache.get(nev.channelID).members.size === 0 ? `Kanalda hiç üye yok.` : nev.guild.channels.cache.get(nev.channelID).members.map((a, b) => `\`${sira++ === 0 ? 1 : sira++}.\` ${a} - \`${b}\``).slice(0, 20).join("\n")}${nev.guild.channels.cache.get(nev.channelID).members.size > 20 ? `${nev.guild.channels.cache.get(nev.channelID).members.size-20} daha...` : ``}`).setAuthor(nev.member.user.tag, nev.member.user.avatarURL({dynamic:true})).setColor("RANDOM"))
  }
    
  if (old.channelID && !old.selfMute && nev.selfMute) {
   if (client.channels.cache.get(voiceLog)) client.channels.cache.get(voiceLog).send(new MessageEmbed().setThumbnail(nev.member.user.avatarURL({dynamic:true})).setDescription(`${nev.member} üyesi <#${nev.guild.channels.cache.get(nev.channelID).id}> kanalında kendini susturdu.\n\n\`\`\`Kanal: ${nev.guild.channels.cache.get(nev.channelID).name} (${nev.channelID})\nKullanıcı: ${nev.member.user.tag} (${nev.id})\nSusturma Anı: ${moment(Date.now()).locale("TR").format("LLL")}\`\`\`\nKanalda Bulunan Üyeler:\n\n${nev.guild.channels.cache.get(nev.channelID).members.size === 0 ? `Kanalda hiç üye yok.` : nev.guild.channels.cache.get(nev.channelID).members.map((a, b) => `\`${sira++ === 0 ? 1 : sira++}.\` ${a} - \`${b}\``).slice(0, 20).join("\n")}${nev.guild.channels.cache.get(nev.channelID).members.size > 20 ? `${nev.guild.channels.cache.get(nev.channelID).members.size-20} daha...` : ``}`).setAuthor(nev.member.user.tag, nev.member.user.avatarURL({dynamic:true})).setColor("RANDOM"))
  }
    
  if (old.channelID && old.selfDeaf && !nev.selfDeaf) {
   if (client.channels.cache.get(voiceLog)) client.channels.cache.get(voiceLog).send(new MessageEmbed().setThumbnail(nev.member.user.avatarURL({dynamic:true})).setDescription(`${nev.member} üyesi <#${nev.guild.channels.cache.get(nev.channelID).id}> kanalında sağırlaştırmasını kaldırdı.\n\n\`\`\`Kanal: ${nev.guild.channels.cache.get(nev.channelID).name} (${nev.channelID})\nKullanıcı: ${nev.member.user.tag} (${nev.id})\nKaldırma Anı: ${moment(Date.now()).locale("TR").format("LLL")}\`\`\`\nKanalda Bulunan Üyeler:\n\n${nev.guild.channels.cache.get(nev.channelID).members.size === 0 ? `Kanalda hiç üye yok.` : nev.guild.channels.cache.get(nev.channelID).members.map((a, b) => `\`${sira++ === 0 ? 1 : sira++}.\` ${a} - \`${b}\``).slice(0, 20).join("\n")}${nev.guild.channels.cache.get(nev.channelID).members.size > 20 ? `${nev.guild.channels.cache.get(nev.channelID).members.size-20} daha...` : ``}`).setAuthor(nev.member.user.tag, nev.member.user.avatarURL({dynamic:true})).setColor("RANDOM"))
  }
    
  if (old.channelID && !old.selfDeaf && nev.selfDeaf) {
   if (client.channels.cache.get(voiceLog)) client.channels.cache.get(voiceLog).send(new MessageEmbed().setThumbnail(nev.member.user.avatarURL({dynamic:true})).setDescription(`${nev.member} üyesi <#${nev.guild.channels.cache.get(nev.channelID).id}> kanalında kendini sağırlaştırdı.\n\n\`\`\`Kanal: ${nev.guild.channels.cache.get(nev.channelID).name} (${nev.channelID})\nKullanıcı: ${nev.member.user.tag} (${nev.id})\nSağırlaştırma Anı: ${moment(Date.now()).locale("TR").format("LLL")}\`\`\`\nKanalda Bulunan Üyeler:\n\n${nev.guild.channels.cache.get(nev.channelID).members.size === 0 ? `Kanalda hiç üye yok.` : nev.guild.channels.cache.get(nev.channelID).members.map((a, b) => `\`${sira++ === 0 ? 1 : sira++}.\` ${a} - \`${b}\``).slice(0, 20).join("\n")}${nev.guild.channels.cache.get(nev.channelID).members.size > 20 ? `${nev.guild.channels.cache.get(nev.channelID).members.size-20} daha...` : ``}`).setAuthor(nev.member.user.tag, nev.member.user.avatarURL({dynamic:true})).setColor("RANDOM"))
  }
    
}
module.exports.conf = {
  name: "voiceStateUpdate"
};
