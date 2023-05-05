const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: String,
  cmdID: String,
  cmdName: String,
  cmdOwner: String,
  cmdCreateDate: Number,
  cmdUseCount: Number,
  allowedRoles: Array,
  cmdRoles: Array,
  blockedUsers: Array,
  allowedUsers: Array
});

module.exports = model("newcommand", schema);