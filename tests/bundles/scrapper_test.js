var Bundle = require("../../worker/bundles/bundle");

exports.test_simpleBundle = function(test){
    
    var bundle = new Bundle("scrapper", {
		url: "http://google.com/search?q=%s", 
		q: "node.js"
	});
    
	test.expect(2)
 	test.ok(bundle, "The bundle shoud be valid");
	
	bundle.getItems(function(items){
		test.ok(bundle, "The items shoud be valid");
		test.done();
	})
}