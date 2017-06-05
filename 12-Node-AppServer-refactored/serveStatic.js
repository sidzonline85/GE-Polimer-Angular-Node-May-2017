var path = require('path'),
	fs = require('fs');

var staticExtns = ['.html', '.css', '.xml', '.js', '.jpg', '.ico'];

function isStatic(resource){
	return staticExtns.indexOf(path.extname(resource)) !== -1;
}

module.exports = function(resourceFolder){
	return function(req, res, next){
		if (isStatic(req.urlObj.pathname)){
			var resource = path.join(resourceFolder, req.urlObj.pathname);
			if (!fs.existsSync(resource)){
				res.statusCode = 404;
				res.end();
				return;
			}
			fs.createReadStream(resource).pipe(res);
		} else {
			next();
		}
	}
}