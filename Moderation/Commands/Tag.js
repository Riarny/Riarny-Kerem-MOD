module.exports = {
  conf: {
    aliases: [],
    name: "tag",
    usage: 'tag',
    description: 'Sunucu tagını alırsınız.',
},

 run: async ({client, msg, args, author, MessageEmbed, uye, SetupDatabase}) => {
   
   const res = await SetupDatabase.findOne({guildID: msg.guild.id})
   let guildTag = res && res.guildTag ? res.guildTag : "Henüz sunucu tagının kurulumu yapılmamış, kurulumu yap ve tekrardan dene!"
   msg.channel.send(`\`\`\`${guildTag} | alvês | ' | #0021\`\`\``)}}  
