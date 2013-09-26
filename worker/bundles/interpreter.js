var map = require("./map");
var lang = require("../../language").getDefault();
var Bundle = require("./bundle");

var Interpreter = function(map) {
	
	var exports = {};
	
	var bundleFactory = function(task) {
		
		if(!task.bundle || !map[task.bundle])
            throw new Error(lang.interpreter.no_bundle 
				|| "Invalid task, no bundle specified");
		
		else {
			
			var bundleName = map[task.bundle];
			task.bundle = null;	
			
			var bundle = new Bundle(bundleName, task);
			
			bundle.setTask(task);
			return bundle;
		}
	}

	var get = function(task, cb) {
		
		cb = cb || function(){};
		
		var bundle = bundleFactory(task);
		
		bundle.getItems(function(items){
			cb(items || []);
		});
		
	}; exports.get = get;

	var init = function(){
		return exports;
	}

	return init();
};

module.exports = new Interpreter(map);