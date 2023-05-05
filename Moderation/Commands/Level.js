const { registerFont } = require("canvas");
const path = require("path");
registerFont(path.resolve("./Moderation/Fonts/arial.ttf"), { family: "Arial" });

module.exports = {
  conf: {
    aliases: ["seviye","seviyerank","level"],
    name: "seviye",
  },
  
  run: async ({client, msg, args, MessageEmbed, seviyeDatabase, request, cfg}) => {
    
   let victim = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.member;
   let res = await seviyeDatabase.findOne({guildID: msg.guild.id, userID: victim.id}) 
   if (!res) return msg.channel.send(`🚫 ${victim} Daha bir sıralaman yok. İlk önce biraz mesaj gönder, sonra tekrar dene.`)
   if (victim.bot) return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
   msg.react(cfg.Emoji.LoadingEmoji)
    var g = "95";
    var Canvas = require("canvas");
    var canvas = Canvas.createCanvas(750, 300);
    var ctx = canvas.getContext("2d");
    
    const avatarURL = victim.user.avatarURL({ format: 'png', dynamic: true, size: 1024 });
    const { body } = await request.get(avatarURL);
    const avatar = await Canvas.loadImage(body);
    if (res && res.resim === "0") {
    } else {
     if((res && res.resim)) {
      const rs = await request.get(res && res.resim);
      const resim = await Canvas.loadImage(rs.body);
      ctx.drawImage(resim, 0, 0, 750, 300);
      var g = "55";
    }}

    if (res && res.saydamlık === "0") {
    } else {
     if((res && res.saydamlık)) {
     if ((res && res.saydamlık) === "1") {
      var g = "40";}
      
    if ((res && res.saydamlık) === "2") {
     var g = "30";}

    if ((res && res.saydamlık) === "3") {
     var g = "20";}

    if ((res && res.saydamlık) === "4") {
     var g = "10";}

    if ((res && res.saydamlık) === "5") {
     var g = "0";}}}

    ctx.fillStyle = "rgba(0, 0, 0, 0." + g + ")";
    ctx.fill();
    ctx.fillRect(25, 20, 700, 260);

    ctx.fillStyle = "rgba(0, 0, 0, 0.30)";
    ctx.fill();
    ctx.fillRect(0, 0, 750, 300);

    var re = (res && res.renk) || "FF0000";

    let xp = res ? res.xp : 0
    let lvl = res ? res.lvl : 0
    let xpToLvl = res ? res.xpToLvl : 0
    let msgs = res ? res.msgs : 0 
    let rank = await seviyeDatabase.find({ guildID: msg.guild.id }).sort({ lvl: -1 }).exec();
    rank = rank.filter(x => msg.guild.members.cache.has(x.userID)).findIndex(x => x.userID == victim.id) + 1;
    var de = ((xp/xpToLvl));
    ctx.beginPath();
    ctx.fillStyle = "#999999";
    ctx.arc(
    257 + 18.5,
    147.5 + 18.5 + 36.25,
    18.5,
    1.5 * Math.PI,
    0.5 * Math.PI,
    true)
    ctx.fill();
    ctx.fillRect(257 + 18.5, 147.5 + 36.15, 250 * 1.6, 37.5);
    ctx.arc(
    257 + 18.5 + 250 * 1.6,
    147.5 + 18.5 + 36.25,
    18.75,
    1.5 * Math.PI,
    0.5 * Math.PI,
    false)
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = `#${re}`;
    ctx.arc(
    257 + 18.5,
    147.5 + 18.5 + 36.25,
    18.5,
    1.5 * Math.PI,
    0.5 * Math.PI,
    true)
    ctx.fill();
    ctx.fillRect(257 + 18.5, 147.5 + 36.25, de * 400, 37.5); // 0.8-0.9
    ctx.arc(
    257 + 18.5 + de * 400,
    147.5 + 18.5 + 36.25,
    18.75,
    1.5 * Math.PI,
    0.5 * Math.PI,
    false)
    ctx.fill();
    ctx.fillStyle = `#${re}`;
    ctx.font = "28px Arial";
    ctx.textAlign = "right";
    ctx.fillText(`Rank #${rank} | Level ${lvl ? lvl : 0}`, 670, 70);
    ctx.font = "20px Arial";
    ctx.textAlign = "right";
    ctx.fillText(`${xp ? xp : 0} / ${xp ? xpToLvl : "0"} XP`, 670, 100);
    ctx.fillStyle = `#bfbfbf`;
    ctx.font = "28px Arial";
    ctx.textAlign = "left";
    ctx.fillText(`${victim.user.tag}`, 270, 150);
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.fill();
    ctx.lineWidth = 8;
    ctx.arc(55 + 80, 80 + 80, 80, 0, 2 * Math.PI, false);
    ctx.clip();
    ctx.drawImage(avatar, 55, 80, 160, 160);

    msg.react(cfg.Emoji.LoadingEmoji).then(async (m) => {
     async function wait() {
      return new Promise((res, rej) => {
       setTimeout(() => {
        msg.channel.send({files: [{ attachment: canvas.toBuffer(), name: "level.png" }]})
        msg.reactions.removeAll()}, 1500)})}
        await wait()});
    client.roleControl(lvl, victim);}}
