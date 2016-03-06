
function init(app){

	index = require('../controllers/index');
	users = require('../controllers/users');
	ahsan= require('../controllers/ahsan');


	// one by one use in order if not found then use 404 which is define below
	//routes

	app.use('/', index);
	app.use('/users', users);
	app.use('/ahsan', ahsan);




	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});
}


module.exports.init= init;