const fs = require("fs");
const client = global.client;

fs.readdir("./Moderation/Events", (err, files, events = []) => {
	if (err) return console.error(err);
  console.log("--------------------------");
  console.log("Eventler yükleniyor.");
	files
	.filter((file) => file.endsWith(".js"))
	.forEach((file) => {
	let prop = require(`../Events/${file}`);
	if (!prop.conf) return;
	client.on(prop.conf.name, prop);
  events.push(prop.conf.name);});
  console.log("[" + events.join(", ") + "] " +  " isimli event(ler) yüklendi. ✔");
  console.log("--------------------------");
});