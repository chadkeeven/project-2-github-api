var request = require('request'),
expect = require('chai').expect;
var User = require('../models/user');
var Candidate = require("../models/candidate");

describe("Github API", function(){
	describe("User", function() {
		describe("Constructor", function() {
			var user = new User();
			user.email = "chadkeeven@gmail";
			it("should create a new object", function() {   
				expect(typeof(user)).to.equal("object");
			});

			it("should have a name", function() {
				expect(user.email).to.not.be.empty;
			});

		});
	});

	describe("Candidate", function() {
		describe("Constructor", function() {
			var candidate = new Candidate();
			var user = new User();
			user.email = "chadkeeven@gmail";
			candidate.user = 5;
			candidate.user = user.email;
			it("shouldn't allow a number for user", function() {   
				expect(typeof(candidate.user)).to.equal("string");
			});

			it("should have user set to the user.email", function() {
				expect(user.email).to.equal(candidate.user);
			});

		});
	});
});