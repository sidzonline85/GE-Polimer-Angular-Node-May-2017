var url = require('url');

module.exports = function(req, res, next){
	req.urlObj = url.parse(req.url);
	req.query = querystring.parse(req.urlObj.query);
	if (req.method === 'POST'){
		var rawData = '';
		req.on('data', function(chunk){
			rawData += chunk;
		});
		req.on('end', function(){
			var data = querystring.parse(rawData);
			req.body = data;
			next();
		})
	} else {
		next();	
	}
	
};