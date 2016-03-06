var express = require('express');
var router = express.Router();
var config= require('../config/config.json');
var indexmodel=require('../models/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.lastPage)
    console.log("last session page:"+req.session.lastPage);
  req.session.lastPage = '/';
  res.cookie('name' , 'value', {expire : new Date() + 9999});
  console.log("Cookies: ", req.cookies);
  indexmodel.getAll(function(err,result){
    console.log(result);
  });
  
  res.render(config.pages.index.render, 
  	{ 
  		pagedata: config.pages.index
  	});
});

router.get('/name', function(req, res, next) {
  // clearCookie('cookie_name');
  console.log("Cookies: ", req.cookies);
  console.log("Session: ", req.session.lastPage);
  if (req.cookies.name)
	 res.send(req.param('name'));
});

// parameter middleware that will run before the next routes
router.param('name', function(req, res, next, name) {

    // check if the user with that name exists
    // do some validations
    // add -dude to the name
    var modified = name + '-dude';

    // save name to the request
    req.name = modified;

    next();
});

router.get('/api/:version', function(req, res) {
    res.send(req.params.version+req.param('name'));
  });

// POST http://localhost:8080/api/users
// parameters sent with 
router.post('/api/users', function(req, res) {
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;

    res.send(user_id + ' ' + token + ' ' + geo);
});

module.exports = router;


// tutorials
// https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
//https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4
//http://blog.modulus.io/nodejs-and-express-sessions