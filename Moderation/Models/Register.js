const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: ""},
  userID: { type: String, default: ""},
  authorID: { type: String, default: ""},
  isimler: {type: Array, default: []},
});

module.exports = model("kayıt", schema);