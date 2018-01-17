//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();

const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');

app.use(morgan('dev')); 
app.use(cookieParser());

//require bodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



let db = require("./models");

//Set up EJS
app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

//Passport
app.use(session({ secret: 'HEY'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);
app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	next();
});


//Set up Router
let userRouter = require("./controllers/userController");
app.use("/", userRouter);




/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
	console.log('Express server is running on http://localhost:3000/');
});


