module.exports = {
  conf: {
    aliases: [],
    name: "uptime",
    owner: true,
    usage: 'uptime',
    description: 'Botun ne kadar süredir aktif olduğuna bakarsınız.',
  },
  
  run: async ({client, msg, args, moment}) => {
    
   msg.channel.send(`Bot ${moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]")} önce çalışmaya başladı.`)
 }}