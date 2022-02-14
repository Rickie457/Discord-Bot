const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

module.exports = new Command({
    name: "ping",
    description: "Ping!",
    async run(message, args, client){
        message.reply("Ping!");
    }
});