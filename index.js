var fs = require('fs');
var path = require('path');

module.exports = function(dir) {
	var dir = dir || path.join(process.cwd(), 'storage');
	var file = path.join(dir, '_storage.json');
	var dataObj = {};
	Object.defineProperty(dataObj, "_keys", {
		enumerable: false,
		configurable: false,
		writable: true,
		value: []
	});
	fs.readFile(file, function(err, data) {
		dataObj = JSON.parse(data);
	});

	var _isEmpty = function() {
		return (dataObj["_keys"] === undefined);
	};

	var _keyExists = function(key) {
		if (_isEmpty()) {
			return false;
		} else {
			return !(dataObj["_keys"][key] === undefined);
		}
	};

	var _saveObj = function() {
		var dataObjStr = JSON.stringify(dataObj);
		fs.writeFile(file, dataObjStr, function(err) {
			if (err) throw err;
		});
	};

	return {

		setStorageDir: function(dir) {
			file = path.join(dir, '_storage.json');
		},

		getStorageFile: function() {
			return file;
		},

		getAll: function() {
			return dataObj;
		},

		setItem: function(key, value) {
			if (_isEmpty()) {
				dataObj["_keys"] = [key];
			} else {
				dataObj["_keys"].push(key);
			}
			dataObj[key] = value;
			_saveObj();
		},

		getItem: function(key) {
			return dataObj[key];
		},

		getKeys: function() {
			if (_isEmpty()) {
				return [];
			} else {
				return dataObj["_keys"].slice(0);
			}
		},

		getLength: function() {
			if (_isEmpty()) {
				return 0;
			} else {
				return dataObj["_keys"].length;
			}
		},

		removeItem: function(key) {
			if (keyExists) {
				delete dataObj["_keys"][key];
				delete dataObj[key];
				_saveObj();
			}
		},

		clear: function() {
			dataObj = {};
			dataObj["_keys"] = [];
			fs.unlink(file, function(err) {
				if (err) throw err;
			});
		}
	}
};