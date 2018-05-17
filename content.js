
var middlePressed = false;

window.addEventListener('mousedown', function(event) {
	if (event.button == 1) {
		middlePressed = true;
		event.preventDefault();
	}
});

window.addEventListener('mouseup', function(event) {
	if (event.button == 1) {
		middlePressed = false;
		event.preventDefault();
	}
});

window.addEventListener('wheel', function(event) {
	if (middlePressed) {
		window.scrollBy(event.deltaY, 0);
		event.preventDefault();
	}
});