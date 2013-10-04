module.exports = {
	
	state: "production",

	development: {

		port: 3000,

		// disable cache
		cache: false,

		// default: 30 (minutes)
		expiration: 30,

		// expose if serve cache
		// will return _c = true
		expose: true,

		db: {
	
			protocol: "mongodb://",
			port: 10085,

			user: "pipeline",
			password: "aa86ea1c09274dd00743543c8c691692",

			db: "app17828079",
			host: "paulo.mongohq.com"
		},

		cluster: {

			max: 1
		},

		alchemy: {

			api_key: "e60ed746adb018ac2a1de837e634e4b2e644e4d6"
		}
	},

	test: {

		port: 3000,

		// enable cache
		cache: true,
		
		// default: 30 (minutes)
		expiration: 30,

		// expose if serve cache
		// will return _c = true
		expose: true,

		db: {
	
			protocol: "mongodb://",
			port: 10085,

			user: "pipeline",
			password: "aa86ea1c09274dd00743543c8c691692",

			db: "app17828079",
			host: "paulo.mongohq.com"
		},

		cluster: {
		
			max: 3
		},

		alchemy: {

			api_key: "e60ed746adb018ac2a1de837e634e4b2e644e4d6"
		}
	},

	production: {

		port: 3000,

		// enable cache
		cache: true,

		// default: 30 (minutes)
		expiration: 30,

		db: {
	
			protocol: "mongodb://",
			port: 10085,

			user: "pipeline",
			password: "aa86ea1c09274dd00743543c8c691692",

			db: "app17828079",
			host: "paulo.mongohq.com"
		},

		alchemy: {

			api_key: "e60ed746adb018ac2a1de837e634e4b2e644e4d6"
		}
	},
}