var assert = require('assert');
var db = require('./../index')('storage');
var fs = require('fs');

suite('text-db', function() {
	test('getStorageFile() shows correct file', function(done) {
		assert.equal('storage/storage.json', db.getStorageFile());
		done();
	});
	test('setItem() sets the kay-value data', function(done) {
		var key = "test";
		var value = "monkey";
		db.setItem(key, value);
		var result = db.getItem(key);
		assert.equal(value, result);
		done();
	});
	test('file deleted on clear()', function(done) {
		var key = "test";
		var value = "monkey";
		db.setItem(key, value);
		db.clear();
		var file = db.getStorageFile();
		var fileDeleted;
		fs.stat(file, function(err) {
			fileDeleted = err && (err.code == "ENOENT");
			assert.equal(true, fileDeleted);
        });
        done();
	});
});