//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();


//require bodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Set up Router
let userRouter = require("./controllers/userController");
app.use("/", userRouter);

let db = require("./models");

//Set up EJS
app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
	console.log('Express server is running on http://localhost:3000/');
});


