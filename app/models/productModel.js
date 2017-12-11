
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//module for storing and removing selected products from and to the cart
var productSchema = new Schema({

	prodName 			: {type:String,required:true},
	price				: {type:Number,required:true},
	ostype				: {type:String,required:true},
	ram					: {type:String,required:true},
	weight				: {type:String,required:true},
	colour				: {type:String,required:true},
	modelNumber			: {type:Number,required:true},
	features			: [],
	createdon           : {type:Date},
	

});


mongoose.model('Product',productSchema);