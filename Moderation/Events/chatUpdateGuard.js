const SetupDatabase = require("../Models/Setup")
const moment = require("moment");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const client = global.client;
const database = require("../Models/Chat");
const Database = require("../Models/ChatGuard");
const cfg = require("../Configs/config.json");
const userDatabase = require("../Models/Seviye");

module.exports = async (old, nev) => {

  const res = await database.findOne({ guildID: nev.guild.id, userID: nev.author.id });
  const doc = await Database.findOne({ guildID: nev.guild.id });
  const setup = await SetupDatabase.findOne({ guildID: nev.guild.id });
  let chatGuardLog = setup && setup.chatGuardLog ? setup.chatGuardLog : ""
  let spotifyMode = setup && setup.spotifyMode ? setup.spotifyMode : false
  let capsMode = setup && setup.capsMode ? setup.capsMode : false
  let msgLimitMode = setup && setup.msgLimitMode ? setup.msgLimitMode : false
  let tagMode = setup && setup.tagMode ? setup.tagMode : false
  let linkMode = setup && setup.linkMode ? setup.linkMode : false
  let advertisementMode = setup && setup.advertisementMode ? setup.advertisementMode : false
  let swearMode = setup && setup.swearMode ? setup.swearMode : false
  let emojiMode = setup && setup.emojiMode ? setup.emojiMode : false
  let spotifyTrue = setup && setup.spotifyTrue ? setup.spotifyTrue : []
  let capsTrue = setup && setup.capsTrue ? setup.capsTrue : []
  let msgLimitTrue = setup && setup.msgLimitTrue ? setup.msgLimitTrue : []
  let tagTrue = setup && setup.tagTrue ? setup.tagTrue : []
  let linkTrue = setup && setup.linkTrue ? setup.linkTrue : []
  let advertisementTrue = setup && setup.advertisementTrue ? setup.advertisementTrue : []
  let swearTrue = setup && setup.swearTrue ? setup.swearTrue : []
  let emojiTrue = setup && setup.spotifyTrue ? setup.spotifyTrue : []
  let msgLimit = setup && setup.msgLimit ? setup.msgLimit : 500
  let advertisementLimit = setup && setup.advertisementLimit ? setup.advertisementLimit : 3
  let linkLimit = setup && setup.linkLimit ? setup.linkLimit : 3
  let capsLimit = setup && setup.capsLimit ? setup.capsLimit : 5
  let tagLimit = setup && setup.tagLimit ? setup.tagLimit : 5
  let msgLimitLimit = setup && setup.msgLimitLimit ? setup.msgLimitLimit : 5
  let swearLimit = setup && setup.msgLimitLimit ? setup.msgLimitLimit : 5
  let emojiLimit = setup && setup.emojiLimit ? setup.emojiLimit : 5
  
  if (!nev.member || safe(nev.member.id)) return;  
  if (nev.author.bot || !nev || !nev.content) return;
  
  if (capsMode === true) {
   if(!capsTrue.includes(nev.channel.id)) {
    let matched = nev.content.replace(/[^A-Z]/g, "").length
    let yüzde = client.capsCheck(matched, nev.content.length)
    if (Math.round(yüzde) > 50) {
    if (nev.content.length > 4) {
     nev.channel.msgDelete(nev)
   if (!res) {
    await new database({ guildID: nev.guild.id, userID: nev.author.id, linkCount: 0, capsCount: 1, tagCount: 0, emojiCount: 0, msgLimitCount: 0, swearCount: 0 }).save();
    nev.channel.wsend(`Büyük harf kullanımını azaltın. (> %${yüzde})\nKalan uyarı hakkınız: **${res ? capsLimit - res.capsCount - 1 : capsLimit}**`, nev)
   } else if ((res && res.capsCount ? res.capsCount+1 : 0) >= capsLimit) {
    client.addChatMute(nev.author.id, "Caps Limitini Aşmak", "3m", nev.guild.id, nev)
    await database.findOneAndUpdate( { guildID: nev.guild.id, userID: nev.author.id }, { $set: { capsCount: 0 } }, { upsert: true } )
   } else { 
    await database.findOneAndUpdate( { guildID: nev.guild.id, userID: nev.author.id }, { $inc: { capsCount: 1 } }, { upsert: true } )
     nev.channel.wsend(`Büyük harf kullanımını azaltın. (> %${yüzde})\nKalan uyarı hakkınız: **${res ? capsLimit - res.capsCount - 1 : capsLimit}**`, nev)
   }
     await userDatabase.findOneAndUpdate( { guildID: nev.guild.id, userID: nev.author.id }, { $inc: { caps: 1 } }, { upsert: true } )
    if (client.channels.cache.get(chatGuardLog)) client.channels.cache.get(chatGuardLog).send(new MessageEmbed().setDescription("<@!"+nev.author+"> üyesi <#"+nev.channel+"> kanalında **fazla büyük harf** içeren bir mesaj attı.\n\n**__Mesaj İçeriği:__** "+nev.content+"\n\n```Kanal: "+nev.channel.name+" ("+nev.channel.id+")\nKullanıcı: "+nev.author.tag+" ("+nev.author.id+")\nMesaj ID: "+nev.id+"\nMesaj Atılış: "+moment(nev.createdTimestamp).locale("TR").format("LLL")+"```").setAuthor(nev.author.tag, nev.author.avatarURL({dynamic:true})).setThumbnail(nev.author.avatarURL({dynamic:true})).setColor("RANDOM"))}}}}

  if (msgLimitMode === true) {
   if(!msgLimitTrue.includes(nev.channel.id)) {
   if(nev.content.length > msgLimit) {
    nev.channel.msgDelete(nev)
    await userDatabase.findOneAndUpdate( { guildID: nev.guild.id, userID: nev.author.id }, { $inc: { msgLimit: 1 } }, { upsert: true } )
   if (!res) {
    await new database({ guildID: nev.guild.id, userID: nev.author.id, linkCount: 0, capsCount: 0, tagCount: 0, emojiCount: 0, msgLimitCount: 1, swearCount: 0 }).save();
    nev.channel.wsend(`Mesaj limitini azaltın.\nKalan uyarı hakkınız: **${res ? msgLimitLimit - res.msgLimitCount - 1 : msgLimitLimit}**`, nev)
   } else if ((res && res.msgLimitCount ? res.msgLimitCount+1 : 0) >= msgLimitLimit) {
    client.addChatMute(nev.author.id, "Mesaj Limitini Aşmak", "3m", nev.guild.id, nev)
    await database.findOneAndUpdate( { guildID: nev.guild.id, userID: nev.author.id }, { $set: { msgLimitCount: 0 } }, { upsert: true } )
   } else { 
    await database.findOneAndUpdate( { guildID: nev.guild.id, userID: nev.author.id }, { $inc: { msgLimitCount: 1 } }, { upsert: true } )
    nev.channel.wsend(`Mesaj limitiniı azaltın.\nKalan uyarı hakkınız: **${res ? msgLimitLimit - res.msgLimitCount - 1 : msgLimitLimit}**`, nev)
   }  
   if (client.channels.cache.get(chatGuardLog)) client.channels.cache.get(chatGuardLog).send(new MessageEmbed().setDescription("<@!"+nev.author+"> üyesi <#"+nev.channel+"> kanalında **mesaj limiti aşan** bir mesaj attı.\n\n**__Mesaj İçeriği:__** "+nev.content+"\n\n```Kanal: "+nev.channel.name+" ("+nev.channel.id+")\nKullanıcı: "+nev.author.tag+" ("+nev.author.id+")\nMesaj ID: "+nev.id+"\nMesaj Atılış: "+moment(nev.createdTimestamp).locale("TR").format("LLL")+"```").setAuthor(nev.author.tag, nev.author.avatarURL({dynamic:true})).setThumbnail(nev.author.avatarURL({dynamic:true})).setColor("RANDOM"))}}}
    
  if (tagMode === true) {
   if(!tagTrue.includes(nev.channel.id)) {
   if ((nev.mentions.users.size+nev.mentions.roles.size) >= 5 || nev.mentions.channels.size >= 5) { 
    nev.channel.msgDelete(nev)
    await userDatabase.findOneAndUpdate( { guildID: nev.guild.id, userID: nev.author.id }, { $inc: { etiket: 1 } }, { upsert: true } )
   if (!res) {
    await new database({ guildID: nev.guild.id, userID: nev.author.id, linkCount: 0, capsCount: 0, tagCount: 1, emojiCount: 0, msgLimitCount: 0, swearCount: 0 }).save();
    nev.channel.wsend(`Etiket spam yapmayı azaltın.\nKalan uyarı hakkınız: **${res ? tagLimit - res.tagCount - 1 : tagLimit}**`, nev)
   } else if ((res && res.tagCount ? res.tagCount+1 : 0) >= tagLimit) {
    client.addChatMute(nev.author.id, "Etiket Spam Limitini Aşmak", "3m", nev.guild.id, nev)
    await database.findOneAndUpdate( { guildID: nev.guild.id, userID: nev.author.id }, { $set: { tagCount: 0 } }, { upsert: true } )
   } else { 
    await database.findOneAndUpdate( { guildID: nev.guild.id, userID: nev.author.id }, { $inc: { tagCount: 1 } }, { upsert: true } )
    nev.channel.wsend(`Etiket spam yapmayı azaltın.\nKalan uyarı hakkınız: **${res ? tagLimit - res.tagCount - 1 : tagLimit}**`, nev)
   }
   if (client.channels.cache.get(chatGuardLog)) client.channels.cache.get(chatGuardLog).send(new MessageEmbed().setDescription("<@!"+nev.author+"> üyesi <#"+nev.channel+"> kanalında **fazla etiket** içeren bir mesaj attı.\n\n**__Mesaj İçeriği:__** "+nev.content+"\n\n```Kanal: "+nev.channel.name+" ("+nev.channel.id+")\nKullanıcı: "+nev.author.tag+" ("+nev.author.id+")\nMesaj ID: "+nev.id+"\nMesaj Atılış: "+moment(nev.createdTimestamp).locale("TR").format("LLL")+"```").setAuthor(nev.author.tag, nev.author.avatarURL({dynamic:true})).setThumbnail(nev.author.avatarURL({dynamic:true})).setColor("RANDOM"))}}}

  if (linkMode === true) {
   if(!linkTrue.includes(nev.channel.id)) {
   let LinkControls = /(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi;  
   if (LinkControls.test(nev.content)) {
    nev.channel.msgDelete(nev)
    await userDatabase.findOneAndUpdate( { guildID: nev.guild.id, userID: nev.author.id }, { $inc: { link: 1 } }, { upsert: true } )
   if (!res) {
    await new database({ guildID: nev.guild.id, userID: nev.author.id, linkCount: 1, capsCount: 0, tagCount: 0, emojiCount: 0, msgLimitCount: 0, swearCount: 0 }).save();
    nev.channel.wsend(`Lütfen reklam yapmayınız devam ederseniz sunucudan yasaklanacaksınız.\nKalan uyarı hakkınız: **${res ? linkLimit - res.LinkCount - 1 : linkLimit}**`, nev)
   } else if ((res && res.linkCount ? res.linkCount+1 : 0) >= linkLimit) {
    punish(nev.author.id, "Ban")
    nev.channel.wsend(`Reklam yaptığınız için sunucudan yasaklandınız.`, nev)   
    await database.findOneAndUpdate( { guildID: nev.guild.id, userID: nev.author.id }, { $set: { linkCount: 0 } }, { upsert: true } )
   } else { 
    await database.findOneAndUpdate( { guildID: nev.guild.id, userID: nev.author.id }, { $inc: { linkCount: 1 } }, { upsert: true } )
    nev.channel.wsend(`Lütfen reklam yapmayınız devam ederseniz sunucudan yasaklanacaksınız.\nKalan uyarı hakkınız: **${res ? linkLimit - res.LinkCount - 1 : linkLimit}**`, nev)
   }
   if (client.channels.cache.get(chatGuardLog)) client.channels.cache.get(chatGuardLog).send(new MessageEmbed().setDescription("<@!"+nev.author+"> üyesi <#"+nev.channel+"> kanalında **link** içeren bir mesaj attı.\n\n**__Mesaj İçeriği:__** "+nev.content+"\n\n```Kanal: "+nev.channel.name+" ("+nev.channel.id+")\nKullanıcı: "+nev.author.tag+" ("+nev.author.id+")\nMesaj ID: "+nev.id+"\nMesaj Atılış: "+moment(nev.createdTimestamp).locale("TR").format("LLL")+"```").setAuthor(nev.author.tag, nev.author.avatarURL({dynamic:true})).setThumbnail(nev.author.avatarURL({dynamic:true})).setColor("RANDOM"))}}}
 
  if (swearMode === true) {
   if(!swearTrue.includes(nev.channel.id)) {
   if ((client.KüfürControls).some(word => new RegExp("(\\b)+(" + word + ")+(\\b)", "gui").test(nev.content))) {
    nev.channel.msgDelete(nev)
    await userDatabase.findOneAndUpdate( { guildID: nev.guild.id, userID: nev.author.id }, { $inc: { küfür: 1 } }, { upsert: true } )
   if (!res) {
    await new database({ guildID: nev.guild.id, userID: nev.author.id, linkCount: 0, capsCount: 0, tagCount: 0, emojiCount: 0, msgLimitCount: 0, swearCount: 1 }).save();
    nev.channel.wsend(`Küfür kullanımını azaltın.\nKalan uyarı hakkınız: **${res ? swearLimit - res.swearCount - 1 : swearLimit}**`, nev)
   } else if ((res && res.swearCount ? res.swearCount+1 : 0) >= swearLimit) {
    client.addChatMute(nev.author.id, "Küfür Limitini Aşmak", "3m", nev.guild.id, nev)
    await database.findOneAndUpdate( { guildID: nev.guild.id, userID: nev.author.id }, { $set: { swearCount: 0 } }, { upsert: true } )
   } else { 
    await database.findOneAndUpdate( { guildID: nev.guild.id, userID: nev.author.id }, { $inc: { swearCount: 1 } }, { upsert: true } )
     nev.channel.wsend(`Küfür kullanımını azaltın.\nKalan uyarı hakkınız: **${res ? swearLimit - res.swearCount - 1 : swearLimit}**`, nev)
   }
   if (client.channels.cache.get(chatGuardLog)) client.channels.cache.get(chatGuardLog).send(new MessageEmbed().setDescription("<@!"+nev.author+"> üyesi <#"+nev.channel+"> kanalında **küfür/hakaret** içeren bir mesaj attı.\n\n**__Mesaj İçeriği:__** "+nev.content+"\n\n```Kanal: "+nev.channel.name+" ("+nev.channel.id+")\nKullanıcı: "+nev.author.tag+" ("+nev.author.id+")\nMesaj ID: "+nev.id+"\nMesaj Atılış: "+moment(nev.createdTimestamp).locale("TR").format("LLL")+"```").setAuthor(nev.author.tag, nev.author.avatarURL({dynamic:true})).setThumbnail(nev.author.avatarURL({dynamic:true})).setColor("RANDOM"))}}}

  if (emojiMode === true) {
   if(!emojiTrue.includes(nev.channel.id)) {
   let nativeEmojisRegExp = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c\ude32-\ude3a]|[\ud83c\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
   let customEmojisRegExp = /<(?:a)?:[a-z0-9_-]{1,256}:[0-9]{16,19}>/gi;
   let nativeEmojis = nev.content.match(nativeEmojisRegExp) || [];
   let customEmojis = nev.content.match(customEmojisRegExp) || [];
   let emojis = nativeEmojis.concat(customEmojis);
   let cleanMessage = nev.content.replace(nativeEmojisRegExp, '');
    cleanMessage = cleanMessage.replace(customEmojisRegExp, '');
    cleanMessage = cleanMessage.trim();
   if (emojis.length > 5) {
   let emojiPercentage = emojis.length / (cleanMessage.length + emojis.length) * 100;
   if (emojiPercentage > 50) {
    nev.channel.msgDelete(nev)
    await userDatabase.findOneAndUpdate( { guildID: nev.guild.id, userID: nev.author.id }, { $inc: { emoji: 1 } }, { upsert: true } )
   if (!res) {
    await new database({ guildID: nev.guild.id, userID: nev.author.id, linkCount: 0, capsCount: 0, tagCount: 0, emojiCount: 1, msgLimitCount: 0, swearCount: 0 }).save();
    nev.channel.wsend(`Emoji spam yapmayı azaltın.\nKalan uyarı hakkınız: **${res ? emojiLimit - res.emojiCount - 1 : emojiLimit}**`, nev)
   } else if ((res && res.emojiCount ? res.emojiCount+1 : 0) >= emojiLimit) {
    client.addChatMute(nev.author.id, "Emoji Spam Limitini Aşmak", "3m", nev.guild.id, nev)
    await database.findOneAndUpdate( { guildID: nev.guild.id, userID: nev.author.id }, { $set: { emojiCount: 0 } }, { upsert: true } )
   } else { 
    await database.findOneAndUpdate( { guildID: nev.guild.id, userID: nev.author.id }, { $inc: { emojiCount: 1 } }, { upsert: true } )
     nev.channel.wsend(`Emoji spam yapmayı azaltın.\nKalan uyarı hakkınız: **${res ? emojiLimit - res.emojiCount - 1 : emojiLimit}**`, nev)
   }
   if (client.channels.cache.get(chatGuardLog)) client.channels.cache.get(chatGuardLog).send(new MessageEmbed().setDescription("<@!"+nev.author+"> üyesi <#"+nev.channel+"> kanalında **emoji spam** içeren bir mesaj attı.\n\n**__Mesaj İçeriği:__** "+nev.content+"\n\n```Kanal: "+nev.channel.name+" ("+nev.channel.id+")\nKullanıcı: "+nev.author.tag+" ("+nev.author.id+")\nMesaj ID: "+nev.id+"\nMesaj Atılış: "+moment(nev.createdTimestamp).locale("TR").format("LLL")+"```").setAuthor(nev.author.tag, nev.author.avatarURL({dynamic:true})).setThumbnail(nev.author.avatarURL({dynamic:true})).setColor("RANDOM"))}}}}

  function punish(kisiID, tur) {
   let vegas = nev.guild.members.cache.get(kisiID);
   if (!vegas) return;
   if (tur == "ban") return vegas.ban({ reason: "Juqest Chat Koruma" }).catch(() => { })}
  
  function safe(kisiID) {
   let vegas = nev.guild.members.cache.get(kisiID);
   let Owner = cfg.Bot.Owners || [];   
   if (!vegas || vegas.id === client.user.id || Owner.some(g => vegas.id === g) || vegas.id === vegas.guild.owner.id || (doc && doc.Safe.includes(vegas.id))) return true
   else return false}   
}

module.exports.conf = {
  name: "messageUpdate",
};