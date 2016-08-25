var express = require("express");
var router = express.Router();
var User = require("../../models/user").User;
var Course = require("../../models/course").Course;
var path = require('path');

router.get("/",function(req,res){
	res.sendFile(path.resolve('public/views/app.html'));
});

router.get("/user",function(req,res){
	User.findById(res.locals.user._id,function(err,user){
		console.log("obteniendo by Id" + user);
		res.json(user);
	});
});

router.get('/courses/:username', function (req, res) {
  var username = req.params.username;
  console.log(username);
  Course.find({users: username}, function (err, doc) {
    res.json(doc);
  });
});

router.get("/logout",function(req,res){
	req.session =null;
	res.json("");
});

module.exports = router;