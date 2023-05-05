const mongoose = require("mongoose");
const cfg = require("../Configs/config.json");

mongoose.connect(cfg.Bot.MongoURL, {useUnifiedTopology: true,useNewUrlParser: true,useFindAndModify: false,}).then(console.log("Mongoose bağlandı ✔\n"+ mongoose.connections[0]._connectionString)).catch(err => console.log(err.message));