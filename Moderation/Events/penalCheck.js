const { MessageEmbed } = require("discord.js");
const client = global.client;
const Discord = require("discord.js");
const CezaDatabase = require("../Models/Ceza");
const SetupDatabase = require("../Models/Setup")
const moment = require("moment");
const CezalıRolesDatabase = require("../Models/Cezalı");
const CezaExtraRolesDatabase = require("../Models/ExtraCeza");
const StaffDatabase = require("../Models/Yetkili");
const ControlsDatabase = require("../Models/Controls");
const YetkiliKayıtDatabase = require("../Models/YetkiliKayıt");

module.exports = async() => {
  
  setInterval(async() => {
   CezaDatabase.find({voicemuted: true, Type: "Voice Mute"}, async(err, muteData) => {
    if ((!muteData) || (muteData.length < 1)) return null;
    for (var muteler of muteData) {
     const res = await SetupDatabase.findOne({})
     let guildID = res && res.guildID ? res.guildID : ""
     if (guildID === "") return
     const doc = await SetupDatabase.findOne({guildID: guildID})
     let voiceMuteLog = doc && doc.voiceMuteLog ? doc.voiceMuteLog : ""
     let uye = client.guilds.cache.get(guildID).members.cache.get(muteler.userID);
     if (Date.now() >= muteler.finishDate) { 
      muteler.voicemuted = false
      muteler.save()
      if (uye && uye.voice.channel && uye.voice.serverMute) {
       uye.voice.setMute(false)  
       if (client.channels.cache.get(voiceMuteLog)) client.channels.cache.get(voiceMuteLog).send(new MessageEmbed().setFooter(`Ceza Numarası: #${muteler.cezaID}`).setDescription(`${uye} (\`${uye.id}\`) üyesinin ses kanallarında bulunan susturulması kaldırıldı.\n\n• Mute Atılma: \`${moment(muteler.date).locale("TR").format("LLL")}\`\n• Mute Bitiş: \`${moment(muteler.finishDate).locale("TR").format("LLL")}\`\n• Süre: \`${muteler.time}\`\n\n• Sebep: \`${muteler.Reason}\``).setAuthor(uye.user.tag, uye.user.avatarURL({dynamic:true})).setColor("GREEN"))
      }
  } else {
      if (uye && uye.voice.channel && !uye.voice.serverMute) uye.voice.setMute(true)
    }
   }
  })
}, 5000);

  setInterval(async() => {
   CezaDatabase.find({chatmuted: true, Type: "Chat Mute"}, async(err, muteData) => {
    if ((!muteData) || (muteData.length < 1)) return null;
    for (var muteler of muteData) {
     const res = await SetupDatabase.findOne({})
     let guildID = res && res.guildID ? res.guildID : ""
     if (guildID === "") return
     const doc = await SetupDatabase.findOne({guildID: guildID})
     let chatMuteLog = res && res.chatMuteLog ? res.chatMuteLog : ""
     let mutedRole = res && res.mutedRole ? res.mutedRole : ""
     if (mutedRole === "") return
     let uye = client.guilds.cache.get(guildID).members.cache.get(muteler.userID);
     if (Date.now() >= muteler.finishDate) { 
      muteler.chatmuted = false
      muteler.save()
     if (client.channels.cache.get(chatMuteLog)) client.channels.cache.get(chatMuteLog).send(new MessageEmbed().setFooter(`Ceza Numarası: #${muteler.cezaID}`).setDescription(`${uye} (\`${uye.user.tag}\` - \`${uye.id}\`) üyesinin ${muteler.time} sürelik metin kanallarındaki susturulması otomatik olarak kaldırıldı.\n\n• Chat Mute Atılma: \`${moment(muteler.date).locale("TR").format("LLL")}\`\n• Chat Mute Bitiş: \`${moment(muteler.finishDate).locale("TR").format("LLL")}\`\n• Chat Mute Sebebi: \`${muteler.Reason}\``).setAuthor(uye.user.tag, uye.user.avatarURL({dynamic:true})).setColor("GREEN"))
     if (uye && uye.roles.cache.has(mutedRole)) uye.roles.remove(mutedRole).catch(() => {})
  } else {
     if (uye && !uye.roles.cache.has(mutedRole)) uye.roles.add(mutedRole).catch(() => {})
   }
  }
 })
} , 5000)

  setInterval(async() => {
   CezaDatabase.find({jail: true, Type: "Jail"}, async(err, jailData) => {
    if ((!jailData) || (jailData.length < 1)) return null;
    for (var jailler of jailData) {
     const res = await SetupDatabase.findOne({})
     let guildID = res && res.guildID ? res.guildID : ""
     if (guildID === "") return
     const doc = await SetupDatabase.findOne({guildID: guildID})
     let punitiveRole = res && res.punitiveRole ? res.punitiveRole : ""
     let boosterRole = res && res.punitiveRole ? res.punitiveRole : ""
     let unregisterRoles = res && res.unregisterRoles ? res.unregisterRoles : []
     if (boosterRole === "" || punitiveRole === "") return
     let uye = client.guilds.cache.get(guildID).members.cache.get(jailler.userID);
     if (!uye) return
     if (Date.now() >= jailler.finishDate) { 
      jailler.jail = false
      jailler.save()
     let RolesData = await CezalıRolesDatabase.findOne({ guildID: guildID, userID: uye.id})
     if (uye && uye.roles.cache.has(punitiveRole)) {
     if (RolesData && RolesData.roles) {
      uye.roles.remove(punitiveRole)
      uye.roles.add(RolesData.roles)
      RolesData.delete()
   } else {
     if (unregisterRoles.length === 0) return
      client.setRoles(uye.id, unregisterRoles)
    }
   }
  } else {
     if (uye && !uye.roles.cache.has(punitiveRole)) uye.roles.cache.has(boosterRole) ?  uye.roles.set([boosterRole, punitiveRole]) : uye.roles.set([punitiveRole])
     }
    }
   })
  }, 5000);
  
  setInterval(async() => {
   let tarih = Date.now()
   CezaDatabase.find({jail3days: true, Type: "Jail"}, async(err, jailData) => {
    if ((!jailData) || (jailData.length < 1)) return null;
    for (var jailler of jailData) {
     const res = await SetupDatabase.findOne({})
     let guildID = res && res.guildID ? res.guildID : ""
     if (guildID === "") return
     const doc = await SetupDatabase.findOne({guildID: guildID})
     let punitiveRole = res && res.punitiveRole ? res.punitiveRole : ""
     let boosterRole = res && res.punitiveRole ? res.punitiveRole : ""
     let unregisterRoles = res && res.unregisterRoles ? res.unregisterRoles : []
     let uye = client.guilds.cache.get(guildID).members.cache.get(jailler.userID);
     if (Date.now() >= jailler.finishDate) { 
      jailler.jail3days = false
      jailler.save()
     let RolesData = await CezaExtraRolesDatabase.findOne({ guildID: guildID, userID: uye.id})
     if (uye && uye.roles.cache.has(punitiveRole)) {
     if (RolesData && RolesData.roles) {
      uye.roles.remove(punitiveRole)
      uye.roles.add(RolesData.roles)
      RolesData.delete()
  } else {
      client.setRoles(uye.id, unregisterRoles)
  } 
  }
  } else {
    if (uye && !uye.roles.cache.has(punitiveRole)) uye.roles.cache.has(boosterRole) ?  uye.roles.set([boosterRole, punitiveRole]) : uye.roles.set([punitiveRole])
     }
    }
   })
  }, 5000);
  
  setInterval(async() => {
   const res = await SetupDatabase.findOne({})
   let guildID = res && res.guildID ? res.guildID : ""
   if (guildID === "") return
   let YasaklıTagData = await ControlsDatabase.findOne({ guildID: guildID})
   let yasakTaglar = YasaklıTagData && YasaklıTagData.yasaklıtag;
   if (!yasakTaglar) return
   let StaffData = await StaffDatabase.findOne({ guildID: guildID})
   const doc = await SetupDatabase.findOne({guildID: guildID})
   let boosterRole = doc && doc.boosterRole ? doc.boosterRole : ""
   let bannedTagRole = doc && doc.bannedTagRole ? doc.bannedTagRole : ""
   if (bannedTagRole === "" || boosterRole === "") return
    client.guilds.cache.get(guildID).members.cache.filter(a => !a.user.bot && !a.roles.cache.has(bannedTagRole) && yasakTaglar.some(tag => a.user.tag.includes(tag))).array().forEach(async(b, index) => {
    b.roles.cache.has(boosterRole) ? b.roles.set([boosterRole, bannedTagRole]) : b.roles.set([bannedTagRole]);
    if (b.voice.channel) b.voice.kick();
  })
  }, 1800000)
  
  setInterval(() => {
   checkKayıtsız();
  }, 1800000);
  
  async function checkKayıtsız() {
   const res = await SetupDatabase.findOne({})
   let guildID = res && res.guildID ? res.guildID : ""
   if (guildID === "") return
   let StaffData = await StaffDatabase.findOne({ guildID: guildID})
   const doc = await SetupDatabase.findOne({guildID: guildID})
   let unregisterRoles = doc && doc.unregisterRoles ? doc.unregisterRoles : []  
   if (unregisterRoles) client.guilds.cache.get(guildID).members.cache.filter(a => a.roles.cache.size === 1).array().forEach((b, index) => 
    setTimeout(() => {
     b.roles.add(unregisterRoles).catch(() => { }); 
  }, index*1000));
  }

  setInterval(async() => {
   YetkiliKayıtDatabase.find({mod: true}, async(err, kayıtData) => {
    if ((!kayıtData) || (kayıtData.length < 1)) return null;
    for (var kayıtlar of kayıtData) {
     const res = await SetupDatabase.findOne({})
     let guildID = res && res.guildID ? res.guildID : ""
     if (guildID === "") return
     let StaffDatax2 = await YetkiliKayıtDatabase.findOne({ guildID: guildID, authorID: kayıtlar.authorID})
     StaffDatax2.delete();
  }
  })
  }, 15000);
  
}

module.exports.conf = {
  name: "ready",
};