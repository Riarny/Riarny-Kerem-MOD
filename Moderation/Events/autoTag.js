const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const client = global.client;
const Discord = require("discord.js");
const ControlsDatabase = require("../Models/Controls");
const GeneralDatabase = require("../Models/General");
const SetupDatabase = require("../Models/Setup")
const cfg = require("../Configs/config.json")

module.exports = async(oldUser, newUser) => {
  
  if (oldUser.username == newUser.username || oldUser.bot || newUser.bot) return;
  const doc = await SetupDatabase.findOne({})
  let guildID = doc && doc.guildID ? doc.guildID : ""
  if (guildID === "") return
  let guild = client.guilds.cache.get(guildID);
  let user = guild.members.cache.get(oldUser.id);
  if(!user) return;
  const res = await SetupDatabase.findOne({guildID: guild.id})
  let bannedTagLog = res && res.bannedTagLog ? res.bannedTagLog : ""
  let chat = res && res.chat ? res.chat : ""
  let AuthorityLeft = res && res.AuthorityLeft ? res.AuthorityLeft : ""
  let guildTag = res && res.guildTag ? res.guildTag : "" 
  let guildNoTag = res && res.guildNoTag ? res.guildNoTag : "" 
  let taggedRole = res && res.taggedRole ? res.taggedRole : "" 
  let adminRole = res && res.adminRole ? res.adminRole : ""
  let tagLog = res && res.tagLog ? res.tagLog : "" 
  let tagAyrıcalıkları = res && res.tagAyrıcalıkları ? res.tagAyrıcalıkları : "" 
  let unregisterRoles = res && res.unregisterRoles ? res.unregisterRoles : [] 
  let boosterRole = res && res.boosterRole ? res.boosterRole : ""
  let punitiveRole = res && res.punitiveRole ? res.punitiveRole : ""
  const ControlsData = await ControlsDatabase.findOne({ guildID: guild.id}); 
  let YasaklıTagData = await ControlsDatabase.findOne({ guildID: guild.id})
  let yasakTaglar = YasaklıTagData && YasaklıTagData.yasaklıtag;
  
  const embed = new MessageEmbed().setAuthor(user.displayName, user.user.avatarURL({dynamic: true})).setColor("RANDOM")
   let tag1 = guild.members.cache.filter(r=>r.user.username.toLowerCase().includes("gng")).size
  //let tag2 = guild.members.cache.filter(r=>r.user.username.toLowerCase().includes("gng")).size
  //let tag3 = guild.members.cache.filter(r=>r.user.username.toLowerCase().includes("'")).size
  //let tag4 = guild.members.cache.filter(r=>r.user.username.toLowerCase().includes("réwînd")).size
  //let tag5 = guild.members.cache.filter(r=>r.user.username.toLowerCase().includes("rèwînd")).size
  let tag6 = guild.members.cache.filter(r=>r.user.discriminator.includes('2320')).size
  let tag7 = guild.members.cache.filter(r=>r.user.discriminator.includes('0232')).size
  let total = tag1+tag7+tag6

  if((YasaklıTagData && yasakTaglar.some(tag => !oldUser.username.includes(tag) && (newUser.username.includes(tag))))) {
   user.roles.cache.has(boosterRole) ?  user.roles.set([boosterRole, punitiveRole]) : user.roles.set([punitiveRole])
   user.send("İsminde bulunan yasaklı tagdan dolayı sunucumuzda yasaklı taga atıldın. İsmindeki yasaklı tagı kaldırarak sunucumuza erişim sağlayabilirsin. Eğer herhangi bir problemin varsa üst yöneticilerimize ulaşmaktan çekinme !").catch(() => { })
   if (client.channels.cache.get(bannedTagLog)) client.channels.cache.get(bannedTagLog).send(`${cfg.Emoji.RedEmoji} ${user} kişisi sunucumuzda bulunan yasaklı taglardan birini aldı.\n─────────────────\nÖnce: \`${oldUser.username.replace("`","")}\` Sonra: \`${newUser.username.replace("`","")}\``)
  return;
  };
  
  if (YasaklıTagData && yasakTaglar.some(tag =>(oldUser.username.includes(tag)) && (!newUser.username.includes(tag)))) {
   if (unregisterRoles.length !== 0) client.setRoles(user.id, unregisterRoles)
   user.send("İsmindeki yasaklı tagı kaldırdığın için sunucumuzda yasağın kalktı. Teyit odalarından birine girip sunucumuza kaydolabilirsiniz.Seni seviyoruz ve sayıyoruz !").catch(() => { })
   if (client.channels.cache.get(bannedTagLog)) client.channels.cache.get(bannedTagLog).send(`${cfg.Emoji.TickEmoji} ${user} kişisi sunucumuzda bulunan yasaklı taglardan birini bıraktı.\n─────────────────\nÖnce: \`${oldUser.username.replace("`","")}\` Sonra: \`${newUser.username.replace("`","")}\``)
  return;
  };
  
  if (guildTag === "") return
  if ((!oldUser.username.includes(guildTag)) && (newUser.username.includes(guildTag))) {
   if (taggedRole) user.roles.add(taggedRole).catch(() => { })
    await GeneralDatabase.findOneAndUpdate({guildID: guild.id, userID: user.id}, {$set: {tagAddDate: Date.now()}}, {upsert:true})
   if (client.channels.cache.get(chat)) client.channels.cache.get(chat).send(new MessageEmbed().setDescription(`${user} Kişisi tagımızı kullanıcı adına eklediği için <@&${taggedRole}> rolü verildi.\n Ayrıcalıklarını öğrenmek için <#${tagAyrıcalıkları}> kanalına bakabilirsin iyi eğlenceler.`).setColor("#32FF00")).then(m => m.delete({timeout: 5000}))
   if (client.channels.cache.get(tagLog)) client.channels.cache.get(tagLog).send(`${cfg.Emoji.TickEmoji} ${user} adlı üye ( ${guildTag} ) tagını kullanıcı adına yerleştirerek ailemize katıldı!\n**Sunucuda bulunan toplam taglı üye sayımız:** (\`${total}\`)\n───────────────\nÖnce ki kullanıcı adı: \`${oldUser.username.replace("`","")}\`\nSonra ki kullanıcı adı: \`${newUser.username.replace("`","")}\``);
  } else if ((oldUser.username.includes(guildTag)) && (!newUser.username.includes(guildTag))) {
   let ekipRol = guild.roles.cache.get(taggedRole)
   if (user.roles.cache.has(boosterRole)) {user.roles.remove(user.roles.cache.filter(rol => boosterRole.position <= rol.position)).catch(() => { })}
   user.roles.remove(user.roles.cache.filter(rol => ekipRol.position <= rol.position)).catch(() => { })
   if (ControlsData && ControlsData.taglıalım === "Açık") {
    if (unregisterRoles.length !== 0) client.setRoles(user.id, unregisterRoles)
   }
   if (client.channels.cache.get(chat)) client.channels.cache.get(chat).send(new MessageEmbed().setDescription(`${user} Kişisi tagımızı kullanıcı adından çıkardığı için <@&${taggedRole}> rolü alındı.\n Bizimle geçirdiğin süre zarfında umarım eğlenmişsindir...`).setColor("#B20000")).then(m => m.delete({timeout: 5000}))
   if (client.channels.cache.get(tagLog)) client.channels.cache.get(tagLog).send(`${cfg.Emoji.RedEmoji} ${user} adlı üye ( ${guildTag} ) tagını kullanıcı adından çıkararak ailemize veda etti!\n**Sunucuda bulunan toplam taglı üye sayımız:** (\`${total}\`)\n───────────────\nÖnce ki kullanıcı adı: \`${oldUser.username.replace("`","")}\`\nSonra ki kullanıcı adı: \`${newUser.username.replace("`","")}\``);
   if (user.roles.cache.filter(rol => ekipRol.position <= rol.position).size >= 2) {
   if (client.channel.cache.get(AuthorityLeft)) client.channel.cache.get(AuthorityLeft).send(`${user} adlı üye **${moment(Date.now()).locale("TR").format("LLL")}** tarihinde ( ${guildTag} ) tagını kullanıcı adından çıkararak yetkiyi bıraktı. ${adminRole}\nBırakmadan önceki yetkileri: ${user.roles.cache.filter(rol => ekipRol.position <= rol.position).map(a => `\`${user.guild.roles.cache.get(a).name}\``).join(", ")}`)
  }
 }

if ((!oldUser.username.toLowerCase().includes("gng")) && (newUser.username.toLowerCase().includes("gng"))) {
  if (user.manageable && ("gng" !== "")) user.setNickname(user.displayName.replace("•", "•")).catch(() => { })
  if (taggedRole) user.roles.add(taggedRole).catch(() => { })
   await GeneralDatabase.findOneAndUpdate({guildID: guild.id, userID: user.id}, {$set: {tagAddDate: Date.now()}}, {upsert:true})
  if (client.channels.cache.get(chat)) client.channels.cache.get(chat).send(new MessageEmbed().setDescription(`${user} Kişisi tagımızı kullanıcı adına eklediği için <@&${taggedRole}> rolü verildi.\n Ayrıcalıklarını öğrenmek için <#${tagAyrıcalıkları}> kanalına bakabilirsin iyi eğlenceler.`).setColor("#32FF00")).then(m => m.delete({timeout: 5000}))
  if (client.channels.cache.get(tagLog)) client.channels.cache.get(tagLog).send(`${cfg.Emoji.TickEmoji} ${user} adlı üye ( gng ) tagını kullanıcı adına yerleştirerek ailemize katıldı!\n**Sunucuda bulunan toplam taglı üye sayımız:** (\`${total}\`)\n───────────────\nÖnce ki kullanıcı adı: \`${oldUser.username.replace("`","")}\`\nSonra ki kullanıcı adı: \`${newUser.username.replace("`","")}\``);
 } else if ((oldUser.username.toLowerCase().includes("gng")) && (!newUser.username.toLowerCase().includes("gng"))) {
  if (user.manageable && ("gng" !== "")) user.setNickname(user.displayName.replace("•", "•")).catch(() => { })
  let ekipRol = guild.roles.cache.get(taggedRole)
  if (user.roles.cache.has(boosterRole)) {user.roles.remove(user.roles.cache.filter(rol => boosterRole.position <= rol.position)).catch(() => { })}
  user.roles.remove(user.roles.cache.filter(rol => ekipRol.position <= rol.position)).catch(() => { })
  if (ControlsData && ControlsData.taglıalım === "Açık") {
   if (unregisterRoles.length !== 0) client.setRoles(user.id, unregisterRoles)
  }
  if (client.channels.cache.get(chat)) client.channels.cache.get(chat).send(new MessageEmbed().setDescription(`${user} Kişisi tagımızı kullanıcı adından çıkardığı için <@&${taggedRole}> rolü alındı.\n Bizimle geçirdiğin süre zarfında umarım eğlenmişsindir...`).setColor("#B20000")).then(m => m.delete({timeout: 5000}))
  if (client.channels.cache.get(tagLog)) client.channels.cache.get(tagLog).send(`${cfg.Emoji.RedEmoji} ${user} adlı üye ( gng ) tagını kullanıcı adından çıkararak ailemize veda etti!\n**Sunucuda bulunan toplam taglı üye sayımız:** (\`${total}\`)\n───────────────\nÖnce ki kullanıcı adı: \`${oldUser.username.replace("`","")}\`\nSonra ki kullanıcı adı: \`${newUser.username.replace("`","")}\``);
  if (user.roles.cache.filter(rol => ekipRol.position <= rol.position).size >= 2) {
  if (client.channel.cache.get(AuthorityLeft)) client.channel.cache.get(AuthorityLeft).send(`${user} adlı üye **${moment(Date.now()).locale("TR").format("LLL")}** tarihinde ( ${guildTag} ) tagını kullanıcı adından çıkararak yetkiyi bıraktı. ${adminRole}\nBırakmadan önceki yetkileri: ${user.roles.cache.filter(rol => ekipRol.position <= rol.position).map(a => `\`${user.guild.roles.cache.get(a).name}\``).join(", ")}`)
 }
}
if ((!oldUser.discriminator.includes("0232")) && (newUser.discriminator.includes("0232"))) {
  if (user.manageable && ("0232" !== "")) user.setNickname(user.displayName.replace("•", "•")).catch(() => { })
  if (taggedRole) user.roles.add(taggedRole).catch(() => { })
   await GeneralDatabase.findOneAndUpdate({guildID: guild.id, userID: user.id}, {$set: {tagAddDate: Date.now()}}, {upsert:true})
  if (client.channels.cache.get(chat)) client.channels.cache.get(chat).send(new MessageEmbed().setDescription(`${user} Kişisi tagımızı kullanıcı adına eklediği için <@&${taggedRole}> rolü verildi.\n Ayrıcalıklarını öğrenmek için <#${tagAyrıcalıkları}> kanalına bakabilirsin iyi eğlenceler.`).setColor("#32FF00")).then(m => m.delete({timeout: 5000}))
  if (client.channels.cache.get(tagLog)) client.channels.cache.get(tagLog).send(`${cfg.Emoji.TickEmoji} ${user} adlı üye ( 0232 ) tagını kullanıcı adına yerleştirerek ailemize katıldı!\n**Sunucuda bulunan toplam taglı üye sayımız:** (\`${total}\`)\n───────────────\nÖnce ki kullanıcı adı: \`${oldUser.username.replace("`","")}\`\nSonra ki kullanıcı adı: \`${newUser.username.replace("`","")}\``);
 } else if ((oldUser.discriminator.includes("0232")) && (!newUser.discriminator.includes("0232"))) {
  if (user.manageable && ("0232" !== "")) user.setNickname(user.displayName.replace("•", "•")).catch(() => { })
  let ekipRol = guild.roles.cache.get(taggedRole)
  if (user.roles.cache.has(boosterRole)) {user.roles.remove(user.roles.cache.filter(rol => boosterRole.position <= rol.position)).catch(() => { })}
  user.roles.remove(user.roles.cache.filter(rol => ekipRol.position <= rol.position)).catch(() => { })
  if (ControlsData && ControlsData.taglıalım === "Açık") {
   if (unregisterRoles.length !== 0) client.setRoles(user.id, unregisterRoles)
  }
  if (client.channels.cache.get(chat)) client.channels.cache.get(chat).send(new MessageEmbed().setDescription(`${user} Kişisi tagımızı kullanıcı adından çıkardığı için <@&${taggedRole}> rolü alındı.\n Bizimle geçirdiğin süre zarfında umarım eğlenmişsindir...`).setColor("#B20000")).then(m => m.delete({timeout: 5000}))
  if (client.channels.cache.get(tagLog)) client.channels.cache.get(tagLog).send(`${cfg.Emoji.RedEmoji} ${user} adlı üye ( 0232 ) tagını kullanıcı adından çıkararak ailemize veda etti!\n**Sunucuda bulunan toplam taglı üye sayımız:** (\`${total}\`)\n───────────────\nÖnce ki kullanıcı adı: \`${oldUser.username.replace("`","")}\`\nSonra ki kullanıcı adı: \`${newUser.username.replace("`","")}\``);
  if (user.roles.cache.filter(rol => ekipRol.position <= rol.position).size >= 2) {
  if (client.channel.cache.get(AuthorityLeft)) client.channel.cache.get(AuthorityLeft).send(`${user} adlı üye **${moment(Date.now()).locale("TR").format("LLL")}** tarihinde ( ${guildTag} ) tagını kullanıcı adından çıkararak yetkiyi bıraktı. ${adminRole}\nBırakmadan önceki yetkileri: ${user.roles.cache.filter(rol => ekipRol.position <= rol.position).map(a => `\`${user.guild.roles.cache.get(a).name}\``).join(", ")}`)
 }
}

if ((!oldUser.discriminator.includes("2320")) && (newUser.discriminator.includes("2320"))) {
  if (user.manageable && ("2320" !== "")) user.setNickname(user.displayName.replace("•", "•")).catch(() => { })
  if (taggedRole) user.roles.add(taggedRole).catch(() => { })
   await GeneralDatabase.findOneAndUpdate({guildID: guild.id, userID: user.id}, {$set: {tagAddDate: Date.now()}}, {upsert:true})
  if (client.channels.cache.get(chat)) client.channels.cache.get(chat).send(new MessageEmbed().setDescription(`${user} Kişisi tagımızı kullanıcı adına eklediği için <@&${taggedRole}> rolü verildi.\n Ayrıcalıklarını öğrenmek için <#${tagAyrıcalıkları}> kanalına bakabilirsin iyi eğlenceler.`).setColor("#32FF00")).then(m => m.delete({timeout: 5000}))
  if (client.channels.cache.get(tagLog)) client.channels.cache.get(tagLog).send(`${cfg.Emoji.TickEmoji} ${user} adlı üye ( 2320 ) tagını kullanıcı adına yerleştirerek ailemize katıldı!\n**Sunucuda bulunan toplam taglı üye sayımız:** (\`${total}\`)\n───────────────\nÖnce ki kullanıcı adı: \`${oldUser.username.replace("`","")}\`\nSonra ki kullanıcı adı: \`${newUser.username.replace("`","")}\``);
 } else if ((oldUser.discriminator.includes("2320")) && (!newUser.discriminator.includes("2320"))) {
  if (user.manageable && ("2320" !== "")) user.setNickname(user.displayName.replace("•", "•")).catch(() => { })
  let ekipRol = guild.roles.cache.get(taggedRole)
  if (user.roles.cache.has(boosterRole)) {user.roles.remove(user.roles.cache.filter(rol => boosterRole.position <= rol.position)).catch(() => { })}
  user.roles.remove(user.roles.cache.filter(rol => ekipRol.position <= rol.position)).catch(() => { })
  if (ControlsData && ControlsData.taglıalım === "Açık") {
   if (unregisterRoles.length !== 0) client.setRoles(user.id, unregisterRoles)
  }
  if (client.channels.cache.get(chat)) client.channels.cache.get(chat).send(new MessageEmbed().setDescription(`${user} Kişisi tagımızı kullanıcı adından çıkardığı için <@&${taggedRole}> rolü alındı.\n Bizimle geçirdiğin süre zarfında umarım eğlenmişsindir...`).setColor("#B20000")).then(m => m.delete({timeout: 5000}))
  if (client.channels.cache.get(tagLog)) client.channels.cache.get(tagLog).send(`${cfg.Emoji.RedEmoji} ${user} adlı üye ( 2320 ) tagını kullanıcı adından çıkararak ailemize veda etti!\n**Sunucuda bulunan toplam taglı üye sayımız:** (\`${total}\`)\n───────────────\nÖnce ki kullanıcı adı: \`${oldUser.username.replace("`","")}\`\nSonra ki kullanıcı adı: \`${newUser.username.replace("`","")}\``);
  if (user.roles.cache.filter(rol => ekipRol.position <= rol.position).size >= 2) {
  if (client.channel.cache.get(AuthorityLeft)) client.channel.cache.get(AuthorityLeft).send(`${user} adlı üye **${moment(Date.now()).locale("TR").format("LLL")}** tarihinde ( ${guildTag} ) tagını kullanıcı adından çıkararak yetkiyi bıraktı. ${adminRole}\nBırakmadan önceki yetkileri: ${user.roles.cache.filter(rol => ekipRol.position <= rol.position).map(a => `\`${user.guild.roles.cache.get(a).name}\``).join(", ")}`)
 }
}



}

module.exports.conf = {
  name: "userUpdate",
};
