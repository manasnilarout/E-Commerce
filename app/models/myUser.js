
// defining a mongoose schema 
// including the module
// User model
var mongoose = require('mongoose');
// declare schema object.
var Schema = mongoose.Schema;

var userSchema = new Schema({

	userName 			: {type:String,default:'',required:true},
	firstName  			: {type:String,default:''},
	lastName  			: {type:String,default:''},
	email	  			: {type:String,default:''},
	mobileNumber  		: {type:Number,default:''},
	password			: {type:String,default:''},
  //cartInfo      : {type:String,default:''},
	resetPasswordToken  : {type:String},
	resetPasswordExpires: {type:Date}
	//resetPasswordToken  : {type:String},
	//resetPasswordExpires: {type:Date}

	

});

userSchema.pre('save', function(next) {
  var myuser = this;
  var SALT_FACTOR = 5;

  if (!myuser.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(myuser.password, salt, null, function(err, hash) {
      if (err) return next(err);
      myuser.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};



module.exports = mongoose.model('myUser',userSchema);
