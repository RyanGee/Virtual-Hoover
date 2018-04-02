window.onload = function() {

	//User selects input.txt file
	var fileInput = document.getElementById('fileInput');
	var fileDisplayArea = document.getElementById('fileDisplayArea');

	fileInput.addEventListener('change', function(e) {

		var file = fileInput.files[0];
		var textType = /text.*/;

		this.disabled = true;

		if (file.type.match(textType)) {

			var reader = new FileReader();

			reader.onload = function(e) {
				//Accepted file is parsed into an array and used for hoover calculation
				processFile(reader.result);
			}
			reader.readAsText(file);
		} else {
			fileDisplayArea.innerText = "File not supported!";
		}
	});
}

function processFile(inputString) {

	var input = inputString.trim().split('\n');
	var roomSize = input.shift().split(' ');
	var startPos = input.shift().split(' ');
	var directions = input.pop().split('');

	var dirtSpots = [];
	input.forEach(function(element){
		dirtSpots.push(element.replace('\r', ''));
	});

	var coords = ['x', 'y'];
	var currentPos = associate(coords, startPos);
	var roomMax = associate(coords, roomSize);

	var hooverPath = [];
	var spotsCleaned = 0;

	// Insert starting coordinate into hoover path history
	hooverPath.push(currentPos.x + ' ' + currentPos.y);

	// Attempt each movement, then add position to hoover path history
	directions.forEach(function(direction){
		currentPos = attemptMove(direction, currentPos, roomMax);
		hooverPath.push(currentPos.x + ' ' + currentPos.y);
	});

	// Remove duplicate hoover path entries (assume hoover cleans all dirt spots on first visit to square)
	hooverPath = removeDuplicates(hooverPath);

	// Count number of matches between hoover path and locations of dirt spots
	hooverPath.forEach(function(element){
		spotsCleaned = spotsCleaned + countInArray(dirtSpots, element);
	});

	// Output final position and spots of dirt cleaned into browser console.
	console.log('Final position: ' + currentPos.x + ' ' + currentPos.y );
	console.log('Spots of dirt cleaned: ' + spotsCleaned);

}

// Associate two arrays and return result as JavaScript object 
function associate(keys, values) {

	var result = {};

	values.forEach(function (el, i) {
		result[keys[i]] = el;
	});

	return result;
};

// Attempt movement and return resulting hoover position
function attemptMove(direction, currentPos, roomMax) {

	var newPos = Object.assign({}, currentPos);

	switch(direction.toLowerCase()) {
		case 'n':
			if ( currentPos.y < (roomMax.y - 1)) {
				newPos.y++;
			}
			break;
		case 's':
			if ( currentPos.y > 0) {
				newPos.y--;
			}
			break;
		case 'e':
			if ( currentPos.x < (roomMax.x - 1)) {
				newPos.x++;
			}
			break;
		case 'w':
			if ( currentPos.x > 0) {
				newPos.x--;
			}
			break;
		default:
			console.log('Invalid instruction given - why are you trying to confuse my poor hoover?');
			break;
	}

	return newPos;

}

// Remove duplicate entries from array
function removeDuplicates(arr) {
	return Array.from(new Set(arr));
}

// Count number of times needle appears in haystack array
// ***Unsure if a square can contain more than one spot of dirt, so return (int)count rather than boolean to deal with both cases***
function countInArray(haystack, needle) {

	var count = 0;

	for (var i = 0; i < haystack.length; i++) {
		if (haystack[i] === needle) {
			count++;
		}
	}

	return count;
}
