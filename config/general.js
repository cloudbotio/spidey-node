module.exports = {
<<<<<<< HEAD

	state: "production",
	lang: "en-US",
=======
	
	state: "development",
>>>>>>> v0.0.5 stable release

	development: {

		port: 3000,

		cluster: {

			max: 1
		},

		db: {
	
			protocol: "mongodb://",

			user: "root",
			password: "",

			db: "main",
			host: "localhost"
		},
		
		workers: 1,
		watchers: 1
	},

	test: {

		port: 3000,

		cluster: {
		
			max: 3
		},

		db: {
	
			protocol: "mongodb://",

			user: "root",
			password: "",

			db: "main",
			host: "localhost"
		},
		
		workers: 1,
		watchers: 1
	},

	production: {

		port: 3000,

		db: {
		
			protocol: "mongodb://",

			user: "root",
			password: "",

			db: "main",
			host: "localhost"
		},
		
		workers: 1,
		watchers: 1
	}
}