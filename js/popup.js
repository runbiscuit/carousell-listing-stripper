'use strict';

$(document).ready(function() {
	chrome.storage.local.get(['title', 'description'], function(result) {
		$('textarea[name=title]').val(result.title);
		$('textarea[name=description]').val(result.description);
	});

	$('button.copy').click(function() {
		// use text
		var text = $($(this).attr('data-clipboard-target')).val();

		//Create a textbox field where we can insert text to. 
		var copyFrom = document.createElement("textarea");

		//Set the text content to be the text you wished to copy.
		copyFrom.textContent = text;

		//Append the textbox field into the body as a child. 
		//"execCommand()" only works when there exists selected text, and the text is inside 
		//document.body (meaning the text is part of a valid rendered HTML element).
		document.body.appendChild(copyFrom);

		//Select all the text!
		copyFrom.select();

		//Execute command
		document.execCommand('copy');

		//(Optional) De-select the text using blur(). 
		copyFrom.blur();

		//Remove the textbox field from the document.body, so no other JavaScript nor 
		//other elements can get access to this.
		document.body.removeChild(copyFrom);
	});

	$('button.downloadImages').click(function(event) {
		// prevent any events
		if (event) event.preventDefault();

		chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
	        chrome.tabs.sendMessage(tabs[0].id, { action: "get_images" }, function(response) {
	            $.each(response.downloads, function(index, download) {
	            	chrome.downloads.download(download);
	            });
	        });
		});
	})
});