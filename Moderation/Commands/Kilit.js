module.exports = {
  conf: {
    aliases: ["kanalkilit","kanalkitle"],
    name: "kilit",
    usage: 'kilit',
    description: 'Komutu kullandığınız kanalı kullanıma kapatır.',
},

 run: async ({client, msg, args, author, MessageEmbed, StaffDatabase, SetupDatabase}) => {
    
    const res = await SetupDatabase.findOne({guildID: msg.guild.id})
    let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : [] 
    
    if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
    if (!client.locked[msg.channel.id]) client.locked[msg.channel.id] = { lock: false };
    if (client.locked[msg.channel.id].lock === false) {
    client.message(client.normalEmbed("**Kanal başarıyla kilitlendi.**", msg), msg.channel.id);
    msg.channel.updateOverwrite(msg.guild.roles.everyone, {  
     SEND_MESSAGES: false}) 
    client.locked[msg.channel.id].lock = true;} else {
    client.message(client.normalEmbed("**Kanalın kilidi başarıyla açıldı.**", msg), msg.channel.id);
    msg.channel.updateOverwrite(msg.guild.roles.everyone, {
     SEND_MESSAGES: null})
    client.locked[msg.channel.id].lock = false;}}}
