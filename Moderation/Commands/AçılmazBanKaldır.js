module.exports = {
  conf: {
    aliases: ["acılmazban-kaldır", "acılmaz-ban-kaldır", "açılmaz-ban-kaldır", "açılamazban-kaldır", "acılamazban-kaldır", "açılamaz-ban-kaldır", "acılamaz-ban-kaldır"],
    name: "açılmazbankaldır",
    usage: 'açılmazbankaldır [ID]',
    description: 'Belirttiğiniz ID li kullanıcı açılamaz olan etiketini kaldırırsınız.',
  },
 run: async ({client, msg, args, author, Discord, moment, ms, AçılmazBanDatabase, SetupDatabase}) => {
   
        const res = await SetupDatabase.findOne({guildID: msg.guild.id})
        let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : []
        if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 7000)
        await client.users.fetch(args[0]).then(res => {
        if (!res) {client.timemessage(client.normalEmbed(`Geçerli bir kullanıcı ID si giriniz.`, msg), msg.channel.id, 7000)} else {
        msg.guild.fetchBans(true).then(async (bans) => {
        let ban = await bans.find(a => a.user.id === res.id)
        if (!ban) {client.message(client.normalEmbed(`\`${res.tag}\` bu sunucuda yasaklı değil!`, msg), msg.channel.id)} else {
        await AçılmazBanDatabase.findOne({ user: res.id }, async (err, doc) => {
        if (!doc) {client.message(client.normalEmbed(`**${res.tag}** kullanıcısının açılmaz ban etiketi bulunmuyor.`, msg), msg.channel.id)} else {
        if (!msg.member.hasPermission(8)) return client.message(client.normalEmbed(`Bu kullanıcının açılmaz ban etiketini kaldırmak için yeterli izinlere sahip değilsin.`, msg), msg.channel.id)
        doc.delete().catch(e => console.log(e))
        client.message(client.normalEmbed(`**${res.tag}** kullanıcısının açılmaz ban etiketi kaldırıldı. Artık banı açılabilecek.`, msg), msg.channel.id)}})}})}}).catch(err => {client.timemessage(client.normalEmbed(`Geçerli bir kullanıcı ID si giriniz.`, msg), msg.channel.id, 7000)})}}