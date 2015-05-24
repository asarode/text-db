# text-db
![Build Sticker](https://travis-ci.org/asarode/text-db.png?branch=master)

A simple way to store persistent data for node cli tools.

##Why?
I wanted to make something that mimicked HTML5's localStorage API that I could use for Node CLI tools. You can use text-db as a simple way to store persistent key-value pairs. Not exactly what you're looking for? Here are a couple other repos that do similar things: [jsop](https://github.com/typicode/jsop), [node-store](https://github.com/alexkwolfe/node-store).

##Installing
Just install it to your module's dependencies with `npm install text-db --save` and require it with 

`var db = require('text-db')(directory/to/store/files/in)`. Super simple. Text-db will make the directory if it doesn't exist.

##Usage
| Function                  | What it does                                                                                                                            |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| `db.setItem(key,value);` | Saves the given key-value pair to persistent file.                                                                                      |
| `db.getItem(key);`        | Returns the value for the given key. Returns undefined if key doesn't exist.                                                            |
| `db.removeItem(key);`     | Removes the given key.                                                                                                                  |
| `db.getKeys();`           | Returns an array with all the stored keys.                                                                                              |
| `db.getLength();`         | Returns the number of keys stored.                                                                                                      |
| `db.getAll();`            | Returns an object with all the key-value pairs. One field will be "_keys" which holds all the keys and is not enumerable.               |
| `db.getStorageFile();`    | Returns a path to the file where data is being stored.                                                                                  |
| `db.clear();`             | Clears the stored data and deletes the file.                                                                                            |
| `db.setStorageDir(dir);`  | Sets the directory to save the data file to. This will delete the current data file, but will copy over any saved data to the new file. |

##Contact
You can open an issue, send me a tweet ([@rjun07a](https://twitter.com/rjun07a)), or shoot me an email if you want to get in touch. I'll try to get back to you quickly.
