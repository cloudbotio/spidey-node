var queue = require("../../worker/queue");

exports.test_simpleManager = function(test) {

	var manager = require("../../worker");

	queue.push("task");
	manager.startAll();

	test.done();
}