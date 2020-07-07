
var lastMiddlePressedTime = 0
var middlePressed = false;

window.addEventListener('mousedown', function(event) {
	var date = new Date();
	
	if (event.button == 1 && date.getTime() - lastMiddlePressedTime > 1000) {
		middlePressed = true;
		event.preventDefault();
	}
	
	lastMiddlePressedTime = date.getTime();
});

window.addEventListener('mouseup', function(event) {
	if (event.button == 1 && middlePressed) {
		middlePressed = false;
		event.preventDefault();
	}
	
	lastMiddlePressedTime = date.getTime();
});

window.addEventListener('wheel', function(event) {
	if (middlePressed) {
		window.scrollBy(event.deltaY, 0);
		event.preventDefault();
	}
});