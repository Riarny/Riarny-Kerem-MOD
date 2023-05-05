const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: ""},
  userID: { type: String, default: ""},
  xp: { type: Number, default: 0},
  lvl: { type: Number, default: 0},
  xpToLvl: { type: Number, default: 0},
  msgs: { type: Number, default: 0},
  renk: { type: String, default: ""},
  saydamlık: { type: String, default: ""},
  resim: { type: String, default: ""},
  küfür: { type: Number, default: 0},
  reklam: { type: Number, default: 0},
  link: { type: Number, default: 0},
  etiket: { type: Number, default: 0},
  spam: { type: Number, default: 0},
  emoji: { type: Number, default: 0},
  caps: { type: Number, default: 0},
  msgLimit: { type: Number, default: 0},
});

module.exports = model("seviye", schema);