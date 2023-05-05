const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const client = global.client;
const SetupDatabase = require("../Models/Setup")
const CezaDatabase = require("../Models/Ceza");
const CezapuanDatabase = require("../Models/Cezapuanı");
const CezaSayıDatabase = require("../Models/CezaSayı")
const StaffDatabase = require("../Models/Yetkili");
const NotDatabase = require("../Models/Not");
const StatDatabase = require("../Models/Stat");
const RegisterDatabase = require("../Models/Register");
const InviteDatabase = require("../Models/InviteMember");
const cfg = require("../Configs/config.json");
const { table } = require('table');

module.exports = async (button) => {

  try {
   client.on('clickButton', async (button) => {
   const CezaSayıData = await CezaSayıDatabase.findOne({ guildID: button.guild.id, userID: button.clicker.member.id});
   const CezapuanData = await CezapuanDatabase.findOne({ guildID: button.guild.id, userID: button.clicker.member.id});
   let chatMute = CezaSayıData && CezaSayıData.chatmute ? CezaSayıData.chatmute : 0
   let sesMute = CezaSayıData && CezaSayıData.voicemute ? CezaSayıData.voicemute : 0
   let ban = CezaSayıData && CezaSayıData.ban ? CezaSayıData.ban : 0
   let jail = CezaSayıData && CezaSayıData.jail ? CezaSayıData.jail : 0
   let totalCezapuan = CezapuanData && CezapuanData.cezaPuanıTotal ? CezapuanData.cezaPuanıTotal : 0
   let member = client.guilds.cache.get(button.guild.id).members.cache.get(button.clicker.member.id)
   let guild = client.guilds.cache.get(button.guild.id)
   
   if (button.id === '1') {
    client.api.interactions(button.discordID, button.token).callback.post( {data: { type: 4, data: { content: `Merhabalar ${member}, sunucuya giriş tarihiniz veritabanımızda \`${moment(button.clicker.member.joinedAt).locale("TR").format("LLL")}\` olarak kayıtlıdır ve siz sunucuya **${moment(button.clicker.member.joinedAt).locale("TR").fromNow()}** girmişsiniz.`, flags: "64" }}})       
   }
    
   if (button.id === '2') {
    let RegisterData = await RegisterDatabase.findOne({ guildID: guild.id, userID: member.id})
    let isimler = `${RegisterData && RegisterData.isimler ? RegisterData.isimler.map(x => `\`${x.name}\` (${x.type} - <@!${x.staff}>)`).join("\n") : `Merhaba ${member}, isim kayıtınız veritabanında bulunamadı.`}`
    client.api.interactions(button.discordID, button.token).callback.post( {data: { type: 4, data: { content: `${RegisterData && RegisterData.isimler.length >= 1 ? `Merhaba ${member}, toplamda ${RegisterData.isimler.length} isim kayıtınız bulundu:`: ""}\n\n${isimler}`, flags: "64" }}})       
   }
    
   if (button.id === '3') {
    let mute = ""
    let vmute = ""
    let cezalı = ""
     await CezaDatabase.findOne({ guildID: guild.id, userID: button.clicker.member.id, jail: true }, async (err, doc) => {
     if (!doc) {
      cezalı = "Veritabanında aktif cezalı bilgisi bulunmamakta."
    } else {
     if (doc.jail == true) {
      cezalı = "Cezalı Atan Yetkili: <@" + doc.authorID + ">\nCeza Sebebi: `" + doc.Reason + "`\nCeza Tarihi: `" + moment(doc.date).locale("TR").format("LLL") + "`\nCeza Bitiş: `" + moment(doc.finishDate).locale("TR").format("LLL") + "` "
    } else {
      cezalı = "Veritabanında aktif cezalı bilgisi bulunmamakta."}}})
      await CezaDatabase.findOne({ guildID: guild.id, userID: button.clicker.member.id, chatmuted: true }, async (err, doc) => {
       if (!doc) {
        mute = "Veritabanında aktif chat mute bilgisi bulunmamakta."
    } else {
       if (doc.chatmuted == true) {
        mute = "Mute Atan Yetkili: <@" + doc.authorID + ">\nMute Sebebi: `" + doc.Reason + "`\nMute Başlangıç: `" + moment(doc.date).locale("TR").format("LLL") + "`\nMute Bitiş: `" + moment(doc.finishDate).locale("TR").format("LLL") + "` "
    } else {
     mute = "Veritabanında aktif chat mute bilgisi bulunmamakta."}}})
     await CezaDatabase.findOne({ guildID: guild.id, userID: button.clicker.member.id, voicemuted: true }, async (err, doc) => {
     if (!doc) {
      vmute = "Veritabanında aktif ses mute bilgisi bulunmamakta."
    } else {
     if (doc.voicemuted == true) {
      vmute = "Mute Atan Yetkili: <@" + doc.authorID + ">\nMute Sebebi: `" + doc.Reason + "`\nMute Başlangıç: `" + moment(doc.date).locale("TR").format("LLL") + "`\nMute Bitiş: `" + moment(doc.finishDate).locale("TR").format("LLL") + "` "
    } else {
     vmute = "Veritabanında aktif ses mute bilgisi bulunmamakta."}}})
    client.api.interactions(button.discordID, button.token).callback.post( {data: { type: 4, data: { content:`Ceza bilgileriniz aşağıda belirtilmiştir.\n\n \`•\`  Cezalı Bilgisi; \n ${cezalı || "Veritabanında cezalı bilgisi bulunmamakta."}\n\n \`•\`  Chat Mute Bilgisi; \n ${mute || "Veritabanında chat mute bilgisi bulunmamakta."}\n\n \`•\`  Ses Mute Bilgisi; \n ${vmute || "Veritabanında ses mute bilgisi bulunmamakta."}`, flags: "64" }}})    
    }
    
   if (button.id === '4') {
    let CezapuanData = await CezapuanDatabase.findOne({ guildID: guild.id, userID: member.id})
    let totalCezapuan = CezapuanData && CezapuanData.cezaPuanıTotal ? CezapuanData.cezaPuanıTotal : 0
    let durum;if(totalCezapuan > 101) durum = "Aşırı Güvensiz";if(totalCezapuan === 101) durum = "Aşırı Güvensiz";if(totalCezapuan < 100) durum = "Aşırı Tehlikeli";if(totalCezapuan === 100) durum = "Aşırı Tehlikeli";if(totalCezapuan === 71) durum = "Aşırı Tehlikeli";if(totalCezapuan < 70) durum = "Tehlikeli";if(totalCezapuan === 70) durum = "Tehlikeli";if(41 === totalCezapuan) durum = "Tehlikeli";if(totalCezapuan === 40) durum = "Şüpheli";if(totalCezapuan < 40) durum = "Şüpheli";if(21 === totalCezapuan) durum = "Şüpheli";if(totalCezapuan < 20) durum = "Güvenli";if(20 === totalCezapuan) durum = "Güvenli";if(totalCezapuan === 1) durum = "Güvenli";if(totalCezapuan == `0`) durum = "Çok Güvenli";
    client.api.interactions(button.discordID, button.token).callback.post( {data: { type: 4, data: { content: `Merhabalar ${member}, veritabanında \`${totalCezapuan}\` cezapuanıyla beraber **${durum}!** olarak listeleniyorsunuz!`, flags: "64" }}})       
   }
    
   if (button.id === '5') {
    const data = await InviteDatabase.findOne({ guildID: guild.id, userID: member.id });
    if (!data) return client.api.interactions(button.discordID, button.token).callback.post( {data: { type: 4, data: { content: `Veritabanında sizi kimin davet ettiğini bulamıyorum.`, flags: "64" }}})  
    const inviter = await client.users.fetch(data.inviter);
    client.api.interactions(button.discordID, button.token).callback.post( {data: { type: 4, data: { content: `Merhabalar ${member}, sizi bu sunucuya \`${inviter}\` isimli kişi davet etmiş.`, flags: "64" }}})       
   }
    
   if (button.id === '6') {
    client.api.interactions(button.discordID, button.token).callback.post( {data: { type: 4, data: { content: `Merhabalar ${member}, üstünüzde toplam \`${member.roles.cache.size}\` adet rol bulundu!\nBu rol(ler):\n${button.clicker.member._roles.map(a => `<@&${a}>`).join("\n")}`, flags: "64" }}})
   }
     
   if (button.id === '7') {
    StatDatabase.findOne({ SunucuID: button.guild.id, userID: member.id}, async (err, res) => {
    client.api.interactions(button.discordID, button.token).callback.post( {data: { type: 4, data: { content: `Merhabalar ${member}, sunucumuzda şu anda toplam \`${res && res.MessageNumber ? res.MessageNumber : 0}\` mesajınız bulunmaktadır!`, flags: "64" }}})
    })
   }
   
   if (button.id === '8') {
    StatDatabase.findOne({ SunucuID: button.guild.id, userID: member.id}, async (err, res) => {
       const doc = await SetupDatabase.findOne({guildID: button.guild.id})
       let publicCategory = res && res.publicCategory ? res.publicCategory : ""
       let aloneCategory = res && res.aloneCategory ? res.aloneCategory : ""
       let registerCategory = res && res.registerCategory ? res.registerCategory : ""
       let sorunÇözmeCategory = res && res.sorunÇözmeCategory ? res.sorunÇözmeCategory : ""
       let privateCategory = res && res.privateCategory ? res.privateCategory : ""
       let streamerCategory = res && res.streamerCategory ? res.streamerCategory : ""
       let sleepChannel = res && res.sleepChannel ? res.sleepChannel : ""
       let gameParents = res && res.gameParents ? res.gameParents : []
       if (!res) return client.api.interactions(button.discordID, button.token).callback.post( {data: { type: 4, data: { content: `Merhabalar ${member}, sunucumuzda herhangi bir ses veriniz yok.`, flags: "64" }}}) 
       const allChannels = [], mesajSayisi = [];
       let weeklyMessage = 0, toplamKanalSayisi = 0, weeklyVoice = 0, otherRooms = 0 , weeklyPublic = 0, weeklySolving = 0, weeklyAlone = 0, weeklyRegister = 0, weeklySecret = 0, weeklyStreamer = 0, weeklySleep = 0, weeklyGame = 0, totalVoice = (client.parseTime(res.VoiceNumber) || 0 + " saniye"), totalMessage = ((res.MessageNumber) || 0), günlükMsg = ((res.MessageDaily) || 0), haftalıkMsg = ((res.MessageWeek) || 0);
        res.ToplamMesajWeek.forEach(x => weeklyMessage += x);
        res.ToplamMesajWeek.forEach((val, key) => mesajSayisi.push({ kanal: key, sayi: val }));
       Array.from(res.ToplamSesWeek).forEach(([key, value]) => {
        if(!guild.channels.cache.get(key)) return;
         weeklyVoice += value;
        allChannels.push({ kanal: key, sure: value });
      if ((guild.channels.cache.get(key).parentID === publicCategory) && (key !== sleepChannel)) return weeklyPublic += value; 
      if (guild.channels.cache.get(key).parentID === aloneCategory) return weeklyAlone += value;
      if (guild.channels.cache.get(key).parentID === registerCategory) return weeklyRegister += value; 
      if (guild.channels.cache.get(key).parentID === sorunÇözmeCategory) return weeklySolving += value; 
      if (guild.channels.cache.get(key).parentID === privateCategory) return weeklySecret += value;
      if (guild.channels.cache.get(key).parentID === streamerCategory) return weeklyStreamer += value; 
      if (gameParents.includes(guild.channels.cache.get(key).parentID)) return weeklyGame += value;
      if (key === sleepChannel) return weeklySleep += value;
      if ((guild.channels.cache.get(key).parentID === null) || (![publicCategory, registerCategory, aloneCategory, privateCategory, sorunÇözmeCategory, gameParents,streamerCategory].includes(guild.channels.cache.get(key).parentID))  || (key !== sleepChannel)) return otherRooms += value;})
      const mostActiveChannels = allChannels.sort((x, y) => (y.sure) - (x.sure)).map((value, index) => `\`${index + 1}.\` ${capitalizeIt(guild.channels.cache.get(value.kanal).name.replace("#", " ").replace(/-/g, " ")) || 'Silinmiş Kanal'}: \`${client.parseTime(value.sure)}\``).splice(0, 10);
      const ilk10 = mesajSayisi.sort((x, y) => (y.sayi) - (x.sayi)).map((val, index) => `\`${index + 1}.\` ${guild.channels.cache.get(val.kanal) ? capitalizeIt(guild.channels.cache.get(val.kanal).name.replace("#", " ").replace(/-/g, " ")) : 'Silinmiş Kanal'}: \`${val.sayi} mesaj\``).splice(0, 10);
      const pub = allChannels.filter(c => (guild.channels.cache.get(c.kanal).parentID === publicCategory) && (c.kanal !== sleepChannel)).sort((x, y) => (y.sure) - (x.sure)).map((value, index) => `\`${index + 1}.\` \`#${guild.channels.cache.get(value.kanal).name || '#deleted-channel'}\` - (**${client.parseTime(value.sure)}**)`).splice(0, 0);
      const alone = allChannels.filter(c => guild.channels.cache.get(c.kanal).parentID === aloneCategory).sort((x, y) => (y.sure) - (x.sure)).map((value, index) => `\`${index + 1}.\` \`#${guild.channels.cache.get(value.kanal).name || '#deleted-channel'}\` - (**${client.parseTime(value.sure)}**)`).splice(0, 0);
      const solving = allChannels.filter(c => guild.channels.cache.get(c.kanal).parentID === sorunÇözmeCategory).sort((x, y) => (y.sure) - (x.sure)).map((value, index) => `\`${index + 1}.\` \`#${guild.channels.cache.get(value.kanal).name || '#deleted-channel'}\` - (**${client.parseTime(value.sure)}**)`).splice(0, 0);
      const streamer = allChannels.filter(c => guild.channels.cache.get(c.kanal).parentID === streamerCategory).sort((x, y) => (y.sure) - (x.sure)).map((value, index) => `\`${index + 1}.\` \`#${guild.channels.cache.get(value.kanal).name || '#deleted-channel'}\` - (**${client.parseTime(value.sure)}**)`).splice(0, 0);
      const register = allChannels.filter(c => guild.channels.cache.get(c.kanal).parentID === registerCategory).sort((x, y) => (y.sure) - (x.sure)).map((value, index) => `\`${index + 1}.\` \`#${guild.channels.cache.get(value.kanal).name || '#deleted-channel'}\` - (**${client.parseTime(value.sure)}**)`).splice(0, 0);
      const secret = allChannels.filter(c => guild.channels.cache.get(c.kanal).parentID === privateCategory).sort((x, y) => (y.sure) - (x.sure)).map((value, index) => `\`${index + 1}.\` \`#${guild.channels.cache.get(value.kanal).name || '#deleted-channel'}\` - (**${client.parseTime(value.sure)}**)`).splice(0, 0);
      const oyun = allChannels.filter(c => gameParents.includes(guild.channels.cache.get(c.kanal).parentID)).sort((x, y) => (y.sure) - (x.sure)).map((value, index) => `\`${index + 1}.\` \`#${guild.channels.cache.get(value.kanal).name || '#deleted-channel'}\` - (**${client.parseTime(value.sure)}**)`).splice(0, 0);
      const sleep = allChannels.filter(c => c.kanal === sleepChannel).sort((x, y) => (y.sure) - (x.sure)).map((value, index) => `\`${index + 1}.\` \`#${guild.channels.cache.get(value.kanal).name || '#deleted-channel'}\` - (**${client.parseTime(value.sure)}**)`).splice(0, 0);
      const others = allChannels.filter(c => { const parentID = guild.channels.cache.get(c.kanal).parentID; return (((guild.channels.cache.get(sleepChannel).parentID === null) && (c.kanal !== sleepChannel)) || (parentID === null) || (!gameParents.includes(parentID)) && (![publicCategory, registerCategory, aloneCategory, privateCategory, sorunÇözmeCategory, gameParents, streamerCategory].includes(parentID))); }).sort((x, y) => (y.sure) - (x.sure)).map((value, index) => `\`${index + 1}.\` \`#${guild.channels.cache.get(value.kanal).name || '#deleted-channel'}\` - (**${client.parseTime(value.sure)}**)`).splice(0, 0); 
      client.api.interactions(button.discordID, button.token).callback.post( {data: { type: 4, data: { content: `**❯ Kanal Bilgileri**\n\`•\` Toplam: \`${(client.parseTime(res.VoiceNumber) || 0 + " saniye")}\`\n\`•\` Public Odaları: \`${client.parseTime(weeklyPublic)}\`\n\`•\` Kayıt Odaları: \`${client.parseTime(weeklyRegister)}\`\n\`•\` Alone Odaları: \`${client.parseTime(weeklyAlone)}\`\n\`•\` Secret Odalar: \`${client.parseTime(weeklySecret)}\`\n\`•\` Streamer Odaları: \`${client.parseTime(weeklyStreamer)}\`\n\`•\` Sorun Çözme: \`${client.parseTime(weeklySolving)}\`\n\`•\` Oyun Odaları: \`${client.parseTime(weeklyGame)}\`\n\`•\` Sleep Room: \`${client.parseTime(weeklySleep)}\`\n\`•\` Diğer Odalar: \`${client.parseTime(otherRooms)}\`\n\n**❯ Kanal Sıralaması (${mostActiveChannels.length} kanalda bulunmuş)**\n${mostActiveChannels.join("\n")}`, flags: "64" }}})
    })
   }

   if (button.id === '9') {
    client.api.interactions(button.discordID, button.token).callback.post( {data: { type: 4, data: { content: `Merhabalar ${member}, hesabınızın oluşturulma tarihi \`${moment(member.createdAt).locale("TR").format("LLL")}\` olarak hesaplanmıştır ve siz hesabınızı **${moment(member.user.createdAt).locale("TR").fromNow()}** önce açmışsınız.`, flags: "64" }}})
   }
    
   if (button.id === '10') {
    let mute = ""
    let vmute = ""
    let cezalı = ""
     await CezaDatabase.findOne({ guildID: guild.id, userID: button.clicker.member.id, jail: true }, async (err, doc) => {
     if (!doc) {
      cezalı = "0"
    } else {
     if (doc.jail == true) {
      cezalı = "1"
    } else {
      cezalı = "0"}}})
      await CezaDatabase.findOne({ guildID: guild.id, userID: button.clicker.member.id, chatmuted: true }, async (err, doc) => {
       if (!doc) {
        mute = "0"
    } else {
       if (doc.chatmuted == true) {
        mute = "1"
    } else {
     mute = "0"}}})
     await CezaDatabase.findOne({ guildID: guild.id, userID: button.clicker.member.id, voicemuted: true }, async (err, doc) => {
     if (!doc) {
      vmute = "0"
    } else {
     if (doc.voicemuted == true) {
      vmute = "1"
    } else {
     vmute = "0"}}})
    if (mute+vmute+cezalı >= 1) return client.api.interactions(button.discordID, button.token).callback.post( {data: { type: 4, data: { content: `Merhabalar ${member}, cezanız bulunduğu için kayıt olamazsınız.`, flags: "64" }}})
    let RegisterData = await RegisterDatabase.findOne({ guildID: guild.id, userID: member.id})
    let count = RegisterData && RegisterData.isimler ? RegisterData.isimler : 0
    if (count === 0) return client.api.interactions(button.discordID, button.token).callback.post( {data: { type: 4, data: { content: `Merhabalar ${member}, son kayıtınız bulunmadığı için kayıt olamazsınız.`, flags: "64" }}})
    let isim = `${RegisterData.isimler.map(x => `${x.name}`).reverse().slice(0, 1).join("\n")}`
    let roles = `${RegisterData.isimler.map(x => `${guild.roles.cache.get(x.type) ? x.type : `No Role.`}`).reverse().slice(0, 1).join("\n")}`
    member.setNickname(isim).catch(() => { })
    let array = []
    if (roles !== `No Role.`) {
     const res = await SetupDatabase.findOne({guildID: guild.id})
     let manRoles = res && res.manRoles ? res.manRoles : [] 
     let ladyRoles = res && res.ladyRoles ? res.ladyRoles : [] 
     if (manRoles.includes(roles)) {
      member.roles.set(manRoles).catch(() => { })
      array.push(manRoles)
     } else if (ladyRoles.includes(roles)) {
      member.roles.set(ladyRoles).catch(() => { })  
      array.push(ladyRoles)
     }      
    }
    client.api.interactions(button.discordID, button.token).callback.post( {data: { type: 4, data: { content: `Merhabalar ${member}, verileri biraz karıştırdım da... Sizi \`${isim}\` ismiyle ${roles === `No Role.` ? `__5__ saniye içerisinden yeniden kaydedeceğim, iyi günler!` : `ve ${array.map(a => `<@&${a}>`)} rolleri ile __5__ saniye içerisinden yeniden kaydedeceğim, iyi günler!`}`, flags: "64" }}})
   }
    
   if (button.id === '11') {
    const doc = await SetupDatabase.findOne({guildID: button.guild.id})
    let guildTag = doc && doc.guildTag ? doc.guildTag : "ĞWEQÇQĞPWERGÇFGĞWERRÇPQFGWERÇÖĞÇ"
    client.api.interactions(button.discordID, button.token).callback.post( {data: { type: 4, data: { content: `❯ Sesli Kanallardaki Üye Sayısı: \`${guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b)}\`\n❯ Toplam Kullanıcı Sayısı: \`${guild.memberCount}\`\n❯ Toplam Taglı Sayısı: \`${guild.members.cache.filter(r=>r.user.username.includes(guildTag)).size}\`\n❯ Sunucunun Oluşturulma Tarihi: \`${moment(guild.createdTimestamp).locale("TR").format("LLL")}\`\n❯ Sunucu Numarası: \`${guild.id}\`\n❯ Takviye Sayısı: \`${guild.premiumSubscriptionCount}\``, flags: "64" }}})
   }
    
   if (button.id === '12') {
    const res = await SetupDatabase.findOne({guildID: button.guild.id})
    let unregisterRoles = res && res.unregisterRoles ? res.unregisterRoles : []  
    if (unregisterRoles.length === 0) return client.api.interactions(button.discordID, button.token).callback.post( {data: { type: 4, data: { content: `Henüz kayıtsız rolünün kurulumu yapılmamış, kurulumu yap ve tekrardan dene!`, flags: "64" }}})
    if (member.roles.cache.some(r => unregisterRoles.includes(r.id))) return client.api.interactions(button.discordID, button.token).callback.post( {data: { type: 4, data: { content: `Bu işlem için kayıtlı olmanız gerekmektedir.`, flags: "64" }}})
    client.setRoles(member.id, unregisterRoles)
    client.api.interactions(button.discordID, button.token).callback.post( {data: { type: 4, data: { content: `Tekrardan sesli kayıt olabilirsiniz.`, flags: "64" }}})   
   }
}) 
  } catch { console.log(`Beklenmeyen hata gerçekleşti.`) }

function capitalizeIt(str) {
    if (str && typeof (str) === "string") {
      str = str.split(" ");
      for (var i = 0, x = str.length; i < x; i++) {
        if (str[i]) {
          str[i] = str[i][0].toUpperCase() + str[i].substr(1);
        }
      }
      return str.join(" ");
    } else {
      return str;
    }
  }
  
}

module.exports.conf = {
  name: "clickButton",
};