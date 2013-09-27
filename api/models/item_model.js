module.exports = {
	
	title: {

		required: true,
		type: "string"

	},

	content: {

		required: true,
		type: "string"
	},
	
	url: {

		required: true,
		type: "string"
	},
	
	pubDate: {

		required: true,
		type: "integer",
		default: function(){
			return new Date().toISOString()
		}
	},
	
	time: {
		
		required: true,
		type: "object",
		default: function(){
			
			var d = new Date();
			
			return {
				minute: d.getMinutes(),
				hour: d.getHours(),
				day: d.getDate(),
				month: d.getMonth() + 1,
				year: d.getFullYear()
			}
		}
	},
	
	meta: {
		
		required: false,
		type: "object"
	}
}