function findContent(key) {
	// return undefined if does not exist
	if (typeof fields[key] == 'undefined') {
		return undefined;
	}

	// get the field
	var f = fields[key];

	// if this is a file, and needs to be retrieved
	if (f.type == 'file') {
		var query = typeof f.query == 'function' ? f.query() : f.query;
		var elements = $(query);
		var files = [];

		$.each(elements, function(index, element) {
			// get the given atrt
			var url = $(element).attr(f.attr);

		    // download the file and cache it first
		    // --> note that we do not use async.
		    $.ajax({
		    	url: url,
		    	async: false,
		    	success: function(stream) {
				    var data = f.filter(stream);

				    // push the files
				    files.push({
				        url: url,
				        filename: f.format((index + 1), data).replace(/[^a-zA-Z0-9-_\.\ \(\)\[\]]/g, '')
				    });
		    	}
		    });
		});

		return files;
	}
	
	// if this is just plaintext, and only needs to be retrieved from the page itself
	else if (f.type == 'text') {
		var query = typeof f.query == 'function' ? f.query() : f.query;

		// return value accordingly
		if (f.retrieval == 'text') return $(query).text();
		else if (f.retrieval == 'value') return $(query).val();
	}

	return undefined;
}