const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: "" },
  mode: { type: Boolean, default: true },
  role: { type: String, default: "" },
  perm: { type: Number, default: 0 }
})

module.exports = model("koruma", schema);