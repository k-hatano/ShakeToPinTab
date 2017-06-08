
var lastHighlighted = [];
var lastHighlightedTime = 0;
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
