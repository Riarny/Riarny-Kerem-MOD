module.exports = {
  conf: {
    aliases: ["rolog","logrol","rolelog"],
    name: "rollog",
    usage: 'rollog [üye]',
    description: 'Belirttiğiniz kullanıcıya şuana kadar verilen veya alınan rolleri görürsünüz.',
},

 run: async ({client, msg, args, author, MessageEmbed, uye, GeneralDatabase,SetupDatabase}) => {
  
  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : [] 
  let botCommandsTrue = res && res.botCommandsRoles ? res.botCommandsRoles : [] 
  
  if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.some(r => botCommandsTrue.includes(r.id)) &&!msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)                              
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  let GeneralData = await GeneralDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  if(!(GeneralData && GeneralData.rollog)) return client.timemessage(client.normalEmbed("Veritabanında bu kullanıcının rol bilgisi bulunamadı.", msg), msg.channel.id, 7000)
  let rollog = GeneralData.rollog.map(x => `${x.role}`).reverse()
  if(!(GeneralData && GeneralData.rollog)) return client.message(client.normalEmbed("Veritabanında bu kullanıcının rol bilgisi bulunamadı.", msg), msg.channel.id)
  let currentPage = 1;
  const pageLimit = 10;
  const pages = rollog.chunk(pageLimit);
   msg.channel.send(new MessageEmbed().setDescription(`${GeneralData && GeneralData.rollogtotal ? `${uye} kişisinin toplamda ${GeneralData.rollogtotal} rol bilgisi bulunmakta rolün bilgileri aşağıda belirtilmiştir.`: ""}\n\n ${rollog.slice(currentPage === 1 ? 0 : Number((currentPage * pageLimit) - pageLimit), Number(currentPage * pageLimit)).join("\n─────────────────\n")}`).setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true})).setColor("RANDOM")).then(async m => {
  if (rollog.length > pageLimit) {
   await m.react("◀");
   await m.react("❌");
   await m.react("▶");
  let collector = m.createReactionCollector((react, user) => ["◀","▶", "❌"].some(e => e == react.emoji.name) && user.id == author.id, { time: 200000 });
   collector.on("collect", async reaction => {
    if (reaction.emoji.name === "◀") {
    if (currentPage === 1) return;
     await reaction.users.remove(author.id).catch(err => { });
      currentPage--;
      m.edit(new MessageEmbed().setFooter(`Sayfa: ${currentPage}/${pages.length}`).setDescription(`${GeneralData && GeneralData.rollogtotal ? `${uye} kişisinin toplamda ${GeneralData.rollogtotal} rol bilgisi bulunmakta rolün bilgileri aşağıda belirtilmiştir.`: ""}\n\n ${rollog.slice(currentPage === 1 ? 0 : Number((currentPage * pageLimit) - pageLimit), Number(currentPage * pageLimit)).join("\n─────────────────\n")}`).setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true})).setColor("RANDOM"));
  } else if (reaction.emoji.name === "▶") {
   if (currentPage === pages.length) return;
    await reaction.users.remove(author.id).catch(err => { });
    currentPage++;
    m.edit(new MessageEmbed().setFooter(`Sayfa: ${currentPage}/${pages.length}`).setDescription(`${GeneralData && GeneralData.rollogtotal ? `${uye} kişisinin toplamda ${GeneralData.rollogtotal} rol bilgisi bulunmakta rolün bilgileri aşağıda belirtilmiştir.`: ""}\n\n ${rollog.slice(currentPage === 1 ? 0 : Number((currentPage * pageLimit) - pageLimit), Number(currentPage * pageLimit)).join("\n─────────────────\n")}`).setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true})).setColor("RANDOM"));
  } else if (reaction.emoji.name === "❌") {
    m.delete();
    collector.stop()}})}})}}
