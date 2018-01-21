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
	//Checks to see if user is already created,
	//if no user exists then it will create a new one
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passReqToCallback: true
	}, function(req, email, password, callback){
		User.findOne({'email': email}, function(err, user){
			//There was an error
			if(err) return callback(err);
			//There is a user with this email
			if(user){
				return callback(null, false, req.flash('signupMessage', 'Email in use'));
				//You're new!
			}else{
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

	passport.use('local-login', new LocalStrategy( {
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	}, function(req, email, password, callback) {
		User.findOne({"email" : email }, function(err, user){
			if (err) {
				console.log(err);
				return callback(err);
			}//If no user is found
			if (!user) {
				return callback(null,false, req.flash("loginMessage", "No user found!"));
			}//Wrong password
			if (!user.validPassword(password)) {
				return callback(null, false, req.flash("loginMessage", "Oops! Wrong password!"));
			}
			return callback(null, user);
		});
	}
	));
};


