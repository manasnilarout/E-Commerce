
// defining a mongoose schema 
// including the module
// User model
var mongoose = require('mongoose');
// declare schema object.
var Schema = mongoose.Schema;

var userSchema = new Schema({

  userName      : {type:String,default:'',required:true},
  firstName       : {type:String,default:''},
  lastName        : {type:String,default:''},
  email         : {type:String,default:''},
  mobileNumber      : {type:Number,default:''},
  password      : {type:String,default:''},
  //cartInfo      : {type:String,default:''},
  resetPasswordToken  : {type:String},
  resetPasswordExpires: {type:Date}

});

module.exports = mongoose.model('myUser',userSchema);


