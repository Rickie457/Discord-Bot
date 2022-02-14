const Command = require('../Structures/Command.js');
const Discord = require('discord.js');
const config = require('../Data/config.json');

module.exports = new Command({
    name: 'calculate',
    description: 'Grade calculator',
    async run(message, args, client){
        // Declaring command variables
        course_name = "";
        // Assuming if there is no grade goal, then the author is aiming to pass the class
        grade_goal = 50;

        // Embed for viewing grades.
        const viewGrades = new Discord.MessageEmbed();

        // Declaring arrays for task names, achieved grades, and task weight. 
        task_names = [];
        achieved_grades = [];
        achieved_weights = [];
        task_weights = [];
        sendEmbed = true;

        try {
            // !grade Course-Name [Task, Grade, Weight] Grade-Goal
            messageList = message.content.split('\n')
            messageList = messageList.splice(1); // Remove the !grade from the messageList array.
            
            // If the course name was given, rebind course_name as the given name. 
            if(!messageList[0].includes(',') && messageList[0].toLowerCase().includes("name:")) {
                course_name = messageList[0].toUpperCase().replace("NAME:","").trim();
                messageList = messageList.splice(1);
            }

            // If a number was added at the end of the command indicating the author's grade goal, rebind the grade goal as user inputted. 
            if(!messageList[0].includes(',') && messageList[0].trim().toLowerCase().includes("goal:")) {
                grade_goal = parseFloat(messageList[0].toLowerCase().replace("goal:", ""));
                messageList = messageList.splice(1);
            }
            messageList.forEach(element => {
                aList = element.split(',');
                var name = String(aList[0].trim());
                var grade = parseFloat(aList[1].trim());
                var weight = parseFloat(aList[2].trim());
                task_weights.push(weight);
                achieved_grades.push(grade)
                achieved_weights.push(grade*(weight/100));
                task_names.push(name);
            });
        } catch (err) {
            sendEmbed=false;
            if(message.content.trim().length==10 && message.content.includes(`${config.prefix}calculate`)){
                const Guide = new Discord.MessageEmbed();
                Guide
                    .setTitle("Grade Calculator Guide Embed")
                    .setAuthor({name: message.author.username, iconURL: message.author.avatarURL({dynamic: true})})
                    .setDescription("To use the grade calculator, enter the command !calculate, then create new lines for the course name and your grade goals. After that, create any number of new lines and enter in the task name, grade, and weight as a comma separated list on the same line.")
                    .addFields({name: '__Example__', value: `${config.prefix}calculate \nName: MATH1019\nGoal: 65\nHomework, 100, 20\nQuiz, 100, 10\nTests, 95, 30\nAnd so on.`, inline: true})
                    .setThumbnail("https://i.imgur.com/GsQd2es.png")
                    .setFooter(`Note: It is VERY important to put a space after typing in the command, ${config.prefix}calculate `);
                message.reply({embeds: [Guide]});
            }
            else message.reply("Invalid Input. Try again!");
        }
        
        if(sendEmbed){
            // Calculate the average grade.
            var num = 0; 
                denom = 0;
            for(let i=0; i<messageList.length; i++){
                num += task_weights[i]*achieved_grades[i];
                denom += task_weights[i];
            }
            average_grade = num/denom;

            var grade_required = 0;
            if (100-denom>0) {
                let final_weight = (100-denom)/100;
                grade_required = ((grade_goal/100)-(1-final_weight)*(average_grade/100))/final_weight;
                grade_required*=100;
            }
            if (grade_required < 0) {
                grade_required=0;
            }

            viewGrades
                .setTitle("Grade Calculator: " + String(course_name))
                .setAuthor({name: message.author.username, iconURL: message.author.avatarURL({dynamic: true})})
                .setDescription('Average Grade: ' + (average_grade.toFixed(1)) + '\nGrade Required: ' + (grade_required.toFixed(1)))
                .setThumbnail("https://i.imgur.com/GsQd2es.png")
            for(var i=0; i<task_names.length; i++){
                viewGrades.addFields({
                    name: String(task_names[i]),
                    value: "Grade: " + String(achieved_grades[i].toFixed(1)) + "%\n__Weight: " + String(task_weights[i].toFixed(1)) + "%__\nEarned: " + String(achieved_weights[i].toFixed(1)) + "%",
                    inline: false
                });
            }
            message.reply({ embeds: [viewGrades] });
        }
    }
});