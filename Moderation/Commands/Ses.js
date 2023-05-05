module.exports = {
  conf: {
    aliases: ["sesli","voice"],
    name: "ses",
    usage: 'sesli',
    description: 'Sunucunun ses aktifliği hakkında detaylı bilgi alırsınız.',
},

 run: async ({client, msg, args, author, MessageEmbed, uye, SetupDatabase}) => {
   
   const res = await SetupDatabase.findOne({guildID: msg.guild.id})
   let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : []  
   let tagged = res && res.taggedRole ? res.taggedRole : ""
   let guildTag = res && res.guildTag ? res.guildTag : ""
   let staffRoles = res && res.staffRoles ? res.staffRoles :  []  
   let publicCategory = res && res.publicCategory ? res.publicCategory : ""
  
   if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.has(tagged)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)                              
   const voiceChannels = msg.guild.channels.cache.filter(c => c.type === "voice");
   if (publicCategory === "") return client.message(client.normalEmbed(`Henüz public kategorisinin kurulumu yapılmamış, kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)
   if (guildTag === "") return client.message(client.normalEmbed(`Henüz sunucu tagının kurulumu yapılmamış, kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)
   if (staffRoles.length === 0) return client.message(client.normalEmbed(`Henüz yetkili rollerinin kurulumu yapılmamış, kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)
   let ses = msg.guild.members.cache.filter(x => x.voice.channel).size 
   let pub = msg.guild.members.cache.filter(x => x.voice.channel && x.voice.channel.parent.id == publicCategory).size
   let tagges = msg.guild.members.cache.filter(x => {
    return x.user.username.includes(guildTag) && x.voice.channel && !x.roles.cache.some(r => staffRoles.includes(r.id))
   }).size
   let notag = msg.guild.members.cache.filter(x => {
    return !x.user.username.includes(guildTag) && x.voice.channel
   }).size
   let yetkili = msg.guild.members.cache.filter(x => {
    return x.user.username.includes(guildTag) && x.voice.channel && x.roles.cache.some(r => staffRoles.includes(r.id))
   }).size
   let yayın = msg.guild.members.cache.filter(x => {
    return (x.voice.streaming === true) && x.voice.channel 
   }).size
   let mic = msg.guild.members.cache.filter(x => {
    return (x.voice.selfMute == true) && x.voice.channel
   }).size  
   let kulaklık = msg.guild.members.cache.filter(x => {
    return (x.voice.selfDeaf == true) && x.voice.channel
   }).size
   let bot = msg.guild.members.cache.filter(x => {
    return x.user.bot && x.voice.channel 
   }).size

   let array = []
   if(args[0]) {
   if(args[0].toLowerCase().includes("detay")) {
   msg.guild.members.cache.filter(x => x.voice.channel && !array.find(s => s.name === x.voice.channel.parent.name) && array.push({name: x.voice.channel.parent.name, count: msg.guild.members.cache.filter(q => q.voice.channel && q.voice.channel.parent.id == x.voice.channel.parent.id).size}))
   msg.channel.send(new MessageEmbed()
   .setDescription(`
  Sesli kanallarda toplamda **${ses}** kişi var !
  ───────────────
  Public odalarda **${pub}** kişi var !
  Ses kanallarında **${notag}** normal kullanıcı var !
  Ses kanallarında **${tagges}** taglı kullanıcı var !
  Ses kanallarında **${yetkili}** yetkili var !
  ───────────────
  Sesli kanallarında **${yayın}** kişi yayın yapıyor.
  Mikrofonu Kapalı: **${mic}**
  Kulaklığı Kapalı: **${kulaklık}**
  Bot: **${bot}**
  ───────────────
  Top **3** kategori sırası;
  ${array.sort((x, y) => y.count - x.count).map((q, i) => "\`"+ (i+1) +".\` #"+q.name+": **"+q.count+"**").slice(0, 3).join("\n")}
 `).setColor(msg.member.displayHexColor).setThumbnail(msg.guild.iconURL({dynamic:true})).setAuthor(msg.guild.name, msg.guild.iconURL({dynamic:true})))}
   }else{
   msg.channel.send(new MessageEmbed()
  .setDescription(`
  Sesli kanallarda toplamda **${ses}** kişi var !
  ───────────────
  Public odalarda **${pub}** kişi var !
  Ses kanallarında **${notag}** normal kullanıcı var !
  Ses kanallarında **${tagges}** taglı kullanıcı var !
  Ses kanallarında **${yetkili}** yetkili var !`).setColor(msg.member.displayHexColor))}}}
