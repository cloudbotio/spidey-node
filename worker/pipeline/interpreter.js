var log = require("winston");

var async = require("async");
var util = require('util');

var model = require("../../api/adapters/model");

module.exports = function(entity){

	entity = entity || model;

	var exports = {};
	var fn = function(){};

	var items = [];
	var context = {};
	var steps = [];

	function PipelineFactory(name, entity, ctx) {

		c = ctx || context || {};

		log.info("Starting '"+name+"' pipeline...");

		var p = require("../pipelines/" + name);
		return new p(entity, c);
	}

	function input(input) {

		context = {};

		var rule = input;

		// ------  time shortcuts ------ //

		if(typeof rule["restriction"]["time"] === typeof "str") {

			rule.steps.unshift({

				"pipeline": "time",
					"method": "timestring",
					"input": rule["restriction"]["time"]
			});

			delete rule["restriction"]["time"];
		}

		else if(rule["restriction"]["after"]) {

			rule.steps.unshift({

				"pipeline": "time",
					"method": "after",
					"input": rule["restriction"]["after"],
					"output": "items"
			});

			delete rule["restriction"]["after"];
		}

		else if(rule["restriction"]["before"]) {

			rule.steps.unshift({

				"pipeline": "time",
					"method": "before",
					"input": rule["restriction"]["before"],
					"output": "items"
			});

			delete rule["restriction"]["before"];
		}

		// ------- standard pipeline ------- //

		if(rule["restriction"]["find"]) {

			rule.steps.unshift({

				"pipeline": "standard",
					"method": "find",
					"input": rule["restriction"]["find"],
					"output": "items"
			});

			delete rule["restriction"]["find"];
		}

		else if(rule["restriction"]["contains"]) {

			rule.steps.unshift({

				"pipeline": "standard",
					"method": "contains",
					"input": rule["restriction"]["contains"],
					"output": "items"
			});

			delete rule["restriction"]["contains"];
		}

		else if(rule["restriction"]["rule"]) {

			rule.steps.unshift({

				"pipeline": "standard",
					"method": "rule",
					"input": rule["restriction"]["rule"],
					"output": "items"
			});

			delete rule["restriction"]["contains"];
		}

		for(var i = 0; i < rule.steps.length; i++) {

			var s = rule.steps[i];

			if(s.input && s.input.length && 
				typeof s.input !== typeof "string") {
			
				for(var j = 0; j < s.input.length; j++) {

					var partial = JSON.parse(JSON.stringify(s));
					partial.input = s.input[j];

					partial.preserveContext = true;

					steps.push(partial);
				}
			}

			else
				steps.push(s);
		}

	}; exports.input = input;

	function next(cb) {

		cb = cb || fn;

		var s = steps.shift();

		var pipeline = PipelineFactory(s.pipeline, entity, context);
		var method = pipeline[s.method];

		method((s.input || {}), function(res){

			if(util.isError(res))
				cb(err);

			else {

				if(s.preserveContext)
					for(var k in res)
						context[k] = res[k];
				else
					context = res;
				
				cb(null, res);
			}	
		});
	}

	function result(cb) {

		cb = cb || fn;

		if(steps.length > 0) {

			next(function(err, res){

				if(err)
					cb(err, null)
				else
					result(cb);
			});
		}

		else
			cb(context);

	}; exports.result = result;

	function init(){
		return exports;
	};

	return init();	
};