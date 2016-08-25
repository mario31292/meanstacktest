var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// config files
var db = require('../config/db');
// connect to mongoDB database
// enter credentials in config/db
mongoose.connect(db.url);


var user_schema = new Schema({
	login: String,
	password: String,
	fname: String,
	lname: String,
	email: String
});

var User = mongoose.model("users", user_schema);

module.exports.User = User;