console.clear();

const {token, prefix, mongooseConnectionString} = require("./src/Data/config.json");

const mongoose = require("mongoose");

const Client = require("./src/Structures/Client.js")
 
const client = new Client();

client.once("ready", ()=> console.log("Tabi Bot is online!"));

client.on("messageCreate", message => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase()

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    if (!client.commands.has(command)) return;

    client.commands.get(command).run(message, args, client);
});

mongoose.connect(mongooseConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => {
    console.log("MongoDB is connected!")
}).catch(err => {
    console.log(err);
});

client.start(token);