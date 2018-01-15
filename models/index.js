//Set up DB
var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/gitshow" );

module.exports.User = require('./user');