var fs = require('fs');

/*
fs.readFile('sample.txt', { encoding :'utf8'}, function(err, fileContents){
	if (err){
		console.log('something is not right');
		return;
	}
	console.log(fileContents);
});
*/

var stream = fs.createReadStream('sample.txt', {encoding : 'utf8'});

stream.pipe(process.stdout);


var readCount = 0;
stream.on('data', function(chunk){
	++readCount;
});

stream.on('end', function(){
	console.log('---------------------------------- EOF ------------------------');
	console.log(`${readCount} reads performed`);
});

stream.on('error', function(err){
	console.log('something is not right');
	console.log(err);
});

console.log('This is a dummy line');