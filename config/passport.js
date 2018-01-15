const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = function(passport) {

	passport.serializeUser(function(user, callback){
		callback(null, user.id);
	});

	passport.deserializeUser(function(id, callback){
		User.findById(id, function(err, user){
			callback(err,user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passReqToCallback: true
	}, function(req, email, password, callback){
		//console.log("email: " + email);
		//console.log(User);
		User.findOne({'email': email}, function(err, user){
			console.log(err);
			console.log("user: ");
			//There was an error
			if(err) return callback(err);
			//There is a user with this email
			if(user){
				console.log("Found a user!");
				return callback(null, false, req.flash('signupMessage', 'Email in use'));
				//You're new!
			}else{
				console.log("created user");
				//Create a new user
				let newUser = new User();
				newUser.email = email;
				newUser.password = newUser.encrypt(password);

				newUser.save(function(err){
					if (err) return callback(err);
					return callback(null, newUser);
				});
			}
		});
	}));
};