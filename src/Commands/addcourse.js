const Command = require("../Structures/Command");
const { userReport } = require('../Data/schema');

module.exports = new Command({
    name: "addcourse",
    description: "Adds the authors mark into the DB",
    async run(message, args, client){
        if(args.length == 1){
            new userReport({userID: message.author.id, course_title: args[0]}).save();
            message.reply("The course, " + args[0] + ", has been registered!");
        } else message.reply(`Incorrect format! Please refer to the guide using ${prefix}marks!`)
    }
});