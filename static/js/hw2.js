$(document).ready( starthw2 );

// search handle
var imageSearch;

function starthw2() {
	// populate UI
	populateUI();
	
	// set up listeners
	setupListeners();
	
	// initialize search
	initSearch();
}

function initSearch() {
	// SEARCH TERM
	var searchFor = "silly dog";
	imageSearch = new google.search.ImageSearch();
	imageSearch.setSearchCompleteCallback( this, searchComplete, null);

	imageSearch.execute( searchFor );
	
	$(".google_results_container img").live( "click", imageClicked );
}

function imageClicked( event ) {
	console.log( "image clicked: " + event.target.src );
	console.log( "image full URL: " + $(event.target).attr("fullURL") );

	var imgURL = $(event.target).attr("fullURL"); 
	
	// set url field to new picture
	$("#url").val( imgURL );
	
	// get image element
	var image = $("#image").get(0);
	
	// update the picture
	updatePicture( imgURL );
}

function searchComplete() {
	// Check that we got results
	if (imageSearch.results && imageSearch.results.length > 0) {
    	// Grab our content div, clear it.
	    var resultsDiv = $( ".google_results_container" );
		
		// Loop through our results, printing them to the page.
		var results = imageSearch.results;
		for (var i = 0; i < results.length; i++) {
			// For each result write it's title and image to the screen
			var result = results[i];
			
			var newImg = document.createElement('img');
			// There is also a result.url property which has the escaped version
			newImg.src = result.tbUrl;
			$(newImg).attr("fullURL", result.url);
			$(newImg).attr("tabindex", "0");

			// Put our title + image in the content
			resultsDiv.append( newImg );
		}
	}
	
}

function populateUI() {
	var img_uri = $("#image").attr( "src" );
	
	// comment this out so we can get rid of the label and instead use the placeholder text for
	// contextual instructions
	$("#url").attr("value", img_uri );
}

function setupListeners() {
	// url bar focus / keyboard listener
	$("#url").keyup( urlKeyUpHandler );
	$(".google_results_container img").live( "keyup", imageKeyUpHandler );
	
	// submit button for new picture source
	$("#submit").click( submitClicked );
	
	// other url, just for ease of use
	$("#example_img_uri").click( function() { $("#url").attr( "value", $(this).html() ).focus(); } );
}

function urlKeyUpHandler( event ) {
	if( event.which == 13  ) {
		console.log( "enter pressed!" );
		submitClicked( event );
	}
	
}

function imageKeyUpHandler( event ) {
	if( event.which == 13  ) {
		var fullURL = $(this).attr("fullURL");
		console.log( "enter pressed on an image - " + fullURL + "!!" );
		
		$("#url").attr( "value", fullURL );
		submitClicked( event );
	}
	
}

function submitClicked( event ) {
	var img_uri = $("#url").val();
	
	updatePicture( img_uri );
}

function updatePicture( img_uri ) {
	// var img_uri = $("#url").val();
	
	var image = $("#image").get(0);
	// alert( $(image).parent().get(0) );
	
	$(image).parent().css("height", image.height ); 
	// image.parent.height = image.height;
	
	$("#image").fadeOut( function() {
		var image = $("#image").get(0);
		
		image.src = img_uri;
		
		console.log(" before checking loaded status... height = " + image.height );
		if( image.complete ) {
			console.log( "image loaded. height = " + image.height );
			
			$( image ).parent().animate( { height: image.height}, 500, function() {
				$( image ).fadeIn();	
			});
		}
		else {
			console.log("image incomplete. waiting until load for drawing..." );
			image.onload = function() { 
				console.log("----image loaded. drawing at height = " + image.height );
				$( image ).parent().animate( { height: image.height}, 500, function() {
					$( image ).fadeIn();	
				});
			}
		}
	});
	
	
}