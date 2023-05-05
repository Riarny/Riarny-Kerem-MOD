module.exports = {
  conf: {
    aliases: ["levelrenk","srenk", "seviye-renk"],
    name: "seviyerenk",
  },
  
  run: async ({client, msg, args, MessageEmbed, seviyeDatabase, guildSeviyeDatabase, prefix, cfg}) => {
  
  let array = ["sıfırla", "reset"]
  let sec = args[0]
  let res = await seviyeDatabase.findOne({guildID: msg.guild.id, userID: msg.author.id}) 
  let svy = res ? res.lvl : 0
  if(!cfg.Bot.Owners.includes(msg.author.id)) {
  if (svy < 10) return client.message(client.normalEmbed(`Bu komutu kullanabilmek için **10 seviye** üstünde olmalısın. (Seviyen: **`+svy+`**)`, msg), msg.channel.id)
  }
  if(array.find(q => q.toLowerCase() === sec)) {
   if (res && res.renk === "0" || !(res && res.renk)) return client.message(client.normalEmbed(`İlk önce bir renk ayarlamalısın.`, msg), msg.channel.id)
    res.renk = "0"
    res.save()
    client.message(client.normalEmbed(`Renk başarıyla sıfırlandı.`, msg), msg.channel.id)
    client.react(msg, "tick")
  } else {
  if (sec.length !== 6) return client.message(client.normalEmbed(`Geçerli bir renk kodu girmelisin. (6 Haneli ve Başında # Olmadan)`, msg), msg.channel.id)
   await seviyeDatabase.findOneAndUpdate({guildID: msg.guild.id, userID: msg.author.id}, {$set: {renk: sec}})
   var Canvas = require("canvas");
   var canvas = Canvas.createCanvas(150, 150);
   var ctx = canvas.getContext("2d");
    ctx.fillStyle = `#${sec}`;
    ctx.fill();
    ctx.fillRect(0, 0, 150, 150);
   const embed = new MessageEmbed()
    .setDescription("Başarıyla belirttiğiniz renk ayarlandı. (\`#{renk}\`)".replace("{renk}", sec.toUpperCase()))
    .setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true}))
    .setImage(`attachment://renk.png`)
    .setColor(""+sec+"");
      msg.channel.send({
        embed,
        files: [{ attachment: canvas.toBuffer(), name: "renk.png" }]
      });
   client.react(msg, "tick"); return}}}
