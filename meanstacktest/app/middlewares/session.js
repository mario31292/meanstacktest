var User = require("../../models/user").User;
var path = require('path');

module.exports = function(req,res,next){
	if(!req.session.user_id){
		res.sendFile(path.resolve('public/views/index.html'));
	}else{
		User.findById(req.session.user_id,function(err,user){
			if(err){
				console.log(String(err));
				res.sendFile(path.resolve('public/views/index.html'));
			}else{
				res.locals = { user: user }
				next();
			}
		});
	}
}