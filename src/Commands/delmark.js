const Command = require("../Structures/Command");
const { userReport } = require("../Data/schema");
const { prefix } = require('../Data/config.json');

module.exports = new Command({
    name: "delmark",
    description: "Adds the authors mark into the DB",
    async run(message, args, client){
        if(args.length == 2) {
            userReport.findOne({
                $and: [{userID: message.author.id}, {course_title: args[0]}]
            }, async function (err, doc) {
                if (!(err)) {
                    const pos = doc.assignments.indexOf(args[1]);
                    doc.assignments[pos] = null;
                    doc.marks[pos] = null;
                    doc.weights[pos] = null;
                    await doc.save();

                    userReport.updateOne({
                        $and: [{userID: message.author.id}, {course_title: args[0]}]
                    }, {
                        $pull: { assignments : null, marks: null, weights: null }
                    }, (err, details) => {
                        if(err) console.log(err);
                        else message.reply(`'${args[1]}' has been removed from ${args[0]}`);
                    });

                } else console.log(err) 
            });
        } else message.reply(`Incorrect format! Please refer to the guide using ${prefix}marks!`)
    }
});