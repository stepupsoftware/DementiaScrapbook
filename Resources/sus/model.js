/*global L */
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true, regexp: true*/

if (!_) {
	var _ = require('lib/underscore-min');
}

//this constructor is a facade to the titaffydb library.
var Model = function(args) {
	//private objects
	var taffy, db, msg, get, getField, first, insert, merge, stringify, sync, dbname, onUpdate, onRemove;

	try {
		taffy = require('lib/taffydb4ti').taffy;
		dbname = args.db;
		db = new taffy(dbname);
		//onUpdate, onInsert and onRemove are callbacks that can be specified when updating taffyDB records
		if (!args.onUpdate || ( typeof args.onUpdate !== 'function')) {
			onUpdate = function() {
				var msg = 'record ' + this.___id + ' updated in ' + dbname + JSON.stringify(this);
				Ti.API.debug(msg);
			};
		} else {
			onUpdate = args.onUpdate;
		}

		if (!args.onInsert || ( typeof args.onInsert !== 'function')) {
			onInsert = function() {
				var msg = 'new record inserted in ' + dbname + JSON.stringify(this);
				Ti.API.debug(msg);
			};
		} else {
			onInsert = args.onInsert;
		}
		if (!args.onRemove || ( typeof args.onRemove !== 'function')) {
			onRemove = function() {
				var msg = 'record removed from ' + dbname + JSON.stringify(this);
				Ti.API.debug(msg);
			};
		} else {
			onRemove = args.onRemove;
		}

		db.settings({
			onUpdate : onUpdate,
			onInsert : onInsert,
			onRemove : onRemove
		});
		//private functions and objects
		first = function(args) {
			try {
				if (args) {
					return db(args).first();
				}
				return db().first();

			} catch (ex) {
				var msg = ex.message || ex;
				Ti.API.error(msg);
			}
		};

		getField = function(args) {
			var data, msg;
			try {

				return db().distinct(args);

			} catch (ex) {
				msg = ex.message || ex;
				Ti.API.error(msg);
			}
		};

		get = function(args) {
			if (args) {
				return db(args).get();
			}
			return db().get();

		};

		insert = function(args, runEvent) {
			try {
				db.insert(args);
				db.save();

			} catch (ex) {
				var msg = ex.message || ex;
				Ti.API.error(msg);
			}
		};

		merge = function(data, key, runEvent) {
			var count;
			db.merge(data, key, runEvent);
			db.save();
			Ti.API.debug('model ' + dbname + ' has ' + db().count() + ' records');
		};

		remove = function() {
			try {
				if (args) {
					db(args).remove(true);
				}
				db().remove(true);
				db.save();
			} catch (ex) {
				var msg = ex.message || ex;
				Ti.API.error(msg);
			}
		};

		stringify = function(args) {
			try {
				if (args) {
					return db(args).stringify();
				}
				return db().stringify();

			} catch (ex) {
				var msg = ex.message || ex;
				Ti.API.error(msg);
				return undefined;
			}

		};

		sync = function() {
			var file, fileName, model, dataJSON;
			var folderName = Ti.App.Properties.getString('scrapbook') || Titanium.Filesystem.applicationDataDirectory + 'scrapbook';
			var folder = Ti.Filesystem.getFile(folderName);
			try {
				fileName = folderName + '/' +dbname + '.json';
				file = Ti.Filesystem.getFile(fileName);
				model = models[dbname];
				if (file.exists()) {
					dataJSON = JSON.parse(file.read());
					model.merge(dataJSON);
				}

			} catch (ex) {

				msg = ex || ex.message;
				Ti.API.error(msg);

			}

		};

		//public functions objects
		this.dbname = dbname;
		this.find = get;
		this.first = first;
		this.get = get;
		this.getField = getField;
		this.insert = insert;
		this.stringify = stringify;
		this.merge = merge;
		this.remove = remove;
		this.sync = sync;

	} catch (ex) {

		msg = ex.message || ex || 'unknown';
		Ti.API.error('unable to create model error ' + msg + ' thrown');

		return undefined;

	} finally {

		if (!(this instanceof Model)) {
			return new Model();
		}
		return undefined;

	}

};

var create = function(args) {
	var msg, model, settings = {};
	try {
		if (!args.db) {
			throw new error('db not defined in: ' + JSON.stringify(args));
		} else {
			settings.db = args.db;
		}
		if (args.callbacks) {
			//add callbacks
			_.each(args.callbacks, function(method, key) {
				//callback must be a function called onUpdate, onInsert or onRemove
				if ( typeof method === 'function' && typeof key === 'string' && (key === 'onInsert' || key === 'onUpdate' || key === 'onRemove')) {
					settings[key] = method;
				} else {
					Ti.API.error('invalid callback ' + key + 'specified');
				}
			});
		}
		//TODO add insert, update and remove callbacks
		model = new Model(settings);
		//object decoration here
		if (model && ( model instanceof Model)) {
			//add supplied default values
			if (args.defaults) {
				model.defaults = args.defaults;
			}
			if (args.methods) {
				//add custom methods
				_.each(args.methods, function(method, key) {
					if ( typeof method === 'function' && typeof key === 'string') {
						if (model[key]) {
							//allow overloading of functions defined in constructor
							Ti.API.info('function ' + key + ' has been overloaded for model ' + args.db);
						}
						model[key] = method;
					} else {
						Ti.API.error('invalid method ' + key + 'specified');
					}
				});
			}
			if (args.properties) {
				//add custom properties
				_.each(args.properties, function(value, property) {
					if ( typeof property === 'string') {
						model[property] = value;
					} else {
						Ti.API.error('invalid property ' + property + 'specified');
					}
				});
			}
		} else {
			throw new error('model not created for : ' + args.db);
		}

	} catch (ex) {
		msg = ex.message || ex;
		Ti.API.error(msg);
		return undefined;
	} finally {
		return model;
	}

};
module.exports = {
	create : create
};
