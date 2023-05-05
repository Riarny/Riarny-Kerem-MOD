module.exports = {
  conf: {
    aliases: ["seviye-rol-delete","seviye-role-delete","rank-ödül-delete","level-ödül-delete", "level-rol-delete", "seviyeödüldelete", "levelödüldelete", "ranködüldelete", "seviyeroldelete", "seviye-rol-sil","seviye-role-sil","rank-ödül-sil","level-ödül-sil", "level-rol-sil", "seviyeödülsil", "levelödülsil", "ranködülsil", "seviyerolsil", "seviye-ödül-sil"],
    name: "seviye-ödül-delete",
    serverowner: true
  },
  
  run: async ({client, msg, args, prefix, guildSeviyeDatabase, guild}) => {

    let level = args[0]
    let AwardData = await guildSeviyeDatabase.findOne({ guildID: msg.guild.id});
    let role = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[1]) || args[1];
    if(!level || isNaN(level) || level < 0) return client.timemessage(client.normalEmbed(`Lütfen tüm argümanları doğru giriniz.\nÖrnek Kullanım: ${prefix}seviye-ödül-delete {seviye} {rol}`, msg), msg.channel.id, 5000);
    if(!role) return client.timemessage(client.normalEmbed(`Lütfen tüm argümanları doğru giriniz.\nÖrnek Kullanım: ${prefix}seviye-ödül-delete {seviye} {rol}`, msg), msg.channel.id, 5000);
    if(!AwardData) {let NewAward = new guildSeviyeDatabase({guildID: msg.guild.id,}).save().then(data => { return client.timemessage(client.normalEmbed(`\`${level}\` seviyesinde böyle bir ödül yok.`, msg), msg.channel.id, 5000);});} else {
    if(AwardData.LevelAward.find(x => x.level == level && x.role == (role.id || role))) {
    AwardData.LevelAward = AwardData.LevelAward.filter(x => x.role != (role.id || role));
    AwardData.save();
    client.message(client.normalEmbed(`Başarıyla \`${level}\` seviyesinin ödülü kaldırıldı.`, msg), msg.channel.id);} else {return client.timemessage(client.normalEmbed(`\`${level}\` seviyesinde böyle bir ödül yok.`, msg), msg.channel.id, 5000);};};}}