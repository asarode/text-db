var assert = require("assert");
var db = require("./../index")("storage");
var fs = require("fs");
var path = require("path");

suite("text-db", function() {
	test("getStorageFile() shows correct file", function(done) {
		var expectedPath = path.join(path.resolve(__dirname, ".."), 'storage', '_storage.json');
		assert.equal(expectedPath, db.getStorageFile());
		done();
	});
	test("setStorageDir() switches to correct directory", function(done) {
		db.setStorageDir("testing");
		var expectedPath = path.join('testing', '_storage.json');
		assert.equal(expectedPath, db.getStorageFile());
		db.clear();
		db.setStorageDir("storage");
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
		assert.deepEqual(keys, _keys);
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
		assert.deepEqual(keys, _uniqueKeys);
		db.clear();
		done();
	});
	test("getKeys() returns the correct keys", function(done) {
		var _keys = ["test1", "test1", "test3"];
		var _uniqueKeys = ["test1", "test3"];
		var value = "monkey"
		_keys.forEach(function(key) {
			db.setItem(key, value);
		});
		keys = db.getKeys();
		assert.deepEqual(_uniqueKeys, keys);
		db.clear();
		done();
	});
	test("getAll() returns the right object", function(done) {
		var keys = ["test1", "test2", "test3"];
		var value = "monkey";
		expectedObj = {
			"_keys": keys
		};
		keys.forEach(function(key) {
			db.setItem(key, value);
			expectedObj[key] = value;
		});

		obj = db.getAll();
		assert.deepEqual(expectedObj, obj);
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