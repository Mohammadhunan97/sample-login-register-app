const express = require('express');
const router = express.Router();
var User = require('../models/user');

router.get('/register',(req,res)=>{
	res.render('register');
})


router.get('/login',(req,res)=>{
	res.render('login');
})

//register user
router.post('/register',(req,res)=>{
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
	console.log(name,email,username,password,password2);

	req.checkBody('name','Name is required').notEmpty();
	req.checkBody('email','Email is required').notEmpty();
	req.checkBody('email','Email is not valid').isEmail();
	req.checkBody('username','Username is required').notEmpty();
	req.checkBody('password','Password is required').notEmpty();
	req.checkBody('password2','Passwords do not match').equals(req.body.password);



	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		})
		console.log('errors',errors);
	}else{
		var newUser = new User({
			name,
			email,
			username,
			password,
		})

		User.createUser(newUser,function(err,user){
			if(err) throw err;
			console.log(user);
		})

		req.flash('success_msg','You are registered and can now login');
		res.redirect('/users/login');
	}

})

module.exports = router;
