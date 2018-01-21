let db = require("../models");
const express = require('express');
const router = express.Router();
const passport = require('passport');

 //Home page
 router.get('/', function homepage(req, res) {
 	res.render("index");
 });
/**********
 * USER Routes *
 **********/

//NEW user page
router.get('/user/new', function newUser(req,res){
	res.render("signup", { message: req.flash("signupMessage")});
});

//CREATE user
router.post('/user/new', function createUser(req,res, next){
	let signupStrategy = passport.authenticate('local-signup', {
		successRedirect:'/user',
		failureRedirect: '/user/new',
		failureFlash: true
	});
	return signupStrategy(req, res, next);
});

//GET User login page
router.get('/user/login',function getLogin(req, res, next) {
	res.render("login",{ message: req.flash("loginMessage")});
});

// POST login 
router.post('/user/login', function postLogin(req, res, next) {
	var loginStrategy = passport.authenticate('local-login', {
		successRedirect : '/user',
		failureRedirect : '/user/login',
		failureFlash : true
	});

	return loginStrategy(req, res, next);
});

//INDEX user account page
//INDEX all Canidates for user
router.get('/user', function indexUser(req,res){
	console.log("User Page!");
	var savedCandidatesArr = [];
	db.Candidate.find(function(err, candidates){
		if (err) {
			res.send(err);
		}
		candidates.forEach(function(candidate, index){
			if (candidate.user == req.user.email) {
				var candidateName = candidates[index].username;
				var candidateLable = candidates[index].lable;
				var candidateId = candidates[index]._id;
				var savedCandidate = {
					id: candidateId, 
					username: candidateName,
					lable: candidateLable
				};
				savedCandidatesArr.push(savedCandidate);
			}
		});
		res.render("userAccount", {currentUser: req.user.email, savedCandidates: savedCandidatesArr});
	});
});

//Logout user
router.get('/user/logout',function getLogout(request, response, next) {
	request.logout();
	response.redirect('/');
});


/**********
 * SEARCH Routes *
 **********/

//Search page
router.get('/search', function getSearchPage(req,res){
	res.sendFile('searchPage.html', {root: "./views"});
}); 


/**********
 * CANDIDATE Routes *
 **********/


//NEW candidate page
router.get('/user/candidate/new', function newCandidate(req,res){
	res.sendFile("createCandidate.html",{root: "./views"} );
});
//CREATE candidate
router.post('/user/candidate', function createCandidate(req,res){
	var newUserName = req.body.username;
	var newLable = req.body.lable;
	var userAssociatedWith = req.user.email;
	var newCandidate = {
		username: newUserName,
		lable: newLable,
		user: userAssociatedWith
	};
	db.Candidate.create(newCandidate, function(err, candidate){
		if (err) {
			res.json("Sorry error");
		}
	});
	res.redirect("/user");
});

//SHOW candidates saved by id
router.get('/user/candidate/:id', function showCandidateById(req,res){
	var candidate = req.params.id;
	db.Candidate.findById(candidate,function(err, candidates){
		if (err) {
			res.send(err);
		}
		res.render('candidatePage', { currentCandidate: candidates });
	});
});

//EDIT candidate lable page
router.get('/user/candidate/:id/edit', function editCandidate(req,res){
	var candidateToEdit = req.params.id;
	console.log();
	res.sendFile('editCandidate.html', { editCandidate: candidateToEdit,root: "./views"} );
});


//UPDATE candidate lable
router.put('/user/candidate/:id', function updateCandidate(req,res){

	var updatedCandidate = req.params.id;
	db.Candidate.findOneAndUpdate({_id: updatedCandidate},
		{$set: {
			"lable" : req.body.lable, 
		}}, {new:true}, function (err, candidate){
			if (err) {
				res.json("Can't Update");
			}
		});
	console.log("Updated!");


});


//DELETE candidate
router.delete('/user/candidate/:id/delete', function deleteCandidate(req,res){
	var deletedCandidate = req.params.id;
	console.log(deletedCandidate);
	db.Candidate.remove({_id: deletedCandidate}, function(err,candidate){

		console.log(candidate + "deleted!");
	});
});

module.exports = router;