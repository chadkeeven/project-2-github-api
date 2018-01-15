const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
var UserSchema = new Schema({
	email: String,
	password: String
});

UserSchema.methods.encrypt = function(password){
	bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.validPassword = function(password) {
	bcrypt.compareSync(password, this.local.password);
};

var User = mongoose.model('User', UserSchema);

module.exports = User;