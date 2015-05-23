var fs 		= require('fs');
var path 	= require('path');
var mkdirp 	= require('mkdirp');

module.exports = function(dir) {
	var dir = dir || path.join(process.cwd(), 'storage');
	mkdirp.sync(dir);
	var file = path.join(dir, '_storage.json');

	var _isEmpty = function() {
		return (dataObj["_keys"] === undefined);
	};

	var _keyExists = function(key) {
		if (_isEmpty()) {
			return false;
		} else {
			return (dataObj["_keys"].indexOf(key) > -1);
		}
	};

	var _loadObj = function() {
		try {
			fs.statSync(file);
			var data = fs.readFileSync(file)
			if (data != undefined && data != "") {
				dataObj = JSON.parse(data);
			}
		} catch(err) {
			if (err.code != "ENOENT") throw err;
		}
	}

	var _saveObj = function() {
		var dataObjStr = JSON.stringify(dataObj);
		fs.writeFile(file, dataObjStr, function(err) {
			if (err) throw err;
		});
	};

	var dataObj = {};
	Object.defineProperty(dataObj, "_keys", {
		enumerable: false,
		configurable: true,
		writable: true,
		value: []
	});
	_loadObj();

	return {

		setStorageDir: function(dir) {
			file = path.join(dir, '_storage.json');
		},

		getStorageFile: function() {
			return file;
		},

		getAll: function() {
			_loadObj();
			return dataObj;
		},

		setItem: function(key, value) {
			if (_isEmpty()) {
				dataObj["_keys"] = [key];
			} else if (!_keyExists(key)) {
				dataObj["_keys"].push(key);
			}
			dataObj[key] = value;
			_saveObj();
		},

		getItem: function(key) {
			_loadObj();
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
			if (_keyExists(key)) {
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