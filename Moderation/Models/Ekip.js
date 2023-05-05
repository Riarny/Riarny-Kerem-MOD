const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: "" },
  crews: {type: Array, default: ""},
  date: { type: String, default: "" }
});

module.exports = model("ekip", schema);