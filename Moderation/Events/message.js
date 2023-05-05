const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const client = global.client;
const cfg = require("../Configs/config.json");
const menüCfg = require("../Configs/Menü.js");
const { MessageMenuOption,  MessageMenu, MessageActionRow } = require('discord-buttons');

module.exports = async(msg) => {

   if (msg.content === "!menü-create") {
    const arr = [];
     menüCfg.Game.Roles.forEach((x, i) => {
      arr.push({ label: msg.guild.roles.cache.get(x).name, value: msg.guild.roles.cache.get(x).id });
      if (menüCfg.Game.Emojis[i]) arr[i].emoji = menüCfg.Game.Emojis[i];
   });   
   
   const row = new MessageActionRow().addComponents(
    new MessageMenu()
     .addOptions(arr)
     .setID("row")
     .setMinValues(1)
     .setMaxValues(3)
     .setPlaceholder("Bir oyun seç"))

  const message = await msg.channel.send({
   content: `**Menü: Oyun Rolleri**`,
   components: [row]
  });
  }

}

module.exports.conf = {
  name: "message",
};