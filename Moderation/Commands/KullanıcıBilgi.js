const humanizeDuration = require("humanize-duration")

module.exports = {
  conf: {
    aliases: ["kb","profil","kullanıcıinfo"],
    name: "kullanıcıbilgi",
    usage: 'kullanıcıbilgi [üye]',
    description: 'Belirttiğiniz kullanıcının hesabı hakkında detaylı bilgi alırsınız.',
},

 run: async ({client, msg, args, cfg, author, SetupDatabase, MessageEmbed, uye, fetch, moment, Discord, uyekontrol, CezapuanDatabase, CezaSayıDatabase, StaffDatabase}) => {

   const res = await SetupDatabase.findOne({guildID: msg.guild.id})
   let botCommandsTrue = res && res.botCommandsRoles ? res.botCommandsRoles : [] 
   let chatMuteTrue = res && res.chatMuteRoles ? res.chatMuteRoles : [] 
   let voiceMuteTrue = res && res.voiceMuteTrue ? res.voiceMuteTrue : [] 
   let banTrue = res && res.banHammerRoles ? res.banHammerRoles : []
   let jailTrue = res && res.jailRoles ? res.jailRoles : []
  
   let user = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]) || msg.author;
   const member = msg.guild.member(user);
   if(uyekontrol === "False") {
   if(args[0]) {
   let victim;
   try{if(args[0] instanceof Discord.GuildMember) { victim = args[0].user; }else if(args[0] instanceof Discord.User) { victim = args[0]; }else { victim = await client.users.fetch(args[0])}
   let flags = victim.flags.toArray()
   let vgs = victim.avatarURL({ dynamic: true });
   let uflags = flags.map(x => x.toString()).join(",");uflags = uflags.replace("HOUSE_BRAVERY", cfg.Emoji.Bravery);uflags = uflags.replace("HOUSE_BALANCE", cfg.Emoji.Balance);uflags = uflags.replace("DISCORD_PARTNER", cfg.Emoji.Partner);uflags = uflags.replace("HYPESQUAD_EVENTS", cfg.Emoji.Hype);uflags = uflags.replace("EARLY_SUPPORTER", cfg.Emoji.Early);uflags = uflags.replace("EARLY_VERIFIED_DEVELOPER", cfg.Emoji.Developer);uflags = uflags.replace("HOUSE_BRILLIANCE", cfg.Emoji.Brilliance);uflags = uflags.replace("HYPESQUAD_EVENTS", cfg.Emoji.Event);uflags = uflags.replace("DISCORD_EMPLOYEE", cfg.Emoji.Staff);uflags = uflags.replace("BHUNTER_LEVEL_1", cfg.Emoji.BugHunter);uflags = uflags.replace("BHUNTER_LEVEL_2", cfg.Emoji.BugHunter2)
   if (flags == ""){uflags = "Rozet bulunamadı."}
   msg.channel.send(new MessageEmbed().addField(`❯ Rozetler`, `${vgs === null ? '' : vgs.includes('gif') ? `${cfg.Emoji.Nitro},` : ""}${member.user.premiumSinceTimestamp ? ` ${cfg.Emoji.Booster},` : ""} ${uflags}`).addField(`❯ Kullanıcı Bilgisi`, `ID: ${victim.id}\n Profil: ${victim}\nOluşturulma: ${moment(victim.createdAt).locale("TR").format("LLL")} - (${moment(victim.createdAt).locale("TR").fromNow()})`).setAuthor(victim.tag, victim.avatarURL({dynamic:true})).setColor("RANDOM").setThumbnail(victim.avatarURL({dynamic: true})))
   }catch{{}}return}}
   const members = msg.guild.members.cache.filter(x => !x.user.bot).array().sort((a, b) => a.joinedTimestamp - b.joinedTimestamp);
   const joinPos = members.map((u) => u.id).indexOf(member.id);
   const previous = members[joinPos - 1] ? members[joinPos - 1].user : null;
   const next = members[joinPos + 1] ? members[joinPos + 1].user : null;
   let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: member.id})
   let CezaSayıData = await CezaSayıDatabase.findOne({ guildID: msg.guild.id, userID: member.id})
   let StaffData = await StaffDatabase.findOne({ guildID: msg.guild.id, userID: member.id})
   let chatMute = CezaSayıData && CezaSayıData.chatmute ? CezaSayıData.chatmute : 0
   let sesMute = CezaSayıData && CezaSayıData.voicemute ? CezaSayıData.voicemute : 0
   let ban = CezaSayıData && CezaSayıData.ban ? CezaSayıData.ban : 0
   let jail = CezaSayıData && CezaSayıData.jail ? CezaSayıData.jail : 0
   let total = chatMute+sesMute+ban+jail;
   let totalCezapuan = CezapuanData && CezapuanData.cezaPuanıTotal ? CezapuanData.cezaPuanıTotal : 0
   let durum;if(totalCezapuan > 101) durum = "Aşırı Güvensiz";if(totalCezapuan === 101) durum = "Aşırı Güvensiz";if(totalCezapuan < 100) durum = "Aşırı Tehlikeli";if(totalCezapuan === 100) durum = "Aşırı Tehlikeli";if(totalCezapuan === 71) durum = "Aşırı Tehlikeli";if(totalCezapuan < 70) durum = "Tehlikeli";if(totalCezapuan === 70) durum = "Tehlikeli";if(41 === totalCezapuan) durum = "Tehlikeli";if(totalCezapuan === 40) durum = "Şüpheli";if(totalCezapuan < 40) durum = "Şüpheli";if(21 === totalCezapuan) durum = "Şüpheli";if(totalCezapuan < 20) durum = "Güvenli";if(20 === totalCezapuan) durum = "Güvenli";if(totalCezapuan === 1) durum = "Güvenli";if(totalCezapuan == `0`) durum = "Çok Güvenli";
   const durumm = (member.user.presence.status == "online" ? ""+cfg.Emoji.Online+" **Çevrimiçi**":  (member.user.presence.status == "offline" ? ""+cfg.Emoji.Offline+" **Çevrimdışı**": (member.presence.status == "idle" ? ""+cfg.Emoji.Idle+" **Boşta**": (member.presence.status == "dnd" ? ""+cfg.Emoji.Dnd+" **Rahatsız Etmeyin** ": ("Görünmez")))))
   let oynuyor;if (member.user.presence.game) oynuyor = "\nOynuyor: " + member.user.presence.game.name;if (member.user.presence.game && member.user.presence.game.name === "Custom Status") oynuyor = "\nCustom Status: " + member.user.presence.game.state;if (member.user.presence.game && member.user.presence.game.name === "Spotify") oynuyor = "\nSpotify üzerinden dinliyor: " + member.user.presence.game.details + " - " + member.user.presence.game.state;if (member.user.presence.game && member.user.presence.game.name === "Twitch") oynuyor = "\nTwitch üzerinden izliyor: " + member.user.presence.game.details + " - " + member.user.presence.game.state;if (member.user.presence.game && member.user.presence.game.name === "YouTube") oynuyor = "\nYouTube üzerinden izliyor: " + member.user.presence.game.details + " - " + member.user.presence.game.state;
   let nick;
   if (member.user.username !== member.displayName) nick = member.displayName
   let flags = member.user.flags.toArray()
   let vgs = member.user.avatarURL({ dynamic: true });
   let uflags = flags.map(x => x.toString()).join(",");uflags = uflags.replace("HOUSE_BRAVERY", cfg.Emoji.Bravery);uflags = uflags.replace("HOUSE_BALANCE", cfg.Emoji.Balance);uflags = uflags.replace("DISCORD_PARTNER", cfg.Emoji.Partner);uflags = uflags.replace("HYPESQUAD_EVENTS", cfg.Emoji.Hype);uflags = uflags.replace("EARLY_SUPPORTER", cfg.Emoji.Early);uflags = uflags.replace("EARLY_VERIFIED_DEVELOPER", cfg.Emoji.Developer);uflags = uflags.replace("VERIFIED_BOT", cfg.Emoji.Developer);uflags = uflags.replace("HOUSE_BRILLIANCE", cfg.Emoji.Brilliance);uflags = uflags.replace("HYPESQUAD_EVENTS", cfg.Emoji.Event);uflags = uflags.replace("DISCORD_EMPLOYEE", cfg.Emoji.Staff);uflags = uflags.replace("BHUNTER_LEVEL_1", cfg.Emoji.BugHunter);uflags = uflags.replace("BHUNTER_LEVEL_2", cfg.Emoji.BugHunter2)
   if (flags == ""){uflags = "Rozet bulunamadı."}
   let sunucuda;
   if (msg.guild.members.cache.has(member === true)) sunucuda = "evet"
   let yetkiliBilgisii = ``;
   let yetkiliBilgisi = ``;
   if ((member.roles.cache.some(r => botCommandsTrue.includes(r.id)))||(member.roles.cache.some(r => banTrue.includes(r.id)))||(member.roles.cache.some(r => voiceMuteTrue.includes(r.id)))||(member.roles.cache.some(r => chatMuteTrue.includes(r.id)))||(member.roles.cache.some(r => jailTrue.includes(r.id)))||(member.hasPermission(8))){
  let erkek = StaffData && StaffData.erkekkayıt ? StaffData.erkekkayıt : 0
  let kız = StaffData && StaffData.kızkayıt ? StaffData.kızkayıt : 0
  let totalll = erkek+kız
    yetkiliBilgisii += `\`•\` Teyit Bilgisi: Toplam: **${totalll}** (**${erkek}** erkek, **${kız}** kız)\n`;};
   if ((member.roles.cache.some(r => botCommandsTrue.includes(r.id)))||(member.roles.cache.some(r => banTrue.includes(r.id)))||(member.roles.cache.some(r => voiceMuteTrue.includes(r.id)))||(member.roles.cache.some(r => chatMuteTrue.includes(r.id)))||(member.roles.cache.some(r => jailTrue.includes(r.id)))||(member.hasPermission(8))){
   let chatMuteee = StaffData && StaffData.chatmute ? StaffData.chatmute : 0
   let sesMuteee = StaffData && StaffData.voicemute ? StaffData.voicemute : 0
   let bannn = StaffData && StaffData.ban ? StaffData.ban : 0
   let jailll = StaffData && StaffData.jail ? StaffData.jail : 0
   let totalll = chatMuteee+sesMuteee+bannn+jailll;
    yetkiliBilgisi += `**❯ Yetkili Bilgisi**\n\`•\` Cezalandırma Bilgisi: Toplam: **${totalll}** (**${chatMuteee}** chat, **${sesMuteee}** ses mute, **${jailll}** jail, **${bannn}** ban)\n`;};
   let roller = member.roles.cache.size < 8 ? member.roles.cache.filter(r => r.name !== "@everyone").map(r => r).join(", ") : member.roles.cache.filter(r => r.name !== "@everyone").map(r => r).join(', ') + `, ${member.roles.cache.size - 7} daha...`
   let response = fetch(`https://discord.com/api/v8/users/${member.id}`, { method: 'GET', headers: { Authorization: `Bot ${client.token}`}})
   let receive = ''
   let banner = 'Yok.' 
   response.then(a => {
    if (a.status !== 404) {
     a.json().then(data => {
      receive = data['banner']
   if (receive !== null) {
    let response2 = fetch(`https://cdn.discordapp.com/banners/${member.id}/${receive}.gif`, { method: 'GET', headers: { Authorization: `Bot ${client.token}`}})
   let statut = ''
   response2.then(b => {
    statut = b.status
    banner = `https://cdn.discordapp.com/banners/${member.id}/${receive}.gif?size=1024`
   if (statut === 415) {
    banner = `https://cdn.discordapp.com/banners/${member.id}/${receive}.png?size=1024`}})}})}})
   setTimeout(() => {
   let newEmbed = new MessageEmbed().setThumbnail(member.user.avatarURL({dynamic: true})).setColor(member.displayHexColor).setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }))
    newEmbed.addField(`❯ Kullanıcı Bilgisi`, `\`•\` Rozetler: ${vgs === null ? '' : vgs.includes('gif') ? `${cfg.Emoji.Nitro},` : ""}${member.user.premiumSinceTimestamp ? ` ${cfg.Emoji.Booster},` : ""} ${uflags}\n\`•\` Hesap: ${member}\n\`•\` Kullanıcı ID: ${member.id}\n\`•\` Durum: ${(member.user.presence.status).replace("offline", (""+cfg.Emoji.Offline+"")).replace("online", (""+cfg.Emoji.Online+"")).replace("idle", (""+cfg.Emoji.Idle+"")).replace("dnd", (""+cfg.Emoji.Dnd+""))} ${member.user.presence.activities[0] ? member.user.presence.activities[0].name + ` ${(member.user.presence.activities[0].type)}`.replace("PLAYING", "Oynuyor").replace("STREAMING", "Yayında").replace("LISTENING", "Dinliyor").replace("WATCHING", "İzliyor").replace("CUSTOM_STATUS", "") : (member.user.presence.status).replace("offline", "Görünmez/Çevrimdışı").replace("online", "Çevrimiçi").replace("idle", "Boşta").replace("dnd", "Rahatsız Etmeyin")}\n\`•\` Kuruluş Tarihi: ${moment(member.user.createdAt).locale("TR").format("LLL")} - (${moment(member.user.createdAt).locale("TR").fromNow()})`)
    newEmbed.addField(`❯ Sunucu Bilgisi`, `${nick ? "\n\`•\` Sunucu İsmi: " + nick : ""} \n\`•\` Katılım Tarihi: ${moment(member.joinedAt).locale("TR").format("LLL")} - (${moment(member.joinedAt).locale("TR").fromNow()})\n\`•\` Katılım Sırası: ${(msg.guild.members.cache.filter(a => a.joinedTimestamp <= member.joinedTimestamp).size).toLocaleString()}/${(msg.guild.memberCount).toLocaleString()} \n\`•\` Katılım Bilgisi: ${previous ? `**${previous}** > ` : ""}<@${user.id}>${next ? ` > **${next}**` : ""}${member.roles.cache.array().filter(r => r.hoist).sort((a, b) => b.rawPosition - a.rawPosition)[0] ? `\n\`•\` Ayırıcı Rolü: <@&`+ member.roles.cache.array().filter(r => r.hoist).sort((a, b) => b.rawPosition - a.rawPosition)[0] + `>\n` : ``}\`•\` Cezaları: Toplam: **${total}** (**${jail}** jail, **${ban}** ban, **${chatMute}** chatmute, **${sesMute}** sesmute)\n\`•\` Ceza Puanı: ${totalCezapuan} (${durum})\n\`•\` Rolleri (${member.roles.cache.size - 1}): ${roller}\n\n${yetkiliBilgisi} ${yetkiliBilgisii}`)               
   if (member.premiumSinceTimestamp) newEmbed.addField(`❯ Booster`, `${moment(member.premiumSinceTimestamp).tz("Europe/Istanbul").format("Do MMMM YYYY hh:mm")} tarihinden beri bu sunucuyu yükseltiyor! (${moment(Date.now() - member.premiumSinceTimestamp).locale("TR").fromNow()})`) 
   if (banner !== 'Yok.') newEmbed.setImage(banner)
   msg.channel.send(newEmbed)
  }, 1000) 
 }}