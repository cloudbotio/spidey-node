var util = require('util');

module.exports = function(model, context){

	var exports = {};
	var fn = function(){};

	function find(rest, cb) {

		cb = cb || fn;
		rest = rest || {};

		model.find("items", rest, function(res){

			if(util.isError(res))
				cb(error);

			else {

				var index = (typeof rest === typeof "str" ? rest : "items");
				context[index] = res;

				cb(context);
			}

		});

	}; exports.find = find;

	function contains(str, cb) {

		cb = cb || fn;

		rest = {
			"$or":[
				{
					"content": {
						"$regex":".*"+str+".*",
						"$options":"i"
					}
				},
				{
					"title": {
						"$regex":".*"+str+".*",
						"$options":"i"
					}
				}
			]
		};

		model.find("items", rest, function(res) {

			context = context || {};

			if(util.isError(res))
				cb(res);

			else {

				context[str] = res;
				cb(context);
			}
		});

	}; exports.contains = contains;

	function rule(id, cb) {

		cb = cb || fn;

		var rest = {
			rule: id
		};

		model.find("items", rest, function(error, res){

			context = context || {};

				model.find(rest, function(res){

				if(util.isError(res))
					cb(res);

				else {

					context[id] = res;
					cb(context);
				}
			
			});
		});

	}; exports.rule = rule;

	function init(model){
		return exports;
	};

	return init();
};