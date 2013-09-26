var util = require("util");
var request = require("request");
var lang = require("../../../language").getDefault();

var model = require("../../../api/adapters/model");
var config = require("../../../config/bundles");

var Buscape = function(){
	
	var exports = {};
	var task = null;
	var api_url = null;
	
	var setTask = function(t) {
		task = t;
	}; exports.setTask = setTask;
	
	var getItems = function(cb){
		
		// check required parameters
		if(!task)
			throw new Error(lang.bundle.no_task || "Invalid or incorrect task specification");
			
		if(!task.q)
			throw new Error(lang.bundle.no_query || "Missing or invalid query string");
		
		var request = require('request');
		
		request(util.format(api_url, task.q), function (error, response, body) {
			
			if(error)
				throw new Error("Problem scrapping webpage: " + err.toString());
			
			else if (response.statusCode == 200) {
				
				var list = JSON.parse(body)["product"];
				var items = [];
				
				for(var i = 0; i < list.length; i++) {
					
					var product = list[i].product;
					
					items.push(model.create("item", {
						
						title: product.productshortname,
						content: product.productshortname,
						meta: {
							
							sellers: product.totalsellers,
							price: {
								currency: product.currency.abbreviation,
								value: product.pricemin,
								offers: product.numoffers
							}
						
						}						
					}));
				}
				
				cb(items);
			}
		})
		
	}; exports.getItems = getItems;
	
	var init = function(){
		
		if(!config["buscape"])
			throw new Error("Could not load Buscape API configuration file");
		
		api_url = config["buscape"].api_url;
		return exports;
	}
	
	return init();
};

module.exports = new Buscape();
