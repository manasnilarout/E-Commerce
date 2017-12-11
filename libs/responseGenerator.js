
//this function helps in providing the standardised output..
exports.generate = function(error,message,status,data){

	var myResponse = {
                error: error,
                message: message,
                status: status,
                data: data
    };

    return myResponse;

}