const { Client, Collection, MessageEmbed } = require("discord.js");
const { GuildMember, Guild, TextChannel} = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));
const cfg = require("./Moderation/Configs/config.json");
const menüCfg = require("./Moderation/Configs/Menü.js");
const moment = require("moment");
const mongo = require("mongoose");
require("moment-duration-format")
const logs = require('discord-logs');
logs(client);
const { CronJob } = require("cron");
const disbut = require('discord-buttons')(global.client);
const SetupDatabase = require("./Moderation/Models/Setup")
const { MessageMenuOption,  MessageMenu, MessageActionRow } = require('discord-buttons');

client.commands = global.commands = new Collection();
client.aliases = new Collection();
client.cooldown = new Map();
client.afklar = new Set();
client.locked = new Set();
client.commandBlock = new Map()

setInterval(async() => {
 const res = await SetupDatabase.findOne({})
 let guildID = res && res.guildID ? res.guildID : ""
 const doc = await SetupDatabase.findOne({guildID: guildID})
 let array = doc && doc.autoAuthorizationRoles ? doc.autoAuthorizationRoles : []
 client.puanData = doc && doc.autoAuthorizationRoles ? doc.autoAuthorizationRoles.sort((a, b) => a.puan - b.puan) : []
}, 1000)

require("./Moderation/Handlers/commandHandler");
require("./Moderation/Handlers/eventHandler");
require("./Moderation/Handlers/mongoHandler");
require("./Moderation/Events/functions.js")(client, cfg, moment); 

 TextChannel.prototype.wsend = async function (message, msg) {
	const hooks = await this.fetchWebhooks();
	let webhook = hooks.find(a => a.name === client.user.username && a.owner.id === client.user.id);
	if (webhook) return webhook.send(new MessageEmbed().setColor("RANDOM").setAuthor(`${msg.author.tag}`, msg.author.avatarURL({dynamic: true})).setDescription(message))
   else {
    webhook = await this.createWebhook(client.user.username, { avatar: client.user.avatarURL() });
     return webhook.send(new MessageEmbed().setColor("RANDOM").setAuthor(`${msg.author.tag}`, msg.author.avatarURL({dynamic: true})).setDescription(message))
  }}
  
  TextChannel.prototype.msgDelete = async function (msg) {
   await msg.delete().catch(() => { })}

client.login(cfg.Bot.Token).catch(() => console.error("Bota giriş yapılırken başarısız olundu!"));

client
  .on("disconnect", () => console.log("Bot is disconnecting..."))
  .on("reconnecting", () => console.log("Bot reconnecting...", "log"))
  .on("error", e => console.log(e))
  .on("warn", info => console.log(info));

process.on("uncaughtException", err => {
  const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
  console.log("Beklenmedik yakalanamayan hata: ", errorMsg);
  process.exit(1);
});

process.on("unhandledRejection", err => {
  console.log("Promise Hatası: ", err);
});