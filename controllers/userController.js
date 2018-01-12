let db = require("../models");
const express = require('express');
const router = express.Router();

 //Home page
router.get('/', function homepage(req, res) {
  res.json("homePage");
});

//NEW user page
router.get('/user/new', function newUser(req,res){
	res.send("new user page");
});

//CREATE 


//User account page

//Create Search page

//Edit search query page

//Delete search query


// //Add new cargo
// router.post('/cargo', cargoController.create);


// function homePage (req,res){
// 	res.json("hi");
// }

// function newCargo (req, res) { 
// 	res.render('cargoNew');
// 	} 

// function createCargo(req, res) { //and look at that controller
// 	db.Cargo.create({description: req.body.description, title: req.body.title}, function(error, cargo) {
// 		res.render('cargoShow', {cargo: cargo});
// 	});
// }

// module.exports.new = newCargo;
// module.exports.create = createCargo;
module.exports = router;