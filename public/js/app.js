$(document).ready(function() {

	const url = "https://api.github.com/users/";

	$("#usernameSearch").submit(function(event){
		event.preventDefault();
		var userNameToSearch = $("#searchBox").val();
		//console.log(userNameToSearch);
		var userNameURL = url + userNameToSearch;
		console.log(userNameURL);
    	$.get(userNameURL, function(json, status){
          // renderAlbum(json[json.length - 1]);
        });
  });
});