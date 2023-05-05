const cfg = require("../Configs/config.json");
const fs = require("fs");
const moment = require("moment");
const ms = require("ms");
const {MessageEmbed} = require("discord.js");
const Discord = require("discord.js");
const MessageAttachment = require("discord.js");
const client = global.client;
const { MessageButton } = require('discord-buttons')
const { table } = require('table')
const GeneralDatabase = require("../Models/General");
const CezaDatabase = require("../Models/Ceza");
const CezapuanDatabase = require("../Models/Cezapuanı");
const CezaSayıDatabase = require("../Models/CezaSayı")
const StaffDatabase = require("../Models/Yetkili");
const ControlsDatabase = require("../Models/Controls");
const RegisterDatabase = require("../Models/Register");
const TagAldıDatabase = require("../Models/TagAldı");
const MsgDeleteDatabase = require("../Models/MessageDelete");
const VoiceMuteDatabase = require("../Models/VoiceMute");
const VoiceUnmuteDatabase = require("../Models/VoiceUnmute");
const CezalıRolesDatabase = require("../Models/Cezalı");
const CezaExtraRolesDatabase = require("../Models/ExtraCeza");
const AlarmDatabase = require("../Models/Alarm");
const AçılmazBanDatabase = require("../Models/AçılmazBan");
const NotDatabase = require("../Models/Not");
const YetkiliKayıtDatabase = require("../Models/YetkiliKayıt");
const Puan = require("../Models/Puan");
const VoiceJoinedDateDatabase = require("../Models/VoiceJoined.js")
const CoinDatabase = require("../Models/Coin.js")
const görevDatabase = require("../Models/Görev.js")
const ToplantıDatabase = require("../Models/Toplantı.js")
const SetupDatabase = require("../Models/Setup.js")
const EkipDatabase = require("../Models/Ekip.js")
const KorumaDatabase = require("../Models/Koruma.js")
const CommandsDatabase = require("../Models/NewCommand.js")
const seviyeDatabase = require("../Models/Seviye");
const guildSeviyeDatabase = require("../Models/GuildSeviye");
const ChatGuardDatabase = require("../Models/ChatGuard");
const fetch = require('node-fetch')
const request = require("node-superfetch");
const CmdDatabase = require("../Models/NewCommand")

module.exports = async (msg) => {
  let prefix = cfg.Bot.Prefix.find((x) => msg.content.toLowerCase().startsWith(x));
  if (!msg.guild || !prefix) return;
  let args = msg.content.substring(prefix.length).trim().split(" ");
  let commandName = args[0].toLowerCase();
  const res = await SetupDatabase.findOne({guildID: msg.guild.id})
  let commandsLog = res && res.commandsLog ? res.commandsLog : ""
  const guild = msg.guild.id
  args = args.splice(1);
  let cmd = client.commands.has(commandName) ? client.commands.get(commandName) : client.commands.get(client.aliases.get(commandName));

   let cmdRes = await CmdDatabase.findOne({ cmdName: commandName })
   if (cmdRes) {
    if (cmdRes.allowedRoles.some(x => msg.member.roles.cache.has(x)) == false && !cmdRes.allowedUsers.includes(msg.author.id)) return
    if (cmdRes.blockedUsers.includes(msg.author.id)) return
    const Member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
    const Roles = cmdRes.cmdRoles;
    if (!Member) {
     return client.message(client.normalEmbed("Bir üye etiketle ve tekrardan dene!", msg), msg.channel.id)
    }
     await CmdDatabase.findOneAndUpdate({ cmdName: commandName }, {$inc: {cmdUseCount: 1}}, {upsert: true})
     client.message(client.normalEmbed(`${Roles.some(role => Member.roles.cache.has(role)) ? `${Member} kişisinden ${Roles.map(role => `<@&${role}>`).join(",")} ${Roles.length > 1 ? "rolleri" : "rolü"} alındı.` : `${Member} kişisine ${Roles.map(role => `<@&${role}>`).join(",")} ${Roles.length > 1 ? "rolleri" : "rolü"} verildi.`}`, msg), msg.channel.id)
     client.react(msg, "tick")
     if (Roles.some(role => Member.roles.cache.has(role))) Member.roles.remove(Roles);
      else Member.roles.add(Roles);
   }
 
  
  if (cmd) {
   let author = msg.guild.member(msg.author);
   let uye = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(args[0]);
   let uyekontrol = `${msg.guild.member(uye) ? "True" : "False"}`
   if (cmd.conf.owner && !cfg.Bot.Owners.includes(msg.author.id)) return;
   if (cmd.conf.serverowner && !msg.guild.owner.user.id.includes(msg.author.id) && !cfg.Bot.Owners.includes(msg.author.id)) return;
   if (client.channels.cache.get(commandsLog)) client.channels.cache.get(commandsLog).send(`🔧 **${msg.author.tag}** (\`${msg.author.id}\`) üyesi ${msg.channel} kanalında bir komut kullandı: \`${prefix}${commandName}\``)
   let doc = await ControlsDatabase.findOne({guildID: msg.guild.id})
   let blocks = doc && doc.blockedFromCommand ? doc.blockedFromCommand : []
   if (blocks.includes(msg.author.id)) return
   if (!msg.member.hasPermission("ADMINISTRATOR") && !cfg.Bot.Owners.includes(msg.author.id)) {
    let blockArr = client.commandBlock.get(msg.author.id) || []
     let datax = { içerik: msg.content, kanal: msg.channel.name, komut: commandName}
      blockArr.push(datax)
      client.commandBlock.set(msg.author.id, blockArr)
   if (blockArr.length == 9) {
    msg.channel.send(`${msg.author}` + "```⛔ Komutları gereğinden sık kullandığın için komut kullanımın engellendi. Yasağını kaldırması için "+client.users.cache.get("885590145896689664").tag+" üyesine ulaşmalısın.```")
    if (client.channels.cache.get(commandsLog)) client.channels.cache.get(commandsLog).send(`${msg.author} (\`${msg.author.tag}\`- \`${msg.author.id}\`) adlı üye komut engeli yedi. Komut kullanım özeti:\n\`\`\`${blockArr.map(x => x.içerik).join("\n")}\nKullandığı komutlar: ${blockArr.map(x => x.komut).join(",")}\nKullandığı kanallar: ${blockArr.map(x => x.kanal).join(",")}\`\`\``)
    await ControlsDatabase.findOneAndUpdate({guildID: msg.guild.id}, {$push: {blockedFromCommand: msg.author.id}}, {upsert:true})
   }
    setTimeout(() => {
     if (client.commandBlock.has(msg.author.id)) {
      client.commandBlock.delete(msg.author.id)
   } 
   }, ms("1m")) 
   }
    cmd.run({client: client, msg: msg, args: args, prefix: prefix, ChatGuardDatabase: ChatGuardDatabase, request: request, table: table, guildSeviyeDatabase: guildSeviyeDatabase, seviyeDatabase: seviyeDatabase, CommandsDatabase: CommandsDatabase, guild: guild, KorumaDatabase: KorumaDatabase, EkipDatabase: EkipDatabase, SetupDatabase: SetupDatabase, ToplantıDatabase: ToplantıDatabase, fetch: fetch, MessageButton: MessageButton, CoinDatabase: CoinDatabase, görevDatabase: görevDatabase, author: author, uye: uye, VoiceJoinedDateDatabase: VoiceJoinedDateDatabase,  Puan: Puan, YetkiliKayıtDatabase: YetkiliKayıtDatabase, NotDatabase: NotDatabase, AçılmazBanDatabase: AçılmazBanDatabase, AlarmDatabase: AlarmDatabase, CezaExtraRolesDatabase: CezaExtraRolesDatabase, CezalıRolesDatabase: CezalıRolesDatabase, VoiceUnmuteDatabase: VoiceUnmuteDatabase, VoiceMuteDatabase: VoiceMuteDatabase, MsgDeleteDatabase: MsgDeleteDatabase, TagAldıDatabase: TagAldıDatabase, RegisterDatabase: RegisterDatabase, ControlsDatabase: ControlsDatabase, StaffDatabase: StaffDatabase, CezaSayıDatabase: CezaSayıDatabase, CezapuanDatabase: CezapuanDatabase, CezaDatabase: CezaDatabase, GeneralDatabase: GeneralDatabase, cfg: cfg, fs: fs, MessageEmbed: MessageEmbed, Discord: Discord, moment: moment, uyekontrol: uyekontrol, MessageAttachment: MessageAttachment, ms: ms});}}

module.exports.conf = {
  name: "message",
};
