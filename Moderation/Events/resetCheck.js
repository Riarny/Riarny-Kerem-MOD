const client = global.client;
const ControlsDatabase = require("../Models/Controls");
const { CronJob } = require("cron");
const SetupDatabase = require("../Models/Setup")
const StaffDatabase = require("../Models/Yetkili");
const cfg = require("../Configs/config.json")
const ms = require("ms")
const chatDatabase = require("../Models/Chat");

module.exports = async () => {
 
  const res = await SetupDatabase.findOne({})
  let guildID = res && res.guildID ? res.guildID : ""
  if (guildID === "") return
  const doc = await SetupDatabase.findOne({guildID: guildID})
  let guildName = doc && doc.guildName ? doc.guildName : "Juqest"
  const ControlsData = await ControlsDatabase.findOne({ guildID: guildID}); 
  let chat = doc && doc.chat ? doc.chat : ""
  let taggedRole = doc && doc.taggedRole ? doc.taggedRole : ""  
  let vipRole = doc && doc.taggedRole ? doc.taggedRole : ""  
  let boosterRole = doc && doc.taggedRole ? doc.taggedRole : ""  
  let guildTag = doc && doc.guildTag ? doc.guildTag : ""  
  let sponsorRole = doc && doc.sponsorRole ? doc.sponsorRole : ""  
  let musicianRole = doc && doc.musicianRole ? doc.musicianRole : "" 
  let unregisterRoles = doc && doc.unregisterRoles ? doc.unregisterRoles : []  
  let punitiveRole = doc && doc.punitiveRole ? doc.punitiveRole : ""
  let bannedTagRole = doc && doc.bannedTagRole ? doc.bannedTagRole : ""
  let newAccRole = doc && doc.newAccRole ? doc.newAccRole : ""
  let veriResetLog = doc && doc.veriResetLog ? doc.veriResetLog : ""  
  
  const checkTimeMorning = new CronJob("00 00 8 * * *", function() {
    
   if (client.channels.cache.get(chat)) client.channels.cache.get(chat).send('Günaydın '+guildName+'! 08:00')
    
  }, null, true, "Europe/Istanbul");
  checkTimeMorning.start();

  const checkTimeNight = new CronJob("00 00 00 * * *", function() {
    
   if (client.channels.cache.get(chat)) client.channels.cache.get(chat).send(`**───────────────────────────────────────**\n\`>\` Bugün de bitti, yeni gününüz sevdiklerinizle mutlu geçsin!\n\`>\`  Şunu asla unutmayın ki seviliyorsunuz ve değerlisiniz. İyi geceler!\n**───────────────────────────────────────**\n**[00.00]**`).then(Msg => Msg.react(`🌙`) && Msg.react(`🌟`));
   client.guilds.cache.forEach(async (guild) => {    
    if (guild.id === guildID) {
     await ControlsDatabase.updateMany({}, { $set: { guildMemberAddCountTotal: 0, guildMemberRemoveCountTotal: 0 } }, { upsert: true });
    }
   })
    
  }, null, true, "Europe/Istanbul");
  checkTimeNight.start();

  const checkTimeThree = new CronJob("00 00 3 * * *", function() {
    
   if (client.channels.cache.get(chat)) client.channels.cache.get(chat).send('Gece 3 oldu ya sen neden uyumuyorsun?')
    
  }, null, true, "Europe/Istanbul");
  checkTimeThree.start();

  const checkTimeEvening = new CronJob("00 00 18 * * *", function() {
    
   if (client.channels.cache.get(chat)) client.channels.cache.get(chat).send('İyi akşamlar '+guildName+'! 18:00')
   client.guilds.cache.forEach(async (guild) => {    
    if (guild.id === guildID) {
     await ControlsDatabase.updateMany({}, { $set: { guildMemberAddCount6Hours: 0, guildMemberRemoveCount6Hours: 0 } }, { upsert: true });
    }
   })
    
  }, null, true, "Europe/Istanbul");
  checkTimeEvening.start();
  
   const checkTime12 = new CronJob("00 00 12 * * *", function() {
    
    client.guilds.cache.forEach(async (guild) => {    
     if (guild.id === guildID) {
      await ControlsDatabase.updateMany({}, { $set: { guildMemberAddCount12Hours: 0, guildMemberRemoveCount12Hours: 0 } }, { upsert: true });
     }
    })
     
  }, null, true, "Europe/Istanbul");
  checkTime12.start();

  const weeklyCheck = new CronJob("00 00 00 * * 0", function() { 
    
   client.guilds.cache.forEach(async (guild) => {    
    if (guild.id === guildID) {
     if (client.channels.cache.get(veriResetLog)) client.channels.cache.get(veriResetLog).send(`${cfg.Emoji.TickEmoji} Başarıyla tüm üyelerin haftalık tag aldırma ve kayıt etme verileri sıfırlandı!\n───────────────`)
     await ControlsDatabase.updateMany({}, { $set: { haftalıkkayıt: 0, haftalıktaglı: 0 } }, { upsert: true });
    }
   })
    
  }, null, true, "Europe/Istanbul");
  weeklyCheck.start();
  
  const dailyCheck = new CronJob("00 00 00 * * *", function() {
    
   client.guilds.cache.forEach(async (guild) => {    
    if (guild.id === guildID) {
     if (client.channels.cache.get(veriResetLog)) client.channels.cache.get(veriResetLog).send(`${cfg.Emoji.TickEmoji} Başarıyla tüm üyelerin ban, jail, chat mute ve voice mute limitleri sıfırlandı!\n───────────────`)
     await StaffDatabase.updateMany({}, { $set: { banLimit: 0, jailLimit: 0, chatMuteLimit: 0, voiceMuteLimit: 0 } }, { upsert: true });
    }
   }) 
    
  }, null, true, "Europe/Istanbul");
  dailyCheck.start();
  
   setInterval(() => {
    minuteCheck();
   }, 60000);
  
   async function minuteCheck() {  
    client.guilds.cache.forEach(async (guild) => {   
     if (guild.id === guildID) { 
      if (client.channels.cache.get(veriResetLog)) client.channels.cache.get(veriResetLog).send(`${cfg.Emoji.TickEmoji} Başarıyla tüm üyelerin isim değiştirme ve kayıt etme limitleri sıfırlandı!\n───────────────`)
      await StaffDatabase.updateMany({}, { $set: { changeNameLimit: 0, registerLimit: 0} }, { upsert: true });
     }
   }) 
  }
  
   setInterval(() => {
    thirtyCheck();
   }, 1800000);

   async function thirtyCheck() {  
    client.guilds.cache.forEach(async (guild) => {   
     if (guild.id === guildID) { 
      if (client.channels.cache.get(veriResetLog)) client.channels.cache.get(veriResetLog).send(`${cfg.Emoji.TickEmoji} Başarıyla tüm üyelerin chat guard limitleri sıfırlandı!\n───────────────`)
      await chatDatabase.updateMany({}, { $set: { linkCount: 0, capsCount: 0, tagCount: 0, emojiCount: 0, msgLimitCount: 0, swearCount: 0} }, { upsert: true });
     }
   }) 
  }
  
  const taggedCheck = new CronJob("00 00 00 * * *", function() {
    
   client.guilds.cache.get(guildID).members.cache.filter(x => !x.user.bot && x.user.username.includes(guildTag) && !x.roles.cache.has(taggedRole)).array().forEach((a, index) => {
   setTimeout(() => {
    a.roles.add(taggedRole).catch(() => { })
   }, index*3000);
   });
    
  }, null, true, "Europe/Istanbul");  
  taggedCheck.start();

  const taggedUserCheck = new CronJob("00 00 00 * * *", function() {
    
   if (ControlsData && ControlsData.taglıalım === "Açık") {
    if (guildTag === "") return
    if (taggedRole === "") return
    if (unregisterRoles.length === 0) return
    client.guilds.cache.get(guildID).members.cache.filter(uye => !uye.roles.cache.has(vipRole) && !uye.roles.cache.has(boosterRole) && !uye.roles.cache.has(musicianRole) && !uye.roles.cache.has(bannedTagRole) && !uye.roles.cache.has(newAccRole) && !uye.user.bot && !uye.roles.cache.has(punitiveRole) && !uye.user.username.includes(guildTag) && !uye.roles.cache.has(sponsorRole) && !uye.roles.cache.has(unregisterRoles)).array().forEach((uye, index) => {
    client.setRoles(uye.id, unregisterRoles)
   });
   }
    
  }, null, true, "Europe/Istanbul");  
  taggedUserCheck.start();

}

module.exports.conf = {
  name: "ready",
};
