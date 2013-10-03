module.exports = {
	
	owner: {

		required: true,
		type: "string"

	},

	source: {
		
		required: true,
		type: "object",
		
		validate(src) {
		
			if(!src.bundle)
				throw new Error("No bundle specified in Source");
		
			return true;		
		}
	},
	
	pipeline: {

		required: true,
		type: "string",
		defaultTo: 15 //minutes
		
		validate(p) {
		
			if(p.indexOf("/"))
				throw new Error("No pipeline method specified. Use a valid pipeline. Ex: 'content/tags'.");
		
			return true;		
		}
	},
	
	repeat: {

		required: true,
		type: "integer"
	}
}