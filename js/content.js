'use strict';

var parameters = [];

window.onload = (function(event) {
	// get the listing title
	var title = $($('._3jSxGs6DS1 h1')[0]).text();
	var description = $($('._2Mx1RsPDTF p')[0]).text();

	chrome.storage.local.set({
		title: title,
		description: description
	});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "get_images") {
		chrome.storage.local.get(['title'], function(result) {
			// setup an array for downloads
			var downloads = [];

			// start looking for the images
			$.each($('._1-pzxhqYDt > button > img'), function(index, el) {
			    // figure out the file type of the file
			    var url = $(el).attr('src');

			    $.ajax({
			    	url: url,
			    	async: false,
			    	success: function(data) {
					    var extension = 'image';

					    if (data.search('JFIF') != -1) extension = 'jpeg';
					    else if (data.search('PNG') != -1) extension = 'png';

					    downloads.push({
					        url: url,
					        filename: (result.title + ' - Picture ' + (index + 1) + '.' + extension).replace(/[^a-zA-Z0-9-_\.\ ]/g, '')
					    });
			    	}
			    });

			    if ($('._1-pzxhqYDt > button > img').length - 1 == index) {
					// return the download
					sendResponse({ action: "initiate_download", downloads: downloads });
			    }
			});
		});

		return true;
    }
});