const mongoose = require('mongoose');

const Repo = new mongoose.Schema({
    userID: String,
    course_title: String,
    assignments: {type: [String], index: true},
    marks: {type: [Number], index: true},
    weights: {type :[Number], index: true}
});

const userReport = mongoose.model("UserInfo", Repo, "UserInfo");
exports.userReport = userReport;

// exports.Repo = Repo;