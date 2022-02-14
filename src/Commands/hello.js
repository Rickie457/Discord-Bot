const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "Hello",
    description: "Hello",
    async run(message, args, client){
        message.reply("Hi!");
    }
});