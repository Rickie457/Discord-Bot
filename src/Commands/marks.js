const Command = require("../Structures/Command");
const Discord = require('discord.js');
const { userReport } = require('../Data/schema');
const {prefix} = require('../Data/config.json')

module.exports = new Command({
    name: "marks",
    description: "Adds the authors mark into the DB",
    async run(message, args, client){

        var weighted_grades = [];
        var course_goal = 50;
        var weight_sum = 0; 
            required_mark = 0; 
            num = 0; 
            denom = 0;

        if (args.length > 0){
            userReport.findOne({
                $and: [{userID: message.author.id}, {course_title: args[0]}]
            }, (err, monitor) => {
                if(err) { 
                    console.log(err);
                } else {
                    for(let i = 0; i < monitor.assignments.length; i++){
                        weight_sum += monitor.weights[i];
                        var weight_decimal = monitor.weights[i]/100;
                        weighted_grades.push(monitor.marks[i] * weight_decimal);
                        num += monitor.weights[i] * monitor.marks[i];
                        denom += monitor.weights[i];
                    }
                    average_grade = num/denom;
                    
                    try { if(parseFloat(args[1]) > 0) course_goal=parseFloat(args[1]) } catch (err) {}

                    var final_weight = (100-denom) / 100; 
                    if( !final_weight <= 0 ) required_mark = (((course_goal/100)-(1-final_weight)*(average_grade/100))/final_weight)*100;
                    if(required_mark < 0) required_mark = 0;

                    const viewGrades = new Discord.MessageEmbed()
                        .setTitle("Grade Calculator: " + String(args[0]))
                        .setAuthor({name: message.author.username, iconURL: message.author.avatarURL({dynamic: true})})
                        .setDescription(`Average Grade: ${average_grade.toFixed(1)}\nGrade Required: ${required_mark.toFixed(1)}`)
                        .setThumbnail("https://i.imgur.com/GsQd2es.png")
                    for(var i=0; i< monitor.assignments.length; i++){
                        viewGrades.addFields({
                            name: String(monitor.assignments[i]),
                            value: `Grade: ${monitor.marks[i].toFixed(1)}%\n__Weight: ${monitor.weights[i].toFixed(1)}%__\nEarned: ${weighted_grades[i].toFixed(1)}%`,
                            inline: false
                        });
                    }
                    message.reply({ embeds: [viewGrades] }); 
                }
            });
        } else {
            const Guide = new Discord.MessageEmbed()
                .setTitle("__Grade Calculator Guide__")
                .setAuthor({name: message.author.username, iconURL: message.author.avatarURL({dynamic: true})})
                .addFields({name: `${prefix}addcourse {course-title}`, value: `Register the course onto the MongoDB.`})
                .addFields({name: `${prefix}delcourse {course-title}`, value: `Remove the course from the MongoDB.`})
                .addFields({name: `${prefix}addmark {course-title} {assignment} {mark} {weight}`, value: `Adds your assignment, mark, and weight for calculation.\n\n*Note: Keep the name of your assignments unique!*`})
                .addFields({name: `${prefix}delmark {course-title}`, value: `Removes your assignment from the specified course. `})
                .setThumbnail("https://i.imgur.com/GsQd2es.png")
                .setFooter({text:`Note: you do not have to include the curly brackets when adding in your course-title, assignment, marks, or weights for any command.`});
            message.reply({embeds: [Guide]});
        }
    }
});