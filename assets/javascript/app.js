var topics = [ 
    "Tom Hanks", "Denzel Washington", "Halle Berry", "Drew Barrymore", "Cameron Diaz", "Will Smith", "Brad Pitt", 
    "Michael Sera", "Danny Glover", "Michael B Jordan"
];
var numberOfGifs = 10;
var ratingLimit = "PG";

//Dynamically created buttons
function renderButtons(){
	for(var i = 0; i < topics.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("btn");
		newButton.addClass("actor-button");
		newButton.text(topics[i]);
        $("#button-container").append(newButton);
    }
    $(".actor-button").unbind("click");

	$(".actor-button").on("click", function(){
		$(".gif-image").unbind("click");
		$("#gif-container").empty();
		$("#gif-container").removeClass("solid-border");
		populateGIFContainer($(this).text());
	});

}

function addButton(actor){
	if(topics.indexOf(actor) === -1) {
		topics.push(actor);
		$("#button-container").empty();
		renderButtons();
	}
}

function populateGIFContainer(actor){
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?q=" + actor + 
		"&api_key=61TKqzUDPHfv40Bqr6iEsqqBCfa360mt&rating=" + ratingLimit + "&limit=" + numberOfGifs,
		method: "GET"
	}).then(function(response){
		response.data.forEach(function(element){
			newDiv = $("<div>");
			newDiv.addClass("individual-gif-container");
			newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
			var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
			newImage.addClass("gif-image");
			newImage.attr("state", "still");
			newImage.attr("still-data", element.images.fixed_height_still.url);
			newImage.attr("animated-data", element.images.fixed_height.url);
			newDiv.append(newImage);
			$("#gif-container").append(newDiv);
		});
		
		$("#gif-container").addClass("solid-border");
		$(".gif-image").unbind("click");
		$(".gif-image").on("click", function(){
			if($(this).attr("state") === "still") {
				$(this).attr("state", "animated");
				$(this).attr("src", $(this).attr("animated-data"));
			}
			else {
				$(this).attr("state", "still");
				$(this).attr("src", $(this).attr("still-data"));
			}
		});
	});
}

$(document).ready(function(){
	renderButtons();
	$("#submit").on("click", function(){
		event.preventDefault();
		addButton($("#actor-actor").val().trim());
		$("#actor-actor").val("");
	});
});