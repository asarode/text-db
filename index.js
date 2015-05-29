var fs 		= require('fs');
var path 	= require('path');
var mkdirp 	= require('mkdirp');
var rimraf	= require('rimraf');

module.exports = function(dir) {
	var TMP = fs.existsSync('/tmp') ? '/tmp' : os.tmpDir();
	var dir = dir ? path.join(TMP, 'text-db', dir) : path.join(TMP, 'text-db', 'storage');
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

		/*
		 * Sets the directory to save the data file to. This will delete the 
		 * current data file, but will copy over any saved data to the new file.
		 */
		setStorageDir: function(newDir) {
			rimraf.sync(dir);
			dir = newDir;
			file = path.join(newDir, '_storage.json');
			_saveObj();
		},

		/*
		 * Returns a path to the file where data is being stored.
		 */
		getStorageFile: function() {
			return file;
		},

		/*
		 * Returns an object with all the key-value pairs. One field will 
		 * be "_keys" which holds all the keys and is not enumerable.
		 */
		getAll: function() {
			_loadObj();
			return dataObj;
		},

		/*
		 * Saves the given key-value pair to persistent file.
		 */
		setItem: function(key, value) {
			if (_isEmpty()) {
				dataObj["_keys"] = [key];
			} else if (!_keyExists(key)) {
				dataObj["_keys"].push(key);
			}
			dataObj[key] = value;
			_saveObj();
		},

		/*
		 * Returns the value for the given key. Returns undefined if key 
		 * doesn't exist.
		 */
		getItem: function(key) {
			_loadObj();
			return dataObj[key];
		},

		/*
		 * Returns an array with all the stored keys.
		 */
		getKeys: function() {
			if (_isEmpty()) {
				return [];
			} else {
				return dataObj["_keys"].slice(0);
			}
		},

		/*
		 * Returns the number of keys stored.
		 */
		getLength: function() {
			if (_isEmpty()) {
				return 0;
			} else {
				return dataObj["_keys"].length;
			}
		},

		/*
		 * Removes the given key.
		 */
		removeItem: function(key) {
			if (_keyExists(key)) {
				delete dataObj["_keys"][key];
				delete dataObj[key];
				_saveObj();
			}
		},

		/*
		 * Clears the stored data and deletes the file.
		 */
		clear: function() {
			dataObj = {};
			dataObj["_keys"] = [];
			fs.unlink(file, function(err) {
				if (err) throw err;
			});
		}
	}
};