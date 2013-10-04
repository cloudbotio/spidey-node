var Bundle = require("../bundle");
var model = require("../../../api/adapters/model");
var config = require("../../../config/bundles.json");

var Submarino = function(config){
	
	var exports = {};
	var task = null;
	var api_url = null;
	
	var setTask = function(t) {
		task = t;
	}; exports.setTask = setTask;
	
	var getItems = function(cb) {
	
		// check required parameters
		if(!task)
			throw new Error(lang.bundle.no_task || "Invalid or incorrect task specification");
			
		if(!task.q)
			throw new Error(lang.bundle.no_query || "Missing or invalid query string");
		
		var scrapper = new Bundle("scrapper", {
			url: config.submarino.search_url,
			q: task.q,
		});
		
		scrapper.get(function($){
			
			// TODO: implement Item conversion for each product
			var items = [];
			
			items.push(model.create("item", {
							
				title: string($('title').text()).humanize().s,
				content: $('body').text(),
				meta: {
					price: 1231,
					currency: "BRL"
				},
				url: task.url
			}));
		});
		
	}; exports.getItems = getItems;
	
	var init = function(config) {
		return exports;
	};
	
	return init(config);
}

module.exports = new Submarino(config);