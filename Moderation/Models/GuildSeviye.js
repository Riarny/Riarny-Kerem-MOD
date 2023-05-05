const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: ""},
  LevelAward: { type: Array, default: [] },
});

module.exports = model("guildseviye", schema);