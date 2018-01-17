const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CanidateSchema = new Schema({
	username: String,
	lables: String
});


var Canidate = mongoose.model('Canidate', CanidateSchema);

module.exports = Canidate;