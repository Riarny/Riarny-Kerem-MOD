const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: ""},
  guildMemberAddCountTotal: { type: Number, default: 0},
  guildMemberAddCount12Hours: { type: Number, default: 0},
  guildMemberAddCount6Hours: { type: Number, default: 0},
  guildMemberRemoveCountTotal: { type: Number, default: 0},
  guildMemberRemoveCount12Hours: { type: Number, default: 0},
  guildMemberRemoveCount6Hours: { type: Number, default: 0},
  blockedFromCommand: Array,
  yasaklıtag: {type: Array, default: []},
  haftalıkkayıt: {type: Number, default: 0},
  haftalıktaglı: {type: Number, default: 0},
  taglıalım: {type: String, default: "Kapalı"},
});

module.exports = model("control", schema);