module.exports = {
  conf: {
    aliases: ["topcezapuan", "cezapuantop", "cezapuanıtop"],
    name: "topcezapuanı",
    usage: 'topcezapuan',
    description: 'Sunucu da en çok ceza puanı olan ilk 20 kişiyi ve kayıt verilerini görürsünüz.',
 },

 run: async ({client, msg, args, author, uye, guild, MessageEmbed, CezaDatabase, SetupDatabase, CezapuanDatabase}) => {
   
    const res = await SetupDatabase.findOne({guildID: msg.guild.id})
    let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : [] 
    
    let cezaPuanıData = await CezapuanDatabase.find({ guildID: msg.guild.id }).sort({ cezaPuanıTotal: -1 });
    if (!cezaPuanıData.length) return client.timemessage(client.normalEmbed("Veritabanında kayıt verisi bulunamadı.", msg), msg.channel.id, 5000);
    let arr = [];
    cezaPuanıData.forEach((x) => arr.push({ id: x.userID, total: x.cezaPuanıTotal }));
    let index = arr.findIndex((x) => x.id == msg.author.id) + 1;
    let sıralama = cezaPuanıData
    .filter((x) => msg.guild.members.cache.has(x.userID))
    .splice(0, 20)
    .map((x, index) => `${x.userID === msg.author.id ? `\`${index + 1}.\` <@${x.userID}> \`${x.cezaPuanıTotal} Ceza Puanı.\` (**Siz**)` : `\`${index + 1}.\` <@${x.userID}> \`${x.cezaPuanıTotal} Ceza Puanı.\``}`)
    .join("\n");
    let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: msg.author.id})
    let totalCezapuan = CezapuanData && CezapuanData.cezaPuanıTotal ? CezapuanData.cezaPuanıTotal : 0
    let durum;if(totalCezapuan > 101) durum = "Aşırı Güvensiz";if(totalCezapuan === 101) durum = "Aşırı Güvensiz";if(totalCezapuan < 100) durum = "Aşırı Tehlikeli";if(totalCezapuan === 100) durum = "Aşırı Tehlikeli";if(totalCezapuan === 71) durum = "Aşırı Tehlikeli";if(totalCezapuan < 70) durum = "Tehlikeli";if(totalCezapuan === 70) durum = "Tehlikeli";if(41 === totalCezapuan) durum = "Tehlikeli";if(totalCezapuan === 40) durum = "Şüpheli";if(totalCezapuan < 40) durum = "Şüpheli";if(21 === totalCezapuan) durum = "Şüpheli";if(totalCezapuan < 20) durum = "Güvenli";if(20 === totalCezapuan) durum = "Güvenli";if(totalCezapuan === 1) durum = "Güvenli";if(totalCezapuan == `0`) durum = "Çok Güvenli";
    client.message(client.normalEmbed(`Top 20 ceza puan sıralaması aşağıda belirtilmiştir.\n\n ${sıralama}\n\n${index === 0 ? `Siz sıralamada bulunmuyorsunuz.` : `Siz ${index}. sırada bulunuyorsunuz. Toplam ${totalCezapuan} ceza puanınız var. \`${durum}\``}`, msg), msg.channel.id)
    client.react(msg, "tick")}}