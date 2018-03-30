window.onload = function() {

		//User selects input.txt file
		var fileInput = document.getElementById('fileInput');
		var fileDisplayArea = document.getElementById('fileDisplayArea');

		fileInput.addEventListener('change', function(e) {
			this.disabled = true;
			var file = fileInput.files[0];
			var textType = /text.*/;

			if (file.type.match(textType)) {
				var reader = new FileReader();

				reader.onload = function(e) {

					//Accepted file is parsed into an array and used for hoover calculation
					processFile(reader.result.split('\n'));
				}

				reader.readAsText(file);	
			} else {
				fileDisplayArea.innerText = "File not supported!";
			}
		});
}

function processFile(input) {

	var roomSize = input.shift();
	var startPos = input.shift().split(' ');
	var directions = input.pop().split('');

	var dirtSpots = [];
	input.forEach(function(element){
		dirtSpots.push(element.replace('\r', ''));
	});

	var coords = ['x', 'y'];
	var currentPos = startPos.associate(coords);
	var hooverPath = [];
	var spotsCleaned = 0;

	// Insert starting coordinate into hoover path history
	hooverPath.push(currentPos.x + ' ' + currentPos.y);

	// Attempt each movement, then add position to hoover path history
	directions.forEach(function(direction){
		currentPos = attemptMove(direction, currentPos, roomSize);
		hooverPath.push(currentPos.x + ' ' + currentPos.y);
	});

	// Remove duplicate hoover path history entries and calculate spots cleaned by counting matches in dirtSpots array
	hooverPath = remove_duplicates_safe(hooverPath);
	hooverPath.forEach(function(element){
		spotsCleaned = spotsCleaned + countInArray(dirtSpots, element);
	});

	// Output final position and spots of dirt cleaned into browser console.
	console.log('Final position: ' + currentPos.x + ' ' + currentPos.y );
	console.log('Spots of dirt cleaned: ' + spotsCleaned);

}

// Associate two arrays and return result as JavaScript object 
Array.prototype.associate = function (keys) {
	var result = {};
	this.forEach(function (el, i) {
		result[keys[i]] = el;
	});

	return result;
};

// Attempt movement and return resulting hoover position
function attemptMove(direction, currentPos, roomSize) {
	switch(direction.toLowerCase()) {
		    case 'n':
		        if ( currentPos.y < (roomSize.substr(2) - 1)) {
		        	currentPos.y++;
		        }
		        break;
		    case 's':
		        if ( currentPos.y > 0) {
		        	currentPos.y--;
		        }
		        break;
	        case 'e':
		        if ( currentPos.x < (roomSize.substr(0,1) - 1)) {
		        	currentPos.x++;
		        }
	        	break;
	        case 'w':
		        if ( currentPos.x > 0) {
		        	currentPos.x--;
		        }
	        	break;
		    default:
		    	console.log('Invalid instruction given - why are you trying to confuse my poor hoover?');
		        break;
		}

		return currentPos;
}

// Remove duplicate entries from array
function remove_duplicates_safe(arr) {
    var seen = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
        if (!(arr[i] in seen)) {
            ret_arr.push(arr[i]);
            seen[arr[i]] = true;
        }
    }
    return ret_arr;
}

// Count number of times needle appears in haystack array
function countInArray(haystack, needle) {

    var count = 0;
    for (var i = 0; i < haystack.length; i++) {
        if (haystack[i] === needle) {
            count++;
        }
    }
    return count;
}
