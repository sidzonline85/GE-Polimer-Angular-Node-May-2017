var http = require('http'),
	fs = require('fs'),
	path = require('path');

var server = http.createServer(function(req, res){
	var resource = path.join(__dirname, req.url);
	if (!fs.existsSync(resource)){
		res.statusCode = 404;
		res.end();
	}
	fs.createReadStream(resource).pipe(res);
});

server.listen(8080);
console.log('server running on 8080');