var http = require('http'),
	path = require('path'),
	chalk = require('chalk');
	
var dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic');
	calculatorHandler = require('./calculatorHandler'),
	notFoundHandler = require('./notFoundHandler'),
	app = require('./app');


app.use(dataParser);
app.use(function(req, res, next){
	console.log(chalk.bold.green(req.method)+'\t'+chalk.bold.blue(req.urlObj.pathname));
	next();
});
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(calculatorHandler);
app.use(notFoundHandler);

http.createServer(app).listen(8080);

console.log('server running on 8080');