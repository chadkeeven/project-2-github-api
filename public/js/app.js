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
	//Function that renders results and places results on page
	function renderResults(githubSearch){
		$.get(githubSearch, function(json){
			//console.log(json[0]);
			//console.log(json[0].languages_url);
			var repoLanguageURL = json[2].languages_url;
			$.get(repoLanguageURL, function(json){
				console.log(json);
				var stringJson = JSON.stringify(json);
				var replacedJson = stringJson.replace("{","");
				//console.log(stringJson);
				var lanArr = replacedJson.split(",");
				console.log(lanArr);
				var totalBytes = 0;
				// lanArr.forEach(function(lang, index){

				// 	console.log(lang);
				// });
				//console.log(lanArr);
				//var parsedJson= $.parseJSON(json);
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
});