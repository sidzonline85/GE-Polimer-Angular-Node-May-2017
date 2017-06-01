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

	var addAsyncEvents = (function(){
		var callbacks = [];
		function subscribe(callback){
			callbacks.push(callback);
		};

		function process(x,y){
			console.log(`		[@Service] processing ${x} and ${y}`);
			setTimeout(function(){
				var result = x + y;
				console.log(`		[@Service] returning result`);
				callbacks.forEach(callback => callback(result));
			}, 5000);
		}
		return {
			subscribe : subscribe,
			add : process
		}
	})();

	function addAsyncPromise(x,y){
		var promise = new Promise(function(resolveFn, rejectFn){
			console.log(`		[@Service] processing ${x} and ${y}`);
			setTimeout(function(){
				var result = x + y;
				console.log(`		[@Service] returning result`);
				resolveFn(result);
			}, 5000);
		});
		return promise;
	}
	
	return {
		addSyncClient : addSyncClient,
		addAsyncClient : addAsyncClient,
		addAsyncEvents : addAsyncEvents,
		addAsyncPromise : addAsyncPromise
	}
})();