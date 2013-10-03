var response = require("../adapters/response");
var model = require("../adapters/model");
var policy = require("../policies/");

var lang = require("../../language").getDefault();

module.exports = {
	
	// TODO: create method
	create: function(req, res) {
		
		policy(req, res).check(["authenticated"], function(){
			try {		
				
				console.log(req.body);
				
				var rule = model.create("rule", {
				
					owner: req.cookies.user_id,
					source: req.body.source,
					pipeline: req.body.pipeline,
					repeat: req.body.repeat
				
				});
					
				model.save(rule, function(r){
					
					if(r) {
						response(res).json({
							result: "success",
							message: "Rule created successfully!",
							data: {
								rule: rule.sanitize(rule)
							}
						});
					}
					else
						response(res).json({
							result: "error",
							message: "The rule could not be created",
							code: 500
						});
				});	
			}
			catch(e) {
				
				response(res).json({
					result: "error",
					message: e.message.toString(),
					data: e,
					code: 500
				});
			}
		});
	},
	
	// TODO: get method	
	get: function(req, res) {
		
		try {
			policy(req, res).check(["authenticated"], function() { 

				var _user = model.find("user",  {

					_id: req.cookies.user_id

				}, function(r) {

					if(!r[0])
						throw new Error(lang.error.internal || "Error selecting user")

					response(res).json({

						result: "success",
						data: {
							user: r[0]._sanitize(r[0])
						}
					});

				});
			})
		}

		catch(e) {

			response(res).json({
				result: "error",
				message: e.message.toString()
			})

			return;
		}
	}
}