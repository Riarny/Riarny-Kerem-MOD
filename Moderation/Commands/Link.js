module.exports = {
  conf: {
    aliases: [],
    name: "link",
    usage: 'link',
    description: 'Sunucu linkini alırsınız.',
},

 run: async ({client, msg, args, author, MessageEmbed, uye, SetupDatabase}) => {
   
   if(msg.guild.vanityURLCode) {
    msg.channel.send(`https://discord.gg/${msg.guild.vanityURLCode} ${msg.author}`)
   } else {
    let codeee = await msg.channel.createInvite()
    msg.channel.send(`https://discord.gg/${codeee.code} ${msg.author}`) }}}