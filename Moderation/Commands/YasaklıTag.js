module.exports = {
  conf: {
    aliases: ["ytag"],
    name: "yasaklıtag",
    usage: 'yasaklıtag [tag]',
    description: 'Belirttiğiniz tagı yasaklıya alırsınız. (Sunucuda Bu Tagda Bulunan Herkesi Cezalıya Atar, Sunucuya Katılan Bu Taga Sahip Kişileri Cezalıya Atar, Yasaklı Tagı Kaldırırsanızda O Taga Sahip Kişileri Cezalıdan Çıkarır (!yasaklıtag sil [tag]), Yasaklı Tagları Görmek İçin İse (!yasaklıtag liste)) )',
},

 run: async ({client, msg, args, author, uye, prefix, guild, MessageEmbed, ControlsDatabase, SetupDatabase}) => {
   
  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : []  
  let boosterRole = res && res.boosterRole ? res.boosterRole : ""
  let bannedTagRole = res && res.bannedTagRole ? res.bannedTagRole : ""
  let unregisterRoles = res && res.unregisterRoles ? res.unregisterRoles : []
  
  if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000) 
  if (bannedTagRole === "") return client.message(client.normalEmbed(`Henüz yasaklı tag rolünün kurulumu yapılmamış, kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)  
  if (unregisterRoles.length === 0) return client.message(client.normalEmbed(`Henüz kayıtsız rolünün kurulumu yapılmamış, kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)  
  if (boosterRole === "") return client.message(client.normalEmbed(`Henüz booster rolünün kurulumu yapılmamış, kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)     
  let sorgu = args[0]
  if(sorgu == "yardım" || sorgu == "yardim" || sorgu == "help" || !sorgu){msg.channel.send(`💥 Komut kullanımında bir hata oluştu.\n Örnek Kullanım: \`${prefix}yasaklıtag ekle/kaldır/liste/kontrol/üye\``)}
  if(sorgu == "ekle" || sorgu == "Ekle" || sorgu == "EKLE" || sorgu == "add" || sorgu == "Add" || sorgu == "ADD"){
  let tagq = args.splice(1).join(' ');
  if(!tagq) return client.message(client.normalEmbed(`Yasaklıya eklemek istediğin tagı belirtmelisin.`, msg), msg.channel.id)
  const YasaklıTagData = await ControlsDatabase.findOne({ guildID: msg.guild.id});
  let ytag = YasaklıTagData && YasaklıTagData.yasaklıtag;
  if(YasaklıTagData && ytag.includes(tagq)) return client.message(client.normalEmbed(`Yasaklıya atmak istediğin tag veritabanında zaten yasaklı.`, msg), msg.channel.id)
  if(!YasaklıTagData) {let newYasaklıTag = new ControlsDatabase({guildID: msg.guild.id, yasaklıtag: tagq}).save();} else{
  ytag.push(tagq)
  YasaklıTagData.save();} 
  let say = msg.guild.members.cache.filter(r=>r.user.tag.includes(tagq)).size
  msg.guild.members.cache.filter(x => (x.user.tag).includes(tagq) && !x.user.bot && !x.roles.cache.has(bannedTagRole)).forEach(a => a.roles.cache.has(boosterRole) ?  a.roles.set([boosterRole, bannedTagRole]) : a.roles.set([bannedTagRole]));
  return  msg.channel.send(`<a:vegas_ok:793854276920934450> Belirttiğiniz tag (\`${tagq}\`) listeye başarıyla eklendi! ${say ? `Bu tag'a sahip **${say}** üye bulundu. Hepsine Yasaklı Tag rolü verilmeye başlanıyor!`: ""}`)}
  if(sorgu == "liste" || sorgu == "Liste" || sorgu == "list" || sorgu == "List" || sorgu == "LİSTE" || sorgu == "LİST"){
  const YasaklıTagData = await ControlsDatabase.findOne({ guildID: msg.guild.id});
  let ytag = YasaklıTagData && YasaklıTagData.yasaklıtag;
  let TheVegas = ytag.map((x, index) => `\`${index+1}.\` ${x} ${msg.guild.members.cache.filter(r=>r.user.tag.includes(x)).size === 0 ? "" : `(${msg.guild.members.cache.filter(r=>r.user.tag.includes(x)).size} üye)`}`).join("\n")
  return msg.channel.send(new MessageEmbed().setColor("RANDOM").setAuthor(client.user.tag, client.user.avatarURL({dynamic:true})).setDescription(`${TheVegas ? TheVegas : "Sunucuda yasaklanmış tag bulunmamakta."}`))}
  if(sorgu == "Kontrol" || sorgu == "kontrol" || sorgu == "control" || sorgu == "controls"){
  const YasaklıTagData = await ControlsDatabase.findOne({ guildID: msg.guild.id});
   if(!(YasaklıTagData && YasaklıTagData.yasaklıtag)) return client.message(client.normalEmbed(`Veritabanında kontrol edilecek yasaklı tag bulunmuyor.`, msg), msg.channel.id)
  YasaklıTagData && YasaklıTagData.yasaklıtag.forEach(x => {
  let üye = msg.guild.members.cache.filter(mems => {
   return mems.user.tag.includes(x) && !mems.roles.cache.has(bannedTagRole)}).map(x => x.id)
   if(üye.size === 'undefined') return client.message(client.normalEmbed(`${x} tagı bulunup yasaklı tag rolü olmayan üye yok.`, msg), msg.channel.id)
    msg.channel.send(`${x} tagı bulunup <@&${bannedTagRole}> rolü olmayan ${üye.size ? üye.size: '0'} kişiye rolü veriyorum.`)
    for (let i = 0; i < üye.length;i++) {
    setTimeout(() => {
    msg.guild.members.cache.get(üye[i]).roles.add(bannedTagRole)
    }, (i + 1) * 1000)}})}
  if (sorgu == "üye"||sorgu == "üyeler"||sorgu == "member"||sorgu == "members") {
  const YasaklıTagData = await ControlsDatabase.findOne({ guildID: msg.guild.id});
  let ytag = YasaklıTagData && YasaklıTagData.yasaklıtag;
  let tag = args[1]
  if (!tag) return client.message(client.normalEmbed("Üyelerini listelemek istediğin yasaklı tagı belirtmelisin.", msg), msg.channel.id)
  if (!ytag) return client.message(client.normalEmbed("Veritabanında listelenecek yasaklı tag bulunmuyor.", msg), msg.channel.id)
  if (!ytag.includes(args[1])) return client.message(client.normalEmbed("**" + ytag.join(",") + "** tag(ları) sunucuda yasaklanmış durumdadır. Belirttiğin tag veritabanında bulunmuyor.", msg), msg.channel.id)
  let üyeler = msg.guild.members.cache.filter(x => {
  return x.user.tag.includes(args[1])
  }).map(x => "<@" + x.id + "> - (`" + x.id + "`)")
  let üyelerk = msg.guild.members.cache.filter(x => {
  return x.user.tag.includes(args[1])
  }).map(x => "" + x.user.tag + " - (`" + x.id + "`)")
  let text = üyeler.join("\n")
  let texto = üyelerk.join("\n")
  const MAX_CHARS = 3 + 2 + text.length + 3;
  if (MAX_CHARS > 2000) {
  msg.channel.send("Sunucuda çok fazla yasaklı (" + args[1] + ") taga ait kişi var bu yüzden txt olarak göndermek zorundayım.", { files: [{ attachment: Buffer.from(texto), name: "yasakli-tagdakiler.txt" }] });
  } else {msg.channel.send(text ? text : "Sunucuda (" + args[1] + ") taga sahip üye bulunmuyor.")}}
  if(sorgu == "sil" || sorgu == "Sil" || sorgu == "SİL" || sorgu == "remove" || sorgu == "Remove" || sorgu == "REMOVE" || sorgu == "kaldır" || sorgu == "Kaldır"){
  const YasaklıTagData = await ControlsDatabase.findOne({ guildID: msg.guild.id});
  let tag = args.splice(1).join(' ');
  if(!tag) return client.message(client.normalEmbed(`Yasaklıdan çıkaracağın tagı belirtmelisin.`, msg), msg.channel.id)
  let ytag = YasaklıTagData && YasaklıTagData.yasaklıtag;
  if(YasaklıTagData && !ytag.includes(tag)) return client.message(client.normalEmbed(`Yasaklıdan çıkarmak istediğin tag zaten yasaklı değil.`, msg), msg.channel.id)
  if(!YasaklıTagData) {} else {
  if(YasaklıTagData.yasaklıtag.find(x => x == tag)) {
  YasaklıTagData.yasaklıtag = YasaklıTagData.yasaklıtag.filter(x => x != (tag || tag));
  YasaklıTagData.save()}};  
  let say = msg.guild.members.cache.filter(r=>r.user.tag.includes(tag)).size
  client.guilds.cache.get(msg.guild.id).members.cache.filter(uye =>  !uye.user.bot && uye.user.tag.includes(tag)).array().forEach(async(uye, index) => {
  client.setRoles(uye.id, unregisterRoles)})
  return msg.channel.send(`<a:vegas_ok:793854276920934450> Belirttiğiniz tag (\`${tag}\`) listeden başarıyla kaldırıldı! ${say ? `Bu tag'a sahip **${say}** üye bulundu. Hepsinden Yasaklı Tag rolü kaldırılıyor!`: ""}`)}}}
