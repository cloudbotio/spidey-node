var Server = require("./server");
var log = require("winston");

var workerManager = require("../worker");
workerManager.startAll();	

var server = new Server(function(server, app){

	server.listen(app.get('port'), function(){

		log.info('Worker listening on port ' + app.get('port'));
		
	});
});
