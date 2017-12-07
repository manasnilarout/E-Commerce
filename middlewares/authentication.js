var mongoose = require('mongoose');
var userModel = mongoose.model('myUser')


// app level middleware for checking whether correct user is logged in 

exports.checkLogin = function(req,res,next){

	if(!req.myuser && !req.session.myuser){
		res.redirect('/users/login/screen');
	}
	else{

		next();
	}

}// end checkLogin