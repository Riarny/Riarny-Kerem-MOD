const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: "" },
  authorID: { type: String, default: "" },
  toplantıDurum: { type: Boolean, default: false },
  toplantıID: Number,
  toplantıBaşlık: { type: String, default: "" },
  toplantıChannel: { type: String, default: "" },
  toplantıRol: { type: String, default: "" },
  toplantıMembers: { type: Array, default: [] },
  toplantıNoMembers: { type: Array, default: [] },
  toplantıDate: { type: Number, default: Date.now() },
});

module.exports = model("toplantı", schema);
