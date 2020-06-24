'use strict';

function copy(string) {
	// crate a textbox field where we can insert text to.
	var copyFrom = document.createElement("textarea");

	// set the text content to be the text you wished to copy.
	copyFrom.textContent = string;

	// append the textbox field into the body as a child. 
	// "execCommand()" only works when there exists selected text, and the text is inside 
	// document.body (meaning the text is part of a valid rendered HTML element).
	document.body.appendChild(copyFrom);

	// select all the text!
	copyFrom.select();

	// execute command
	document.execCommand('copy');

	// (optional) De-select the text using blur(). 
	copyFrom.blur();

	// remove the textbox field from the document.body, so no other JavaScript nor 
	// other elements can get access to this.
	document.body.removeChild(copyFrom);
}

$(document).ready(function() {
	$('button').click(function(event) {
		// prevent any events
		if (event) event.preventDefault();

		// store key first
		var action = $(this).attr('data-action');
		var key = $(this).attr('data-key');

		chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { action: action, key: key }, function(response) {
				if (action == 'copy') {
					copy(response);
					return true;
				}
				
				else if (action == 'download') {
		            $.each(response, function(index, download) {
		            	chrome.downloads.download(download);
		            });
				}
			});
		});
	});

	chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
		if (message.action == 'download') {
	        $.each(message.downloads, function(index, download) {
	        	chrome.downloads.download(download);
	        });
		}
	});
});