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

	return {

		setStorageFile: function(pathToFile) {
			file = pathToFile;
		},

		getStorageFile: function() {
			return file;
		},

		setItem: function(key, value) {
			if (dataObj["_keys"] === undefined) {
				dataObj["_keys"] = [key];
			} else {
				dataObj["_keys"].push(key);
			}
			dataObj[key] = value;
			var dataObjStr = JSON.stringify(dataObj);

			fs.writeFile(file, dataObjStr, function(err) {
				if (err) throw err;
			});
		},

		getItem: function(key) {
			return dataObj[key];
		},

		getKeys: function() {
			return dataObj["_keys"].slice(0);
		},

		getLength: function() {
			return dataObj["_keys"].length;
		},

		removeItem: function(key) {
			delete dataObj[key];
		},

		// incrementItem: function(key) {
		// 	var value = dataObj[key];
		// 	if (typeof value == "number") {
		// 		value++;
		// 	} else if (!(key in dataObj)) {
		// 		throw new Error("Key doesn't exist.");
		// 	} else {
		// 		throw new Error("Can't increment non-number values.");
		// 	}
		// },

		// decrementItem: function(key) {
		// 	var value = dataObj[key];
		// 	if (typeof value == "number") {
		// 		value--;
		// 	} else if (!(key in dataObj)) {
		// 		throw new Error("Key doesn't exist.");
		// 	} else {
		// 		throw new Error("Can't increment non-number values.");
		// 	}

		// },

		// pushItem: function(key, data) {
		// 	var value = dataObj[key];
		// 	if (value.prototype === Array) {
		// 		value.push(data);
		// 	} else if (!(key in dataObj)) {
		// 		throw new Error("Key doesn't exist.");
		// 	} else {
		// 		throw new Error("Can't push item into non-array value.");
		// 	}
		// },

		clear: function() {
			dataObj = {};
			dataKets = [];
			fs.unlink(file, function(err) {
				if (err) throw err;
			});
		}
	}
};