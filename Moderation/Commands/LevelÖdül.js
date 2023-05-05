module.exports = {
  conf: {
    aliases: ["seviye-rol","seviye-role","rank-ödül","level-ödül", "level-rol", "seviyeödül", "levelödül", "ranködül", "seviyerol"],
    name: "seviye-ödül",
    serverowner: true
  },
  
  run: async ({client, msg, args, prefix, guildSeviyeDatabase, guild}) => {
  
    let level = args[0]
    let AwardData = await guildSeviyeDatabase.findOne({ guildID: msg.guild.id});
    let role = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[1]);
    if(!level || isNaN(level) || level < 0) return client.timemessage(client.normalEmbed(`Lütfen tüm argümanları doğru giriniz.\nÖrnek Kullanım: ${prefix}seviye-ödül {seviye} {rol}`, msg), msg.channel.id, 5000);
    if(!role) return client.timemessage(client.normalEmbed(`Lütfen tüm argümanları doğru giriniz.\nÖrnek Kullanım: ${prefix}seviye-ödül {seviye} {rol}`, msg), msg.channel.id, 5000);
    if(!AwardData) {let NewAward = new guildSeviyeDatabase({guildID: msg.guild.id,LevelAward: [{ level: level, role: role.id}]}).save();client.message(client.normalEmbed(`Başarıyla \`${level}\` seviyesine ödül olarak \`${role.name}\` rolünü ekledim.`, msg), msg.channel.id)} else {
    if(AwardData.LevelAward.find(x => x.level == level && x.role == role.id)) {client.timemessage(client.normalEmbed(`Zaten bu seviyede bir rol bulunmakta.`, msg), msg.channel.id, 5000)
    } else {
    if(AwardData.LevelAward.find(x => x.role == role.id)) return client.timemessage(client.normalEmbed(`Zaten seviye ödüllerinde böyle bir rol bulunmakta.`, msg), msg.channel.id, 5000)
    AwardData.LevelAward.push({ level: level, role: role.id});
    AwardData.save();
    client.message(client.normalEmbed(`Başarıyla \`${level}\` seviyesine ödül olarak \`${role.name}\` rolünü ekledim.`, msg), msg.channel.id)}}}}