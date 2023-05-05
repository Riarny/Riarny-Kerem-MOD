const client = global.client;
const CezaDatabase = require("../Models/Ceza");
const ToplantıDatabase = require("../Models/General");
const SetupDatabase = require("../Models/Setup")

module.exports = async () => {
 
  const res = await SetupDatabase.findOne({})
  let guildID = res && res.guildID ? res.guildID : ""
  if (guildID === "") return
  const doc = await SetupDatabase.findOne({guildID: guildID})
  let durum = doc && doc.durum ? doc.durum : "Agrippa 💜"
  let status = doc && doc.status ? doc.status : "dnd"
  let voice = doc && doc.botVoiceChannel ? doc.botVoiceChannel : ""
  client.user.setPresence({ activity: { name: durum }, status: status })
  let VoiceChannelID = client.channels.cache.get(voice)
  if (VoiceChannelID) VoiceChannelID.join().catch(() => {})
  let res2 = await ToplantıDatabase.findOne({guildID: guildID, toplantıWait: true})
  if (res2) {
   res2.toplantıWait = false
   res2.toplantıWaitDate = 0
   res2.save()
  }
  let count = await CezaDatabase.countDocuments().exec();
  console.log(`(${client.user.username}) adlı hesapta [${client.guilds.cache.get(guildID).name}] adlı sunucuda giriş yapıldı. ✔${count ? `\n${count} adet ceza tanımlandı! ✔` : ``}`)}

module.exports.conf = {
  name: "ready",
};
