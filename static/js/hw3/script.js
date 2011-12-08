/* Author: 

*/

/****************************/
/* Script constants */
/****************************/
var PERTOPPINGCOST = 0.10;

/*************************************/
/* Script globals */
/*************************************/
// these are mutable with user action
var currentCost = 10.0;
var currentTopping = null;

// these are some pizza-wide settings (also mutable, but have defaults)
var currentSize = "medium";
var currentCheese = "white";

// pizza dimension variables
var centerX = 0;
var centerY = 0; 
var radius = 0;

// current jquery object for a topping
var currentTopping_object = null;


/*************************************/
/* Set and call script entry point */
/*************************************/
$(document).ready( start );


/*************************************/
/* Script Entry Point and config */
/* methods */
/*************************************/
function start() {
	
	// set defaults
	set_defaults(); // set up the default states for the script (mozarrella, medium, etc...)
	
	// init handlers
	init_handlers();
	
	// draw pizza initially
	draw_pizza();
	
	// find center of pizza
	find_pizza_coordinates();
	
	// import toppings methods
	$.getScript("js/createToppings.js" );
}


function init_handlers() {
	
	$( ".size" ).click( sizeClickHandler );
	$( ".crust" ).click( crustClickHandler );
	$( ".cheese" ).click( cheeseClickHandler );
	$( ".topping_control" ).click( toppingClickHandler );
	
	$( "#pizza" ).click( pizzaClickHandler );
	
	// probably have a separate handler for toppings (meat and veggies) and full-pizza selections (crust, cheese, size)
}

function draw_pizza() {
	
}

function set_defaults() {
	
	// set medium size
	
}

function find_pizza_coordinates() {
	centerX = 0;
	
	var pizzaWidth = $("#pizza").css("width");
	var pizzaHeight = $("#pizza").css("height");
	console.log(" pizza dimensions (" + pizzaWidth + ", " + pizzaHeight + ")" );
	
	var width = pizzaWidth.split("p")[0];
	var height = pizzaHeight.split("p")[0]
	var topX = $("#pizza").css("left");
	var topY = $("#pizza").css("top");
	var offsetX = $("#pizza").offset().left;
	var offsetY = $("#pizza").offset().top;
	
	console.log( " pizza location (" + offsetX + ", " + offsetY + ")" );
	
	var centerX = offsetX + ( width / 2 );
	var centerY = offsetY + ( height / 2 );
	
	console.log( " pizza center (" + centerX + ", " + centerY + ")" );
	
	// $("body").append( "<div class=")
	
}

/********************************************************************************/
/* PIZZA CLICK HANDLERS
/********************************************************************************/
function pizzaClickHandler( event ) { 
	console.log( "PIZZA object clicked" );
	
	var clickedItem = $(this).attr( 'id' );
	var offset = $("#cheese").offset();
	
	if( currentTopping_object != null ) {
		var x = event.clientX;
		var y = event.clientY;
		
		// actually create and place the topping
		placeTopping( x, y, offset );
		
	}
	else {
		console.log( "no topping selected. not adding anything" );
	}
	
	// add
}

function placeTopping( x, y, offset ) {
	console.log( "topping selected! adding a " + currentTopping_object.attr( "id" ) + " at ( " + (x - offset.left) + ", " + (y + 10 ) + " ) to " );
	
	var toBeAdded = createTopping( currentTopping_object.attr("type") );

	// scroll offset
	var scrollOffset = $("body").scrollTop();
	
	// $(toBeAdded).addClass( "onpizza" );
	$(toBeAdded).css( "z-index", "9" );
	$(toBeAdded).css( "position", "absolute" );
	$(toBeAdded).css( "left", (x - offset.left - 25 ) + "px" );
	$(toBeAdded).css( "top",  (y - offset.top - 25 + scrollOffset ) + "px" );

	$( "#cheese" ).append( $( toBeAdded ) );
	
	// update pizza cost
	incrementCost();
}

function incrementCost() {
	currentCost += PERTOPPINGCOST;
	
	// update the field in an animated way!
	var priceField = $("#price");
		
	
	// var growable = $(".growable");
	priceField.clearQueue();
	priceField.stop();
	priceField.html( "$" + Number(currentCost).toFixed(2) );
	priceField.animate( { "font-size": "5em", "top": "-=50px" }, 40, function() {
		
		setTimeout( function() {
			priceField.animate( { "font-size": "3em", "top": "0em"}, 600 );
		}, 30);

	} );

	
	//price
}


/********************************************************************************/
/* BUTTON CLICK HANDLERS
/********************************************************************************/
function sizeClickHandler( event ) { 
	console.log( "size object clicked" ); 
	
	if( $(this).hasClass( "selected" ) ) {
		
	}
	else {
		var newSize = $(this);
		$(".size").removeClass( "selected" );
		$(newSize).addClass( "selected" );
		
		currentSize = $(this).attr( 'id' );
	}
	
}

function crustClickHandler( event ) { 
	console.log( "crust object clicked" ); 
	if( $(this).hasClass( "selected" ) ) {
		
	}
	else {
		var newCrust = $(this);
		$(".crust").removeClass( "selected" );
		$(newCrust).addClass( "selected" );
	}
	
}

function cheeseClickHandler( event ) { 
	console.log( "cheese object clicked" );
	
	if( $(this).hasClass( "selected" ) ) {
		
	}
	else {
		var newCheese = $(this);
		$(".cheese").removeClass( "selected" );
		$(newCheese).addClass( "selected" );
		
		var type = $(this).attr("type"); 
		// alert( "type = " + type );
		if( type  == "white" ) { $("#cheese").removeClass().addClass( type ); }
		else if( type == "yellow" ) { $("#cheese").removeClass().addClass( type ); }
		else if( type == "orange" ) { $("#cheese").removeClass().addClass( type ); }
	}
	
}

function toppingClickHandler( event ) { 
	console.log( "topping object clicked" );
	
	var hasClass = $(this).hasClass( "selected" );
	
	$( ".topping_control" ).removeClass( "selected" );
	
	var clickedItem = $(this).attr( 'id' );
	
	if( hasClass) {
		console.log( "element " + clickedItem + " had class " );
		// $( this ).removeClass( "selected" ); 
	}
	else {		
		console.log( "element " + clickedItem + " did NOT have class " );
	}
	
	// select the topping again anyway
	$(this).addClass("selected");
	
	// set the current topping to the one that was clicked. 
	current_topping = clickedItem;
	currentTopping_object = $(this);
	
	// add to test pane
	$("#test_pane").html( "current topping == " + current_topping );
	
	// prevent this event from being fired multiple times! - might need to do something different to fix this
    event.stopPropagation();
}

function buttonClickHandler( event ) {
	var hasClass = $(this).hasClass( "selected" );
	
	$( "button" ).removeClass( "selected" ); 
	
	var clickedItem = $(this).attr( 'id' );
	
	if( hasClass) {
		console.log( "element " + clickedItem + " had class " );
		// $( this ).removeClass( "selected" ); 
	}
	else {		
		console.log( "element " + clickedItem + " did NOT have class " );
		$(this).addClass("selected");
	}
	
	// set the current topping to the one that was clicked. 
	current_topping = clickedItem;
	if( $(this).hasClass( "topping" ) ) {
		console.log( "topping clicked - " + clickedItem );
		currentTopping_object = $(this);
	}
	else {
		console.log( "NOT topping clicked - " + clickedItem );
		currentTopping_object = null;
	}
	
	
	
	// add to test pane
	$("#test_pane").html( "current topping == " + current_topping );
	
	// prevent this event from being fired multiple times! - might need to do something different to fix this
    event.stopPropagation();
	
}
