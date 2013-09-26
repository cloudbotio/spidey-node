var w = require("./worker");
var q = require("./queue");

var WorkerManager = function(){

	var MAX_WORKERS = 5;
	var MIN_WORKERS = 3;

	var exports = {};
	var workers = [];

	var startAll = function(){

		for(var i = 0; i < workers.length; i++)
			workers[i].start();

	}; exports.startAll = startAll;

	var stopAll = function(){

		for(var i = 0; i < workers.length; i++)
			workers[i].stop();

	}; exports.stopAll = stopAll;

	var max = function(v1, v2) {
		return v1 > v2 ? v1 : v2;
	}

	var min = function(v1, v2) {
		return v1 < v2 ? v1 : v2;
	}

	var size = function(){

		return workers.length;

	}; exports.size = size;

	var init = function(){

		var tasks = q.size();
		var num = min(max(tasks, MAX_WORKERS), MIN_WORKERS);

		for(var i = 0; i < num; i++)
			workers.push(new w(q));

		return exports;
	};

	return init();	
};

module.exports = new WorkerManager();