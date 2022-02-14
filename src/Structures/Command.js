const Discord = require("discord.js");

const Client = require("./Client.js");

class Command {
    constructor(options) {
        this.name = options.name.toLowerCase();
        this.description = options.description;
        this.run = options.run;
    }
}

module.exports = Command;