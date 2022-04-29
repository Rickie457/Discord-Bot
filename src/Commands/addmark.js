const Command = require("../Structures/Command");
const { userReport } = require("../Data/schema");
const { prefix } = require('../Data/config.json');

module.exports = new Command({
    name: "addmark",
    description: "Adds the authors mark into the DB",
    async run(message, args, client){
        if(args.length == 4) {
            userReport.findOneAndUpdate(
                { $and: [{course_title: args[0] }, {userID: message.author.id}] }, 
                { $push:  { assignments: args[1], marks: parseFloat(args[2]), weights: parseFloat(args[3]) } },
                { new: true }, 
                (err, doc) => {
                    if (err) console.log("Error!");
                    else {
                        message.reply(`'${args[1]}' has been added to ${args[0]}`);
                    }
                }
            );
        } else message.reply(`Incorrect format! Please refer to the guide using ${prefix}marks!`)
    }
});