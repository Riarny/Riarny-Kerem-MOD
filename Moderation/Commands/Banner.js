module.exports = {
  conf: {
    aliases: ["afiş"],
    name: "banner",
    usage: 'banner [uye]',
    description: 'Belirttiğiniz üyenin bannerini alırsınız.',
  },

 run: async ({client, msg, args, author, GeneralDatabase, MessageEmbed, Discord, fetch}) => {
   
  try {let member = msg.mentions.members.first() || args[0] || author
  let victim;
  if (member instanceof Discord.GuildMember) { victim = member.user; }else if(member instanceof Discord.User) { victim = member; }else { victim = await client.users.fetch(member) } 

  let response = fetch(`https://discord.com/api/v8/users/${victim.id}`, { method: 'GET', headers: { Authorization: `Bot ${client.token}`}})
  let receive = ''
  let banner = 'Yok.' 
   response.then(a => {
    if (a.status !== 404) {
     a.json().then(data => {
      receive = data['banner']
  if (receive !== null) {
   let response2 = fetch(`https://cdn.discordapp.com/banners/${victim.id}/${receive}.gif`, { method: 'GET', headers: { Authorization: `Bot ${client.token}`}})
  let statut = ''
   response2.then(b => {
    statut = b.status
    banner = `https://cdn.discordapp.com/banners/${victim.id}/${receive}.gif?size=1024`
  if (statut === 415) {
    banner = `https://cdn.discordapp.com/banners/${victim.id}/${receive}.png?size=1024`}})}})}})

 setTimeout(() => {
 if (banner === 'Yok.') return client.message(client.normalEmbed(`${victim} adlı kullanıcının profilinde banner bulunmuyor!`, msg), msg.channel.id)
 msg.channel.send(`${victim.tag.replace("`","")} ${banner}`)
 }, 1000)
 }catch{{}}}}