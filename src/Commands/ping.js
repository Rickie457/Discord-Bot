const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "ping",
    description: "Ping!",
    async run(message, args, client){
        message.reply("Ping!");
    }
});