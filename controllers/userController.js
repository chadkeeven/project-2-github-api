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

// GET User login page
router.get('/user/login',function getLogin(req, res, next) {
	res.render("login",{ message: req.flash("loginMessage")});
});

// POST /login 
router.post('/user/login', function postLogin(req, res, next) {
	var loginStrategy = passport.authenticate('local-login', {
		successRedirect : '/user',
		failureRedirect : '/user/login',
		failureFlash : true
	});

	return loginStrategy(req, res, next);
});

//INDEX user account page
router.get('/user', function indexUser(req,res){
	console.log(req.user.email);
	res.render("userAccount", {currentUser: req.user.email});
});



/**********
 * SEARCH Routes *
 **********/

//Search page
router.get('/search', function getSearchPage(req,res){
	res.sendFile('searchPage.html', {root: "./views"});
}); 

//INDEX all searches
router.get('/user/searches', function indexSearch(req,res){
	res.send("INDEX search page");
});
//NEW canidate page
router.get('/user/canidate/new', function newCanidate(req,res){
	res.render("createCanidate");
});
//CREATE canidate
router.post('/user/canidate', function createCanidate(req,res){
	res.send("CREATED Canidate!");
});
//SHOW search by "nickname" of search
router.get('/user/searches/:nickname', function showByNickNameSearch(req,res){
	var nickName = req.params.nickname;
	res.send(nickName + " page");
});
//EDIT search query page
router.get('/user/searches/:nickname/edit', function editSearch(req,res){
	var searchToEdit = req.params.nickname;
	res.send(searchToEdit + "  EDIT page");
});
//UPDATE search by nickname
router.put('/user/searches/:nickname', function updateSearch(req,res){
	var updatedSearch = req.params.nickname;
	res.send( updatedSearch + " has been UPDATED!");
});
//DELETE search query
router.delete('/user/searches/:nickname', function deleteSearch(req,res){
	var deletedSearch = req.params.nickname;
	res.send(deletedSearch + " search has been DELETED!");
});

//Don't think i need this currently
module.exports = router;