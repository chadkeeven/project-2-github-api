$(document).ready(function() {

	const url = "https://api.github.com/users/";

	$("#usernameSearch").submit(function(event){
		event.preventDefault();
		var userNameToSearch = $("#searchBox").val();
		//console.log(userNameToSearch);
		var userNameURL = url + userNameToSearch;
		console.log(userNameURL);
		renderResults(userNameURL);
    	// $.get(userNameURL, function(json, status){
     //      // renderAlbum(json[json.length - 1]);
     //    });
  });
	//Function that renders results and places results on page
	function renderResults(githubSearch){
		$.get(githubSearch, function(json){
			console.log(json);
			var resultsHTML = 
			"<!-- result -->" +
			"<div class= 'row'>" +
			"<ul class='list-group>" +
			" <li class='list-group-item'>" +
			"<a href=' "+ json.html_url + "'>" +
			 json.html_url +
			 "</a>" +
            "</li>" +
			"</ul>" + 
			"</div>";
			$(resultsHTML).appendTo('#searchResults');
		});
	}
});