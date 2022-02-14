const Command = require("../Structures/Command.js");
const Discord = require('discord.js');
const config = require('../Data/config.json');
const ms = require("ms");

module.exports = new Command ({
    name: "remindme",
    description: "remind me to do x",
    async run(message, client, args){
        var messageList = message.content.replace(`${config.prefix}remindme`, "");
        var sendEmbed = true; 
        if (messageList.length==0){
            const reminderFormat = new Discord.MessageEmbed()
                .setTitle("Da Wae Reminder Command")
                .setDescription(`Remind yourself to do certain tasks throughout the day, week, or month with ${config.prefix}remindme`)
                .addFields({name: "Use:",
                            value: `To use the reminder command, use !reminder, followed by your reminder and time: your-time.\nExample: ${config.prefix}remindme laundry time: 10s`,
                            inline: false });
            message.reply({embeds: [reminderFormat]})
            sendEmbed = false;
        }
        try {
            messageList = messageList.trim().split("time:");
            var task = messageList[0].trim();
            var time = messageList[1].trim();
            if (!task && sendEmbed) {
                sendEmbed = false; 
                message.reply(`You forgot to enter in your reminder! Please refer to ${config.prefix}remindme for reference.`)
            }
        } catch {
            if (sendEmbed) message.reply(`You forgot to enter in the time correctly! Please refer to ${config.prefix}remindme for reference.`)
            sendEmbed = false; 
        }
        if (sendEmbed) {
            const end_date = Date.now() + ms(time);
            const interval = setInterval(function(){
                if (Date.now() >= end_date){
                    message.reply(`Don't forget to do ${task}!`)
                    clearInterval(interval)
                }
            },1000);
        }
        //console.log(messageList.length==0)
    }
});