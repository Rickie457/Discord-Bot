const Command = require("../Structures/Command");
const { userReport } = require('../Data/schema');
const { prefix } = require('../Data/config.json');

module.exports = new Command({
    name: "delcourse",
    description: "Adds the authors mark into the DB",
    async run(message, args, client){
        userReport.findOneAndDelete({
            $and: [{userID: message.author.id, course_title: args[0]}]
        }, (err, monitor) => {
            if(err) console.log(err)
            if(args.length == 1) message.reply("The course, " + args[0] + ", has been removed!");
            else message.reply(`Incorrect format! Please refer to the guide using ${prefix}marks!`)
        })
    }
});