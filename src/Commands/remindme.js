const Command = require("../Structures/Command.js");
const Discord = require('discord.js');
const {prefix} = require('../Data/config.json');
const ms = require("ms");

module.exports = new Command ({
    name: "remindme",
    description: "remind me to do x",
    async run(message, args, client){
        if (args.length==0){
            const reminderFormat = new Discord.MessageEmbed()
                .setTitle("Reminder Command")
                .setDescription(`Remind yourself to do certain tasks throughout the day, week, or month with ${prefix}remindme`)
                .addFields({name: `${prefix}reminder {name} {time}`,
                            value: `The time parameter must specify seconds (s), minutes (min), hours (hr), etc.\nExample: ${prefix}remindme laundry 10s`,
                            inline: false });
            message.reply({embeds: [reminderFormat]})
        }
        else if(args.length < 2 || args.length > 2){
            message.reply(`Incorrect format! Please refer to ${prefix}remindme for reference.`)
        }
        else {
            const end_date = Date.now() + ms(args[1]);
            const interval = setInterval(function(){
                if (Date.now() >= end_date){
                    message.reply(`Don't forget to do ${args[0]}!`)
                    clearInterval(interval)
                }
            },1000);
        }
    }
});