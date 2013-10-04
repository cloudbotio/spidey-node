var log = require("winston");

var bundleInterpreter = require("./bundles/interpreter");

var PipelineInterpreter = require("./pipelines/interpreter");
var pipelineInterpreter = new PipelineInterpreter();

var Worker = function(q, t){

	// autostart
	var START_ON_INIT = false;
	var DEFAULT_TIMEOUT = 5000;

	var exports = {};
	var active = false;
	var queue = q || require("./queue") || null;
	var storage = require("./storage");

	var refreshIntervalId = null; 
	var timeout = t || DEFAULT_TIMEOUT;

	var start = function(timeout) {
		
		active = true;
		timeout = timeout || DEFAULT_TIMEOUT;

		work();

		setInterval(function(){

			if(!active && refreshIntervalId) {
				clearInterval(refreshIntervalId);
				return;
			}

			work();
			
		}, timeout);

	}; exports.start = start;

	var work = function() {

		queue.get(function(task){
			
			log.info("worker says: new task found! (rule: '"+task._id+"')");
			
			var _t = task;
			
			bundleInterpreter.get(task.source, function(items) {
				analysis(items, _t);
			});
		});

	}; exports.work = work;
	
	var analysis = function(items, task) {
		
		pipelineInterpreter.input(task.tunnel	, items);

		pipelineInterpreter.result(function(result){
			log.info(result);
		});
	};

	var isActive = function(){

		return active ? true : false;

	}; exports.isActive = isActive;

	var stop = function() {
		
		active = false;

	}; exports.stop = stop;

	var init = function() {

		if(START_ON_INIT)
			start();
		
		return exports;
	};

	return init();
};

module.exports = Worker;
