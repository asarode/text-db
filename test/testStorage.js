var assert = require("assert");
var db = require("./../index")("storage");
var fs = require("fs");

suite("text-db", function() {
	test("getStorageFile() shows correct file", function(done) {
		assert.equal("storage/_storage.json", db.getStorageFile());
		done();
	});
	test("setItem() and getItem() set and get correct data", function(done) {
		var key = "test";
		var value = "monkey";
		db.setItem(key, value);
		assert.equal(value, db.getItem(key));
		db.clear();
		done();
	});
	test("setItem() modify dataKeys correctly", function(done) {
		var _keys = ["test1", "test2", "test3"];
		var value = "monkey";
		_keys.forEach(function(item, index) {
			db.setItem(_keys[index], value);
		});
		var keys = db.getKeys();
		var keysAreEqual = true;
		if (keys.length != _keys.length) {
			keysAreEqual = false;
		}
		keys.forEach(function(item, index) {
			if (keys[index] != _keys[index]) {
				keysAreEqual = false;
			}
		});
		assert.equal(true, keysAreEqual);
		db.clear();
		done();
	});
	test("getLength() returns correct length", function(done) {
		var keys = ["test1", "test2", "test3"];
		var value = "monkey";
		keys.forEach(function(key) {
			db.setItem(key, value);
		});
		assert.equal(keys.length, db.getLength());
		db.clear();
		done();
	});
	test("setItem() doesn't push identical keys", function(done) {
		var _keys = ["test1", "test1", "test2"];
		var _uniqueKeys = ["test1", "test2"];
		var value = "monkey";
		_keys.forEach(function(key, index) {
			db.setItem(key, value);
		});
		var keys = db.getKeys();
		var keysAreEqual = true;
		if (keys.length != _uniqueKeys.length) {
			keysAreEqual = false;
		}
		keys.forEach(function(item, index) {
			if (keys[index] != _uniqueKeys[index]) {
				keysAreEqual = false;
			}
		});
		assert.equal(true, keysAreEqual);
		db.clear();
		done();
	});
	test("file deleted on clear()", function(done) {
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