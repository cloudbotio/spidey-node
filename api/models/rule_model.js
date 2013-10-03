module.exports = {
	
	owner: {

		required: true,
		type: "string"

	},

	source: {
		
		required: true,
		type: "object",
		
		validate: function(src) {
		
			if(!src.bundle)
				throw new Error("No bundle specified in Source");
		
			return true;		
		}
	},
	
	pipeline: {

		required: true,
		type: "string",
		defaultTo: 15, //minutes
		
		validate: function(p) {
		
			if(p.indexOf("/") == -1)
				throw new Error("No pipeline method specified. Use a valid pipeline. Ex: 'content/tags'.");
		
			return true;		
		}
	},
	
	repeat: {

		required: true,
		type: "integer"
	}
}