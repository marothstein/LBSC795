// return a topping based on the type passed in
function createTopping( type ) {
	
	switch( type ) {
		case "green_pepper": 
			console.log( "creating topping of type = " + type );
			break;
		case "red_pepper": 
			console.log( "creating topping of type = " + type );
			break;
		case "onion": 
			console.log( "creating topping of type = " + type );
			break;
		case "garlic": 
			console.log( "creating topping of type = " + type );
			break;
		case "tomato": 
			console.log( "creating topping of type = " + type );
			break;
		case "mushroom": 
			console.log( "creating topping of type = " + type );
			break;
		case "pepperoni": 
			console.log( "creating topping of type = " + type );
			break;
		case "hamburger": 
			console.log( "creating topping of type = " + type );
			break;
		case "ham": 
			console.log( "creating topping of type = " + type );
			break;
		case "boy": 
			console.log( "creating topping of type = " + type );
			break;
		case "girl": 
			console.log( "creating topping of type = " + type );
			break;
		default: 
			console.log( "creating topping of type = " + type );
	}
	
	topping = $("<div class='topping' type='" + type + "'></div>");
	
	var deg = Math.random() * 360;
	console.log( "new degrees = " + deg );
	topping.css( "-moz-transform", "rotate(" + deg + "deg)" );
	topping.css( "-webkit-transform", "rotate(" + deg + "deg)" );
	topping.css( "-o-transform",  "rotate(" + deg + "deg)" );
	topping.css( "-ms-transform", " rotate(" + deg + "deg)" );
	topping.css( "transform", " rotate(" + deg + "deg)" );
	
	
	return topping;
}

