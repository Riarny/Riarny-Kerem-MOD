const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: ""},
  userID: { type: String, default: ""},
  linkCount: { type: Number, default: 3},
  capsCount: { type: Number, default: 5},
  tagCount: { type: Number, default: 5},
  emojiCount: { type: Number, default: 5},
  msgLimitCount: { type: Number, default: 5},
  swearCount: { type: Number, default: 5},
});

module.exports = model("chat", schema);