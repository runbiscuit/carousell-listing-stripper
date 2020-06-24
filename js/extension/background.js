'use strict';

chrome.runtime.onInstalled.addListener(function() {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [
				// this will ensure that the extension page will show up for all listing pages on *.carousell.com/p/*
				new chrome.declarativeContent.PageStateMatcher({
					pageUrl: { hostSuffix: '.carousell.com', pathPrefix: '/p/' },
				})
			],

			actions: [ new chrome.declarativeContent.ShowPageAction() ]
		}]);
	});
});