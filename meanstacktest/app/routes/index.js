// app/routes/index.js
'use strict';
var User = require("../../models/user").User;
var cookieSession = require("cookie-session");
var session_middleware = require("../middlewares/session");
var router_app = require("./router_app");
var path = require('path');

module.exports = function(app) {

	app.use(cookieSession({
		name: "session",
		keys: ["llave-1","llave-2"]
	}));

	app.get('/', function(req, res) {
		res.sendFile(path.resolve('public/views/index.html'));
	});

	app.post('/sessions', function(req, res) {
		User.findOne({login: req.body.login,password: req.body.password},
			function(err,user){
				if(user != null){
					console.log(user);
					req.session.authenticated = true;
					req.session.user_id = user._id;
					res.redirect("/app");
				}else{
					res.sendFile(path.resolve('public/views/index.html'));
				}
			});
	});

  /*app.get('/app', function(req, res) {
    User.findOne({login: req.body.login,password: req.body.password},
		function(err,user){
			req.session.user_id = user._id;
			res.json(user);
	});
});*/


app.use("/app",session_middleware)
app.use("/app",router_app);

}