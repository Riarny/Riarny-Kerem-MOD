const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: ""},
  userID: { type: String, default: ""},
  afk: Object,
  streamer18: { type: Number, default: 0},
  tagAddDate: { type: Number, default: Date.now()},
  rollog: { type: Array, default: []},
  rollogtotal: { type: Number, default: 0},
  tagaldı: { type: Boolean, default: false},
  toplantıWait: { type: Boolean, default: false},
  toplantıWaitDate: { type: Number, default: Date.now()},
  micBugDate: { type: Number, default: Date.now()},
  micBugCount: { type: Number, default: 0},
});

module.exports = model("general", schema);
