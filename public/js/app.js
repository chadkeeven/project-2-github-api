$(document).ready(function() {

	const url = "https://api.github.com/users/";
	var totalBytes = 0;
	var languageArr=[];
	var languagesUsed =[];
	var langObj={};
	var indexOfLanguage;
	var userNameToSearch;

	//To-Do
	//reset languageArr, languagesUsed after every submit

	//When user clicks the createbutton on the createcandidate.html form
	$("#createCandidate").submit(function(event) {
		event.preventDefault();
		var formData = $(this).serialize();
		$.post("/user/candidate", formData);
		$.get("/user", function(json, status){
		});
	});

	//When user clicks the save button on the editCandidate.html form
	$("#editCandidateForm").submit(function(event) {
		var pathUrl =window.location.pathname;
		var substringPath= pathUrl.substring(0, pathUrl.length -5);
		event.preventDefault();
		var formData = $(this).serialize();
		var updatedHTML = "<h2>Updated!</h2>";
		$(updatedHTML).appendTo('.updateDiv');
		$.put = function(url, data){
			return $.ajax({
				url: url,
				type: 'PUT',
				data: formData
			});
		};
		$.put(substringPath,formData);
	});

		//When user clicks the delete button on the editCandidate.html form
		$("#deleteCandidateForm").submit(function(event) {
			var pathUrl =window.location.pathname;
			var substringPath= pathUrl.substring(0, pathUrl.length -5);
			var candidateUrl =   substringPath + "/delete";
			event.preventDefault();
			var deletedHTML = "<h2>Deleted!</h2>";
			$(deletedHTML).appendTo('.updateDiv');
			$.delete = function(url, data, callback, type){
				console.log(url);
				return $.ajax({
					url: url,
					type: 'DELETE'
				});
			};
			$.delete(candidateUrl);
		});

	//When user clicks submit on the searchPage.html
	$("#usernameSearch").submit(function(event){
		event.preventDefault();
		userNameToSearch = $("#searchBox").val();
		var userNameURL = url + userNameToSearch;
		const reposURL = userNameURL + "/repos";
		renderResults(reposURL);
	});

	//Function that renders results and places results on page
	function renderResults(githubSearch){
		var allGetRequests = [];
		$.get(githubSearch, function(json){
			json.forEach(function(repo,index){
				var repoLanguageURL = json[index].languages_url;
				console.log(repoLanguageURL);
				allGetRequests.push(getRepoLanguageJson(repoLanguageURL));
			});
			$.when.apply(this, allGetRequests ).done(function(){
				console.log("Done with requests");
				addResults();
			});

		});

	}

	//function that gets the JSON in the language url
	function getRepoLanguageJson(repoLanguageURL){
		return	$.get(repoLanguageURL, function(json){
			var stringJson = JSON.stringify(json);
			if (stringJson != "{}") {
				var replacedJson = stringJson.replace(/{|}/g,"");
				var lanArr = replacedJson.split(",");
				lanArr.forEach(function(lang, index){
					var splitLang = lang.split(":");
				//If languages have been added to array we want to test to
				//see if current splitLang[0] has been used
				if (languagesUsed.length > 0) {
					//if languageAlreadyAdded returns true we still want to add
					//the value of the bytes to the langguage it matches in the languageArr
					if(languageAlreadyAdded(splitLang[0])){
						languageArr[indexOfLanguage].amountOfLanguage += parseInt(splitLang[1]);
					//if language hasn't been added we want to make a langObj
					//and push into languageArr
				}else{
					langObj = {
						language : splitLang[0],
						amountOfLanguage : parseInt(splitLang[1])
					};
					languageArr.push(langObj);
					languagesUsed.push(splitLang[0]);
				}
				//if no languages have been used we want to create a langObj
				//push into languageArr and push the language into languagesUsed	
			}else{
				langObj = {
					language : splitLang[0],
					amountOfLanguage : parseInt(splitLang[1])
				};
				languageArr.push(langObj);
				languagesUsed.push(splitLang[0]);
			}
		});
			}
		});
	}

	//function that checks to see if language has already been added
	//to master array
	function languageAlreadyAdded(languageToCheck){
		//check to see if languageToCheck and language are the same
		function something(language){
			return  languageToCheck == language;
		}
		//if index is -1 that means it wasn't found which means we need to return
		//false to create new langObj in getRepoLanguageJson
		if (languagesUsed.findIndex(something) === -1) {
			return false;
		//if found we want indexOflanguage to equal the index so we can add to the amountOfLanguage
	}else{
		indexOfLanguage = languagesUsed.findIndex(something);
		return true;
	}
}

	//function that appends results to page
	function addResults(){

		bytesToPercent(languageArr);
		var usernameHTML = 
		"<!-- username -->" +
		"<div class= 'row'>" +
		"<div class='col-md-12'>" +
		"<a class='btn btn-default' href='/user/candidate/new'>" +
		userNameToSearch +
		"</a>" +
		"</div>" + 
		"</div>";
		$(usernameHTML).appendTo('#searchResults');
		languageArr.forEach(function(lang, index){
			var resultsHTML = 
			"<!-- result -->" +
			"<div class= 'row'>" +
			"<ul class='list-group>" +
			" <li class='list-group-item'>" +
			lang.language +
			": " +
			lang.amountOfLanguage +
			"%" +
			"</li>" +
			"</ul>" + 
			"</div>";
			$(resultsHTML).appendTo('#searchResults');
		});
	}
	// //function that adds all bytes up
	function addBytes(arrayWithBytes){
		arrayWithBytes.forEach(function(lang,index){
			totalBytes += lang.amountOfLanguage;
		});
	}

	//Function that turns bytes into percents
	function bytesToPercent(arrayOfLanguages){
		addBytes(arrayOfLanguages);
		arrayOfLanguages.forEach(function(lang, index){
			var bytePercent = (lang.amountOfLanguage / totalBytes) * 100;
			var roundedPercent = bytePercent.toFixed(2);
			lang.amountOfLanguage = roundedPercent;
		});
	}
});