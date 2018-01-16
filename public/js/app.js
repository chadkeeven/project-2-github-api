$(document).ready(function() {

	const url = "https://api.github.com/users/";
	var totalBytes = 0;
	var languageArr=[];
	var languagesUsed =[];
	//var languageFound = false;
	var langObj={};
	var indexOfLanguage;

	//reset languageArr, languagesUsed after every submit

	$("#usernameSearch").submit(function(event){
		event.preventDefault();
		var userNameToSearch = $("#searchBox").val();
		//console.log(userNameToSearch);
		var userNameURL = url + userNameToSearch;
		const reposURL = userNameURL + "/repos";
		//const sortByCreateURL = reposURL + "?sort=created";
		renderResults(reposURL);
		addResults(languageArr);
		//setTimeout(addResults(), 3000);
	});

	//Function that renders results and places results on page
	function renderResults(githubSearch){
		getApiRequest(githubSearch);	

	}

	//Function that gets api request
	function getApiRequest(githubSearch){
		$.get(githubSearch, function(json){
			getRepo(json);
		});
	} 

	//Function that goes through each repo
	function getRepo(json){
		// for (var i = 0; i < 1; i++) {
		// 	console.log(json[i].name);
		// 	var repoLanguageURL = json[i].languages_url;
		// 	console.log(repoLanguageURL);
		// 	getRepoLanguageJson(repoLanguageURL);
		// }
		json.forEach(function(repo,index){
			//console.log(json[index].name);
			var repoLanguageURL = json[index].languages_url;
			//console.log(repoLanguageURL);
			getRepoLanguageJson(repoLanguageURL);
		});
	}

	//function that gets the JSON in the language url
	function getRepoLanguageJson(repoLanguageURL){
		$.get(repoLanguageURL, function(json){
			//console.log(repoLanguageURL);
			//console.log(json);
			var stringJson = JSON.stringify(json);
			//console.log(stringJson == "{}");
			if (stringJson != "{}") {
				var replacedJson = stringJson.replace(/{|}/g,"");
			//	console.log(replacedJson);
			var lanArr = replacedJson.split(",");
			//	console.log("New lanArr: "+lanArr);
			lanArr.forEach(function(lang, index){
				var splitLang = lang.split(":");
				//console.log(splitLang[0]);
				//console.log( " languagesUsed are: "+ languagesUsed);
				//If languages have been added to array we want to test to
				//see if current splitLang[0] has been used
				if (languagesUsed.length > 0) {
					//console.log(languageAlreadyAdded(splitLang[0]));

					//if languageAlreadyAdded returns true we still want to add
					//the value of the bytes to the langguage it matches in the languageArr
					if(languageAlreadyAdded(splitLang[0])){
					//console.log(languageArr[indexOfLanguage].amountOfLanguage);
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
		function something(language){
			console.log("Language to Check: "+languageToCheck);
			console.log("Language: "+ language);
			console.log(languageToCheck == language);
			return  languageToCheck == language;
		}
		if (languagesUsed.findIndex(something) === -1) {
			return false;
		}else{
			indexOfLanguage = languagesUsed.findIndex(something);
			//console.log(languagesUsed.findIndex(something));
			return true;
		}
	}

	//function that appends results to page
	function addResults(languageArr){
		//console.log(languageArr);
		bytesToPercent(languageArr);
		languageArr.forEach(function(program, index){
			var resultsHTML = 
			"<!-- result -->" +
			"<div class= 'row'>" +
			"<ul class='list-group>" +
			" <li class='list-group-item'>" +
			program.language +
			": " +
			program.amountOfLanguage +
			"%" +
			"</li>" +
			"</ul>" + 
			"</div>";
			$(resultsHTML).appendTo('#searchResults');
		});
	}


 						//totalBytes += langObj.amountOfLanguage;
// 						console.log(totalBytes);
	//function that adds all bytes up
	function addBytes(arrayWithBytes){
		arrayWithBytes.forEach(function(lang,index){
			if(isNaN(lang.amountOfLanguage)){
				arrayWithBytes.splice(index,1);
			}else{
				totalBytes += lang.amountOfLanguage;
				console.log(totalBytes);
			}
		});
	}



	//Function that turns bytes into percents
	function bytesToPercent(arrayOfLanguages){
		addBytes(arrayOfLanguages);
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