var assert = require('assert');
var db = require('./../index')('storage');

suite('text-db', function() {
	test('storage file should equal \"storage\"', function(done) {
		assert.equal('storage/storage.json', db.getStorageFile());
		done();
	});
});