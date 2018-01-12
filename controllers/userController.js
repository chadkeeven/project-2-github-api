let db = require("../models");
const express = require('express');
const router = express.Router();

 //Home page
router.get('/', function homepage(req, res) {
  res.send("hi");
});

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