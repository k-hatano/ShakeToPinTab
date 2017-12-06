
var lastHighlighted = [];
var lastHighlightedTime = 0;
var lastMoved = 0;
var lastMovedTime = 0;
var lastMovedTimes = 0;
var lastMovedDirection = 0;
var lastPinnedTime = 0

chrome.tabs.onHighlighted.addListener( function(info){
	console.log(info.tabIds);
	var date = new Date();
	var tmpLastHighlighted = lastHighlighted;

	if (date.getTime() - lastHighlightedTime < 1000 && tmpLastHighlighted.length > info.tabIds.length) {
		for (var i = 0; i < tmpLastHighlighted.length; i++) {
			if (info.tabIds.indexOf(tmpLastHighlighted[i]) < 0) {
				chrome.tabs.get(tmpLastHighlighted[i], function(tab){
					var pinned = tab.pinned;
					chrome.tabs.update(tab.id, { 'pinned':!pinned });
					lastPinnedTime = date.getTime();
				});
			}
		}
	}

	lastHighlighted = info.tabIds;
	lastHighlightedTime = date.getTime();
});

chrome.tabs.onMoved.addListener( function(id, info){
	console.log(info);
	console.log(lastMovedTimes);
	var date = new Date();
	var tmpLastMoved = lastMoved;

	if (date.getTime() - lastMovedTime < 2500 && id == lastMoved) {
		if (lastMovedTimes == 0 || lastMovedDirection != (info.fromIndex < info.toIndex)) {
			lastMovedTimes++;
		}
		if (lastMovedTimes >= 4) {
			lastMovedTimes = 0;
			chrome.tabs.get(tmpLastMoved, function(tab){
				var pinned = tab.pinned;
				chrome.tabs.update(tab.id, { 'pinned':!pinned });
				lastPinnedTime = date.getTime();
			});
		}
	} else {
		lastMoved = id;
		lastMovedTimes = 1;
	}

	lastMovedDirection = (info.fromIndex < info.toIndex);
	lastMovedTime = date.getTime();
});

chrome.tabs.onAttached.addListener( function(tabId, info){
	chrome.tabs.get(tabId, function(tab){
		chrome.tabs.update(tabId, { 'pinned':false });
	});
}
);

chrome.browserAction.onClicked.addListener(function(tab) {
	var pinned = tab.pinned;
	chrome.tabs.update(tab.id, { 'pinned':!pinned });
});

