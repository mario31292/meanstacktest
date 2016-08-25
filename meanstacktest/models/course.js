var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var course_schema = new Schema({
	code: String,
	name: String,
	description: String,
	launch: String,
	users: [String]
});

var Course = mongoose.model("courses", course_schema);

module.exports.Course = Course;