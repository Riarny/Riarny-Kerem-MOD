module.exports = {
  conf: {
    aliases: ["temizle"],
    name: "sil",
    usage: 'sil [sayı]',
    description: 'Komutu kullandığını kanalda belirttiğiniz kadar mesaj siler.',
},

 run: async ({client, msg, args, author, MessageEmbed, uye, SetupDatabase}) => {
  
  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : []  
  let messageLog = res && res.messageLog ? res.messageLog : ""
  
  if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)                              
   let amount = args[0];
   if (!amount || isNaN(amount) || parseInt(amount) < 1) return client.timemessage(client.normalEmbed("Bir sayı belirt ve tekrardan dene!", msg), msg.channel.id, 7000)
    await msg.delete();
   const user = msg.mentions.users.first();
   let messages = await msg.channel.messages.fetch({ limit: 100 });
    messages = messages.array();
   if (user) {
    messages = messages.filter((m) => m.author.id === user.id);
   }
   if (messages.length > amount) {
    messages.length = parseInt(amount, 10);
   }
    messages = messages.filter((m) => !m.pinned);
    amount++;
   msg.channel.bulkDelete(messages, true);
   if (user) {
    client.timemessage(client.normalEmbed(`${user} kişisinin **${messages.length}** mesajı sildi.`, msg), msg.channel.id, 7000)
   } else {
    client.timemessage(client.normalEmbed(`**${messages.length}** mesaj silindi.`, msg), msg.channel.id, 7000)
   }
   if (client.channels.cache.get(messageLog)) client.channels.cache.get(messageLog).send(new MessageEmbed().setDescription(`${msg.author}, <#${msg.channel.id}> kanalında **${messages.length}** mesaj sildi!`).setTitle(`**Sohbet Temizlendi!**`).setTimestamp().setFooter(`Vegas Was Here!`).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]))}}