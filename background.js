
var movedTabs = 0;
var movedMoment = 0;
var movedTimes = 0;
var movedDirection = 0;

chrome.tabs.onMoved.addListener(function(id, info) {
	var moment = new Date();
	var tmpMovedTabs = movedTabs;

	if (moment.getTime() - movedMoment < 2000 && id == movedTabs) {
		if (movedTimes == 0 || movedDirection != (info.fromIndex < info.toIndex)) {
			movedTimes++;
		}
		if (movedTimes >= 4) {
			movedTimes = 0;
			chrome.tabs.get(tmpMovedTabs, function(tab){
				var pinned = tab.pinned;
				chrome.tabs.update(tab.id, { 'pinned':!pinned });
			});
		}
	} else {
		movedTabs = id;
		movedTimes = 1;
	}

	movedDirection = (info.fromIndex < info.toIndex);
	movedMoment = moment.getTime();
});

chrome.browserAction.onClicked.addListener(function(tab) {
	var pinned = tab.pinned;
	chrome.tabs.update(tab.id, { 'pinned':!pinned });
});
