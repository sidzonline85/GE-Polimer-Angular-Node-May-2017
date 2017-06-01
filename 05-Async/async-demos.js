var app = (function(){

	function addSync(x,y){
		console.log(`		[@Service] processing ${x} and ${y}`);
		var result = x + y;
		console.log(`		[@Service] returning result`);
		return result;
	}

	function addSyncClient(x,y){
		console.log(`[@Consumer] triggering addSync`);
		var result = addSync(x,y);
		console.log(`[@Consumer] result = ${result}`)
	}

	function addAsync(x,y, callback){
		console.log(`		[@Service] processing ${x} and ${y}`);
		setTimeout(function(){
			var result = x + y;
			console.log(`		[@Service] returning result`);
			callback(result);
		}, 5000);
	}

	function addAsyncClient(x,y){
		console.log(`[@Consumer] triggering addAsync`);
		addAsync(x,y, function(result){
			console.log(`[@Consumer] result = ${result}`)	
		});
	}


	return {
		addSyncClient : addSyncClient,
		addAsyncClient : addAsyncClient
	}
})();