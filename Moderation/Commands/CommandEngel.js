module.exports = {
  conf: {
    aliases: ["commands-block", "komutengel", "commands-block", "commandsengel"],
    name: "komut-engel",
    owner: true,
    usage: 'komut-engel [uye]',
    description: 'Belirttiğiniz üyenin komut engelini açarsınız.',
  },

 run: async ({client, msg, args, author, uye, cfg, ControlsDatabase}) => {
   
   if (!uye) return client.message(client.normalEmbed(`Bir üye belirt ve tekrardan dene!`, msg), msg.channel.id)
   let res = await ControlsDatabase.findOne({guildID: msg.guild.id})
   let blocks = res && res.blockedFromCommand ? res.blockedFromCommand : []
   if (blocks.length == 0) return client.message(client.normalEmbed(`Belirttiğiniz üyenin komut yasağı bulunmuyor!`, msg), msg.channel.id)
   if (blocks.includes(uye.id)) {
    res.blockedFromCommand = res.blockedFromCommand.filter(x => x != (uye.id || uye.id));
    res.save()
    msg.channel.send(`${cfg.Emoji.TickEmoji} ${uye.user.tag}'nin komut yasağı kaldırıldı.`)
    client.react(msg, "tick")
   } else return client.message(client.normalEmbed(`Belirttiğiniz üyenin komut yasağı bulunmuyor!`, msg), msg.channel.id)}}