module.exports = {
  conf: {
    aliases: ["yetkiliinfo","ytbilgi","ytinfo","yetkilidurum","ytdurum","yetkilinfo"],
    name: "yetkilibilgi",
    usage: 'yetkilibilgi',
    description: 'Sunucunun yetkili kadrosu hakkında detaylı bilgi alırsınız.',
},

 run: async ({client, msg, args, cfg, author, MessageEmbed, uye,SetupDatabase}) => {
   
  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : [] 
  let botCommandsRoles = res && res.botCommandsRoles ? res.botCommandsRoles : []
  
  if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)                              
  if (botCommandsRoles.length === 0) return client.message(client.normalEmbed(`Henüz yetkili rolünün kurulumu yapılmamış, kurulumu yap ve tekrardan dene!`, msg), msg.channel.id)   

  let yetkili = msg.guild.members.cache.filter(x => {
   return x.roles.cache.some(r => botCommandsRoles.includes(r.id)) 
  }).size
  
  let aktif = msg.guild.members.cache.filter(x => {
   return (x.user.presence.status !== "offline") && x.roles.cache.some(r => botCommandsRoles.includes(r.id))
  }).size
  
  let çevrimdışı = msg.guild.members.cache.filter(x => {
   return (x.user.presence.status === "offline") && x.roles.cache.some(r => botCommandsRoles.includes(r.id))
  }).size
  
  let ses = msg.guild.members.cache.filter(x => {
   return x.voice.channel && x.roles.cache.some(r => botCommandsRoles.includes(r.id))
  }).size
  
  let noVoice = msg.guild.members.cache.filter(x => {
   return (x.user.presence.status !== "offline") && !x.voice.channel && x.roles.cache.some(r => botCommandsRoles.includes(r.id)) 
  }).size

  msg.channel.send(new MessageEmbed()
  .setDescription(`**${msg.guild.name}** adlı sunucunun detaylı yetkili bilgisi:
  
  \`⦁\` Sunucuda toplam **${yetkili}** yetkili bulunuyor.
  \`⦁\` Sunucuda aktif **${aktif}** yetkili bulunuyor.
  \`⦁\` Sunucuda çevrimdışı **${çevrimdışı}** yetkili bulunuyor.
  \`⦁\` Sunucuda sesli odalarda **${ses}** yetkili bulunuyor.
  \`⦁\` Sunucuda aktif olup seste olmayan **${noVoice}** yetkili bulunuyor.
  
  ${cfg.Emoji.Parlak} Sunucudaki yetkili **aktiflik** oranı:
     \`-\` ${progressBar(aktif, yetkili, 8)} / \`%${(aktif / yetkili * 100).toFixed(2)}\`
   
  ${cfg.Emoji.Parlak} Sunucudaki yetkili **ses** oranı:
     \`-\` ${progressBar(ses, yetkili, 8)} / \`%${(ses / yetkili * 100).toFixed(2)}\``).setColor("RANDOM").setThumbnail(msg.guild.iconURL({dynamic:true})).setAuthor(msg.guild.name, msg.guild.iconURL({dynamic:true})))

function progressBar(value, maxValue, size) {
 const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
 const emptyProgress = size - progress > 0 ? size - progress : 0;

 const progressText = cfg.Emoji.OrtaDoluBar.repeat(progress);
 const emptyProgressText = cfg.Emoji.OrtaBoşBar.repeat(emptyProgress);

 return emptyProgress < 8 ? `${cfg.Emoji.StartDoluBar}${progressText}${emptyProgressText}${emptyProgress === 0 ? cfg.Emoji.FinishDoluBar : cfg.Emoji.FinishBoşBar}` : `${cfg.Emoji.StartBoşBar}${progressText}${emptyProgressText}${cfg.Emoji.FinishBoşBar}`;
}}
}