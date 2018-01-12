//Set up DB
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/gitshow");


module.exports.User = require('./user');