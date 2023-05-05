module.exports = {
  conf: {
    aliases: [],
    name: "git",
    usage: 'git [üye]',
    description: 'Sesli kanallarda belirttiğiniz kullanıcının bulunduğu kanala izinli bir şekilde gidersiniz.',
 },
  
 run: async ({client, msg, args,author, uye, MessageEmbed, SetupDatabase}) => {
  
    const res = await SetupDatabase.findOne({guildID: msg.guild.id})
    let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : [] 
    if (!msg.member.voice.channel) return client.timemessage(client.normalEmbed(`İlk önce ses kanallarından birine girmelisin. Girdikten sonra tekrar denersen olacaktır.`, msg), msg.channel.id, 5000) 
    if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
    const filter = (reaction, user) => {return ["976939143290572901", "976939024524673064"].includes(reaction.emoji.id) && user.id === uye.id;};
    if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
    if (uye.user.bot) return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
    if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
    if (!uye.voice.channel) return client.timemessage(client.normalEmbed(`Belirttiğin kişi herhangi bir ses kanalında değil.`, msg), msg.channel.id, 5000)
    if (uye.voice.channel.id === msg.member.voice.channel.id) return client.timemessage(client.normalEmbed(`Zaten belirttiğin kişi ile aynı ses kanalındasın.`, msg), msg.channel.id, 5000)
    if (msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && msg.member.hasPermission(268435456) && msg.member.hasPermission(8)) {client.git(uye, msg.member); client.timemessage(client.normalEmbed(`Başarıyla ${uye} adlı üyenin kanalına taşındınız.`, msg), msg.channel.id, 5000); client.react(msg, "tick"); return}
    client.timemessage(`${uye}`, msg, msg.channel.id, 3000)
    msg.channel.send(new MessageEmbed().setFooter('Eğer istek onaylanmazsa 20 saniye sonra iptal edilecek.').setDescription(`${uye}, ${msg.author} Bulunduğunuz Sesli Kanala Gelmek İstiyor. Kabul Ediyor Musunuz?`).setAuthor(msg.author.tag, msg.member.user.avatarURL({dynamic: true})).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)])).then(m => m.react("976939143290572901").then(a => m.react("976939024524673064")).then(s =>m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(collected => {const reaction = collected.first()
    if (reaction.emoji.id === "976939143290572901") {client.timemessage(`${msg.author}, Belirttiğin kişinin bulunduğu ses kanalına taşındın.`, msg, msg.channel.id, 3000)
    m.delete()
    client.react(msg, "tick")
    client.git(uye, msg.member)} else {client.timemessage(`${msg.author}, Belirttiğin kişi bulunduğu ses kanalına gelmeni istemiyor bu sebepten ötürü ses kanalına taşıyamadım.`, msg, msg.channel.id, 3000)
    m.delete()
    client.react(msg, "red")}}).catch(() => m.edit(new MessageEmbed().setColor(`RANDOM`).setAuthor(msg.author.tag, msg.member.user.avatarURL({dynamic:true})).setDescription(`Seçim için belirtilen sürede tepkiye tıklanmadığı için işlem iptal edildi.`)) && m.reactions.removeAll() && client.react(msg, "red"))));}}