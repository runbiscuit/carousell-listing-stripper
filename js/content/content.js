'use strict';

var fields = {
	title: {
		query: '._3jSxGs6DS1 h1',
		type: 'text',
		retrieval: 'text'
	},

	description: {
		query: function() {
			// ._2JZ8uDBp8w - listing pane
			// section div - narrows down to details
			var result;

			$.each($('._2JZ8uDBp8w > section > div').children(), function(index, element) {
				if ($(element).find('img').length == 0) {
					// click on the "read more" button
					$(element).find('button').click();

					// set result
					result = element;

					// end loop
					return false;
				}
			});

			return result;
		},

		type: 'text',
		retrieval: 'text'
	},

	images: {
		query: '._1-pzxhqYDt > button > img',
		attr: 'src',
		type: 'file',

		// accepts a filestream, and returns an array based on it
		filter: function(stream) {
		    // set data
		    var data = [];

		    // check formats in stream -- JFIF == JPEG, PNG == PNG
		    if (stream.search('JFIF') != -1) data.extension = 'jpeg';
		    else if (stream.search('PNG') != -1) data.extension = 'png';

		    // return data once done
		    return data;
		},

		format: function(index, data) {
			return findContent('title') + ' - Picture ' + index + '.' + data.extension;
		}
	}
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "copy" || request.action == "download") {
    	sendResponse(findContent(request.key));
    }

	else {
		alert('EXCEPTION: Invalid command.');
	}
});