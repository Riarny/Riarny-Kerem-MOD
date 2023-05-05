module.exports = {
  conf: {
    aliases: [],
    name: "alarm",
    usage: 'alarm [süre] [sebep]',
    description: 'Belirttiğiniz süre gelince belirttiğiniz sebebi hatırlatır.',
  },
 run: async ({client, msg, args, author, Discord, moment, ms, AlarmDatabase, SetupDatabase}) => {
   
        const res = await SetupDatabase.findOne({guildID: msg.guild.id})
        let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : ""
        let tagged = res && res.taggedRole ? res.taggedRole : ""
        if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.roles.cache.has(tagged)) return client.timemessage(client.normalEmbed(`Bu özellik sadece taglı üyelerimiz içindir. Tag alıp kullanabilirsin.`, msg), msg.channel.id, 5000) 
        await AlarmDatabase.findOne({ user: msg.author.id }, async (err, res) => {
        let time = args[0]
        if (!time || isNaN(ms(time))) return client.timemessage(client.normalEmbed("Alarm kurmam için bir zaman belirtmelisin.", msg), msg.channel.id, 5000) 
        if (!args.slice(1).join(" ")) return client.timemessage(client.normalEmbed("Alarm sebebini belirtmelisin.", msg), msg.channel.id, 5000) 
        let regex = /h?t?t?p?s?:?\/?\/?discord.?gg\/?[a-zA-Z0-9]+/
        let regexSecond = /h?t?t?p?s?:?\/?\/?discorda?p?p?.?com\/?invites\/?[a-zA-Z0-9]+/
        if (regex.test(msg.content) == true || regexSecond.test(msg.content) == true) return 
        if (msg.content.includes("@everyone")) return
        if (msg.content.includes("@here")) return
        if (!res) {
        const newData = new AlarmDatabase({
         user: msg.author.id,
         alarm: true,
         sebep: args.slice(1).join(" "),
         endDate: Date.now() + ms(args[0]),
         channel: msg.channel.id})
        newData.save().catch(e => console.log(e))
        } else {
         res.user = msg.author.id
         res.alarm = true
         res.sebep = args.slice(1).join(" ")
         res.endDate = Date.now() + ms(args[0])
         res.channel = msg.channel.id
         res.save().catch(e => console.log(e))}
        let tamam = moment(Date.now() + ms(args[0]) - 10800000).locale("TR").fromNow()
        msg.channel.send(":alarm_clock: | Alarmı kurdum sana bunu " + tamam + " hatırlatacağım.")})}}
