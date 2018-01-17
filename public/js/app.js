$(document).ready(function() {

	const url = "https://api.github.com/users/";
	var totalBytes = 0;
	var languageArr=[];
	var languagesUsed =[];
	var langObj={};
	var indexOfLanguage;
	var userNameToSearch;

	//reset languageArr, languagesUsed after every submit

	$("#usernameSearch").submit(function(event){
		event.preventDefault();
		userNameToSearch = $("#searchBox").val();
		//console.log(userNameToSearch);
		var userNameURL = url + userNameToSearch;
		console.log(userNameURL);
		const reposURL = userNameURL + "/repos";
		//console.log(languageArr);
		const sortByCreateURL = reposURL + "?sort=created";
		renderResults(sortByCreateURL);
		//addResults();
		//setTimeout(addResults(), 3000);
	});

	//Function that renders results and places results on page
	function renderResults(githubSearch){
		var allGetRequests = [];
		// getApiRequest(githubSearch);
		$.get(githubSearch, function(json){
			json.forEach(function(repo,index){
				var repoLanguageURL = json[index].languages_url;
				console.log(repoLanguageURL);
				//getRepoLanguageJson(repoLanguageURL);
				allGetRequests.push(getRepoLanguageJson(repoLanguageURL));
			});
			$.when.apply(this, allGetRequests ).done(function(){
				console.log("Done with requests");
				addResults();
			});

		});

	}

	//Function that gets api request
// 	function getApiRequest(githubSearch){
// //	console.log("2)getApiRequest");
// 		$.get(githubSearch, function(json){
// 			getRepo(json);
// 		});
// 	} 

	//Function that goes through each repo
	// function getRepo(json){
	// 	json.forEach(function(repo,index){
	// 		var repoLanguageURL = json[index].languages_url;
	// 		console.log(repoLanguageURL);
	// 		getRepoLanguageJson(repoLanguageURL);
	// 	});
	// }

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
					//console.log(languageAlreadyAdded(splitLang[0]));

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
						//console.log(languageArr);
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
					//console.log(languageArr);
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
			//console.log("Language to Check: "+languageToCheck);
			//console.log("Language: "+ language);
			//console.log(languageToCheck == language);
			return  languageToCheck == language;
		}
		//.log(languagesUsed.findIndex(something));
		//console.log(languagesUsed.findIndex(something) === -1);
		//if index is -1 that means it wasn't found which means we need to return
		//false to create new langObj in getRepoLanguageJson
		if (languagesUsed.findIndex(something) === -1) {
			return false;
		//if found we want indexOflanguage to equal the index so we can add to the amountOfLanguage
	}else{
		indexOfLanguage = languagesUsed.findIndex(something);
			//console.log(indexOfLanguage);
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
		"<a class='btn btn-default' href='/user/canidate/new'>" +
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
			//if(isNaN(lang.amountOfLanguage)){
			//	arrayWithBytes.splice(index,1);
			//}else{
				totalBytes += lang.amountOfLanguage;
			//	console.log(totalBytes);
			//}
		});
		//totalBytes += objWithBytes.amountOfLanguage;
	}



	//Function that turns bytes into percents
	function bytesToPercent(arrayOfLanguages){
		addBytes(arrayOfLanguages);
		//var bytePercent = (objWithBytes.amountOfLanguage / totalBytes) * 100;
				// 	//console.log(bytePercent);
		//var roundedPercent = bytePercent.toFixed(2);
		//objWithBytes.amountOfLanguage = roundedPercent;
		arrayOfLanguages.forEach(function(lang, index){
			//console.log(lang.amountOfLanguage);
			var bytePercent = (lang.amountOfLanguage / totalBytes) * 100;
			//console.log(bytePercent);
			var roundedPercent = bytePercent.toFixed(2);
			//console.log(roundedPercent);
			lang.amountOfLanguage = roundedPercent;
		});
	}
});