module.exports = {
  conf: {
    aliases: ["seviye-rol-list","seviye-role-list","rank-ödül-list","level-ödül-list", "level-rol-list", "seviyeödüllist", "levelödüllist", "ranködüllist", "seviyerollist", "seviye-rol-liste","seviye-role-liste","rank-ödül-liste","level-ödül-liste", "level-rol-liste", "seviyeödülliste", "levelödülliste", "ranködülliste", "seviyerolliste", "seviye-ödül-liste"],
    name: "seviye-ödül-list",
    serverowner: true
  },
  
  run: async ({client, msg, args, guildSeviyeDatabase, guild}) => {
   
    let AwardData = await guildSeviyeDatabase.findOne({ guildID: guild});
    if(AwardData.LevelAward.length === 0) {client.timemessage(client.normalEmbed(`Veritabanında \`seviye-ödül\` verisi bulunmuyor.`, msg), msg.channel.id, 5000);} else {
    AwardData = AwardData.LevelAward.filter(x => msg.guild.roles.cache.has(x.role)).sort((x, y) => y.level - x.level).map((x, index) => `\`${index+1}.\` <@&${x.role}> (\`${x.role}\`) rolü (**${x.level}** seviye)`).join("\n");
    client.message(client.normalEmbed(`Veritabanında bulunan \`seviye-ödül\` verileri. \n\n` + AwardData, msg), msg.channel.id);}}}