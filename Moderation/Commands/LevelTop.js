module.exports = {
  conf: {
    aliases: ['seviyelb','SeviyeLeaderboard','topseviyerank','topseviye','leveltop','toplevel','seviyetop','seviye-top','top-seviye'],
    name: "topseviye",
  },
  
  run: async ({client, msg, args, MessageEmbed, seviyeDatabase}) => {
  
    const Embed = new MessageEmbed().setColor("RANDOM").setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true, size: 2048 }));
    let levelData = await seviyeDatabase.find({ guildID: msg.guild.id }).sort({ lvl: -1 }).exec();  
    let LevelData = await seviyeDatabase.findOne({ guildID: msg.guild.id, userID: msg.author.id });
    if(!levelData.length) return client.timemessage(client.normalEmbed(`Veritabanında seviye verisi bulunamadı.`, msg), msg.channel.id, 5000)
    let arr = [];
    levelData.forEach((x) => arr.push({ id: x.userID, total: x.total }));
    let index = arr.findIndex((x) => x.id == msg.author.id) + 1;
    levelData = levelData.filter(x => msg.guild.members.cache.has(x.userID)).slice(0, 20).map((x, index) => `${x.userID === msg.author.id ? `\`${index + 1}.\` <@${x.userID}> \`${x.lvl} Seviye.\` (**Siz**)` : `\`${index + 1}.\` <@${x.userID}> \`${x.lvl} Seviye.\``}`).join("\n");
    Embed.setDescription(`Top 20 seviye sıralaması aşağıda belirtilmiştir.\n\n${levelData} \n\n${LevelData ? `Siz ${index}. sırada bulunuyorsunuz. Seviyeniz ${LevelData.lvl}` : `Siz sıralamada bulunmuyorsunuz.`}`);
    msg.channel.send(Embed)
    client.react(msg, "tick")}}
