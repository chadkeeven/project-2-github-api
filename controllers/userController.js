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
	res.render("signup");
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

//INDEX user account page
router.get('/user', function indexUser(req,res){
	res.send("User account page");
});


/**********
 * SEARCH Routes *
 **********/

//INDEX all searches
router.get('/user/searches', function indexSearch(req,res){
	res.send("INDEX search page");
});
//NEW search page
router.get('/user/searches/new', function newSearch(req,res){
	res.send("NEW search page");
});
//CREATE search
router.post('/user/searches', function createSearch(req,res){
	res.send("CREATED search!");
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