/*global L */
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true, regexp: true*/

if (!_) {
    var _ = require('lib/underscore');
}

var Model = function(args) {
    //private objects
    var taffy, db, msg, merge, get, first, extract, dbname;

    try {
        taffy = require('lib/taffydb4ti').taffy;
        dbname = args;
        db = new taffy(dbname);
        db.settings = {
            onUpdate : function(e) {
                var msg = JSON.stringify(e);
                Ti.API.debug(msg);
            },
            onRemove : function(e) {
                var msg = JSON.stringify(e);
                Ti.API.debug(msg);
            }
        };
        first = function() {
            try {
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

        get = function() {
            return db().get();
        };

        insert = function(args) {
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
            count = db().filter().count();
            Ti.API.info('there are ' + count + ' ' + dbname + ' records');
            //Ti.API.info('data' + db().stringify());
        };

        extract = function() {
            db().stringify();
        };
        //public objects (defined with this)

        //returns a string of JSON text
        this.dbname = dbname;
        this.extract = extract;

        this.find = function(args) {
            try {

                return db().get(args);

            } catch (ex) {
                var msg = ex.message || ex;
                Ti.API.error(msg);
            }
        };
        this.first = first;
        this.get = get;
        this.getField = getField;
        this.insert = insert;

        this.merge = merge;
        this.remove = function(args) {
            
            //TODO remove needs to search for an item, return its ID and then remove it
            db().remove(args, true);
            db.save();

        };
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
    var msg, model;
    try {
        if (!args.db) {
            throw new error('db not defined in: ' + JSON.stringify(args));
        }
        model = new Model(args.db);
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
                    }
                });
            }
            if (args.properties) {
                //add custom properties
                _.each(args.properties, function(value, property) {
                    if ( typeof property === 'string') {
                        model[property] = value;
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
