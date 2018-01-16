$(document).ready(function() {

	const url = "https://api.github.com/users/";

	$("#usernameSearch").submit(function(event){
		event.preventDefault();
		var userNameToSearch = $("#searchBox").val();
		//console.log(userNameToSearch);
		var userNameURL = url + userNameToSearch;
		const reposURL = userNameURL + "/repos";
		//console.log(reposURL);
		renderResults(reposURL);
	});
	var totalBytes = 0;
	var languageArr=[];
	//Function that renders results and places results on page
	function renderResults(githubSearch){
		$.get(githubSearch, function(json){
			//console.log(json[0]);
			//console.log(json[0].languages_url);
			var repoLanguageURL = json[2].languages_url;
			$.get(repoLanguageURL, function(json){
				//console.log(json);
				var stringJson = JSON.stringify(json);
				var replacedJson = stringJson.replace(/{|}/g,"");
				//console.log(stringJson);
				var lanArr = replacedJson.split(",");
				//console.log(lanArr);
				lanArr.forEach(function(lang, index){
					console.log(lang);
					var splitLang = lang.split(":");
					var langObj = {
						language : splitLang[0],
						bytes : parseInt(splitLang[1])
					};
					languageArr.push(langObj);
					totalBytes += langObj.bytes;
					//console.log("language:" +langObj.language);
					//console.log("bytes:" +langObj.bytes);
				});
				//console.log(languageArr);
				//console.log(totalBytes);
				bytesToPercent(languageArr);
				var resultsHTML = 
				"<!-- result -->" +
				"<div class= 'row'>" +
				"<ul class='list-group>" +
				" <li class='list-group-item'>" +
				//"<a href=' "+ json[0].html_url + "'>" +
				json +
				//"</a>" +
				"</li>" +
				"</ul>" + 
				"</div>";
				$(resultsHTML).appendTo('#searchResults');
			});
		});
	}
	//Function that turns bytes into percents
	function bytesToPercent(arrayOfLanguages){
		arrayOfLanguages.forEach(function(lang, index){
			console.log(lang.bytes);
			var bytePercent = (lang.bytes / totalBytes) * 100;
			var roundedPercent = bytePercent.toFixed(2);
			console.log(roundedPercent);
		});
	}







});