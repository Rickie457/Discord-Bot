const Discord = require("discord.js");

const {token, prefix} = require("../Data/config.json");

const intents = new Discord.Intents(1537);

const fs = require("fs");

class Client extends Discord.Client {
    constructor(){
        super({intents});
        this.commands = new Discord.Collection();
        this.prefix = prefix;
    }
    start(token){
        fs.readdirSync("./src/Commands")
            .filter(file => file.endsWith(".js"))
            .forEach(file => {
                const command = require(`../Commands/${file}`);
                console.log(`Command ${command.name} is loaded`);
                this.commands.set(command.name, command)
            });
        this.login(token);
    }
}

module.exports = Client; 