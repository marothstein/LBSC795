$(document).ready( startTemperature );

// search handle
var imageSearch;

function startTemperature() {
	// set up listeners
	setupListeners();
	
	// initialize search
	initSearch();
}



function buttonClicked( event ) {
	console.log( "button clicked: " + event.target.src );
}

function setupListeners() {
	// url bar focus / keyboard listener
	$("#f").keyup( tempButtonKeyUpHandler ).click( tempButtonClickHandler );
	$("#c").keyup( tempButtonKeyUpHandler ).click( tempButtonClickHandler );
	
	// submit button for new picture source
	$("#convert").click( convertClicked );
}

function tempKeyUpHandler( event ) {
	if( event.which == 13  ) {
		console.log( "enter pressed!" );
		submitClicked( event );
	}
	
}

function tempButtonKeyUpHandler( event ) {
	
	var keyPressed = event.which; 
	
	// if button == F
	if( event.which == 13 /* || event.which == 'space' */ ) {
	}
	
	// if button == C
	if( event.which == 13 /* || event.which == 'space' */ ) {
	}
	
	// if button == Convert
	if( event.which == 13 /* || event.which == 'space' */ ) {
		var fullURL = $(this).attr("fullURL");
		console.log( "enter pressed on an image - " + fullURL + "!!" );
		
		$("#url").attr( "value", fullURL );
		submitClicked( event );
	}
	
}

function convertClicked( event ) {
	alert( " CONVERTING ");
}

function calcFarenheit( temp ) {
	
}

function calcCelcius( temp ) {
	
}