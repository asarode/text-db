var fs = require('fs');
var path = require('path');

module.exports = function(dir) {
	var dir = dir || path.join(process.cwd(), 'storage');
	var file = path.join(dir, 'storage.json');
	var dataObj = {};
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
			dataObj[key] = value;
			var dataObjStr = JSON.stringify(dataObj);

			fs.writeFile(file, dataObjStr, function(err) {
				if (err) throw err;
			});
		},

		getItem: function(key) {
			return dataObj[key];
		},

		removeItem: function(key) {

		},

		setItemKey: function(key, newKey) {

		},

		incrementItem: function(key) {

		},

		pushItem: function(key) {

		},

		clear: function() {
			dataObj = {};
			fs.unlink(file, function(err) {
				if (err) throw err;
			});
		}
	}
};