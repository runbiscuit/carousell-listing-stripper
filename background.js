'use strict';

chrome.runtime.onInstalled.addListener(function() {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [
				new chrome.declarativeContent.PageStateMatcher({
					pageUrl: { hostEquals: 'sg.carousell.com', pathPrefix: '/p/' },
				})
			],

			actions: [ new chrome.declarativeContent.ShowPageAction() ]
		}]);
	});
});