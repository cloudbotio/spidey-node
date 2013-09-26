var lang = require("../../language").getDefault();

var Bundle = function(name, task) {
	
	var exports = {};
	
	var getByName = function(name){
		
		try {
			exports = require("./" + name);
		}
		catch(e){		
			throw new Error(lang.bundle.invalid || "Invalid or incorrect bundle name.");
		}
	}
	
	var init = function(name) {
		
		getByName(name);
		return exports;
	}
	
	return init(name);
}

module.exports = Bundle;