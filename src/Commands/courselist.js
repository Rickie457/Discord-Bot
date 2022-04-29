const Command = require("../Structures/Command");
const { userReport } = require('../Data/schema');
const Discord = require('discord.js');

module.exports = new Command({
    name: "courselist",
    description: "Lists the authors registered courses",
    async run(message, args, client){
        var courseList = [];
        userReport.find({
            userID: message.author.id,
        }, function (err, doc) {
            if(err) console.log(err)
            else {
                Object.keys(doc).forEach(index => {
                    courseList.push(Object.values(doc)[index]['course_title']);
                })
                var body = '';
                for(var i=0; i< courseList.length; i++){
                    body += `${i+1}. ${courseList[i]}\n`
                }
                const cList = new Discord.MessageEmbed()
                            .setTitle("Course List: ")
                            .setAuthor({name: message.author.username, iconURL: message.author.avatarURL({dynamic: true})})
                            .setDescription(body)
                            .setThumbnail("https://i.imgur.com/GsQd2es.png")
                message.reply({embeds: [ cList ]})
            }
        });
    }
});