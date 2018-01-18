const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CandidateSchema = new Schema({
	username: String,
	lable: String,
	user: String
});


var Candidate = mongoose.model('Candidate', CandidateSchema);

module.exports = Candidate;