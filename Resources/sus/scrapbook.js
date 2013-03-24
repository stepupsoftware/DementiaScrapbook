/* global L */
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true, regexp: true*/

// Added : Kosso : log out of dropbox
// REQUIRES https://github.com/kosso/TiCookiejar v0.1

module.exports = ( function() {
        var cookiejar = require('com.kosso.cookiejar');
        var model = models.entries;
        var logout = function() {
            cookiejar.clearWebViewCookies('.dropbox.com');
            Ti.App.Properties.setString('DROPBOX_TOKENS', null);
        };

        var folder = Titanium.Filesystem.applicationDataDirectory + '/scrapbook';

        var dropbox = require('/lib/dropbox');

        var client = dropbox.createClient({
            app_key : 'xxxxxxxxxxx', // <--- you'll want to replace this
            app_secret : 'xxxxxxxxxxxx'
        });

        // see : https://www.dropbox.com/developers/apps

        var getAccount = function() {

            var options = {
            };
            client.account(options, function(status, reply) {
                Ti.API.info(status);
                Ti.API.info(reply);
            });
        };
        var uploadFile = function() {

            var options = {
                overwrite : true// , // optional
            };
            var contents = Ti.Filesystem.getFile("titanium-mobile.pdf").read();
            client.put("titanium-mobile.pdf", contents, options, function(status, reply) {
                Ti.API.info(status);
                Ti.API.info(reply);
            });
        };

        var getFiles = function() {
            var files;
            try {
                files = model.get();

                if (client.isAuthorized()) {
                    _.each(files, function(file) {
                        if (file && file[1] && (!file[1].is_dir)) {
                            getFile(file[0]);
                        }

                    });
                } else {
                    //login and recurse back into function
                    client.login(function(options) {
                        getFiles();
                    });
                }
            } catch (ex) {
                msg = ex.message || ex || 'something went wrong with getFiles ';
                Ti.API.error(msg);
            }
        };
        var getFile = function(file) {
            var msg, options;
            if (!file) {
                throw new Error('no file specified');
            }
            if ( typeof file !== 'string') {
                throw new Error('file specified is not a string');
            }
            try {
                options = {
                };
                client.get(file, options, function(status, reply) {
                    Ti.API.info(status);
                    Ti.API.info(reply);
                });
            } catch (ex) {
                msg = ex.message || ex || 'something went wrong with getFile ' + file;
            }

        };
        var getDelta = function(args) {

            var cursor, options = {
            };
            if (args.reset === false) {
                cursor = Ti.App.Properties.getString('cursor');
                if (cursor) {
                    options.cursor = cursor;
                }
            }
            client.delta(options, function(status, reply) {
                Ti.API.info(status);
                //Ti.API.info(reply);
                //nuke all the current details and start over
                if (reply.reset) {
                    model.remove();
                    _.each(reply.entries, function(entry) {
                        model.merge(entry[1], 'path', true);
                    });
                    Ti.App.Properties.removeProperty('cursor');
                    Ti.App.Properties.setString('cursor', reply.cursor);
                } else {
                    //add changes to the database
                    _.each(reply.entries, function(entry) {
                        if (entry[1] === null) {
                            model.remove({
                                path : entry[0]
                            });
                        } else {
                            model.merge(entry[1], 'path', true);
                        }
                    });
                }
                if (reply.cursor && reply.cursor !== cursor) {
                    //update the cursor value
                    Ti.App.Properties.removeProperty('cursor');
                    Ti.App.Properties.setString('cursor', reply.cursor);
                }
            });
        };
        var getMetaData = function() {

            var options = {
                file_limit : 10000,
                list : true,
                include_deleted : false,
                locale : "en"
            };
            client.metadata("build.sh", options, function(status, reply) {
                Ti.API.info(status);
                Ti.API.info(reply);
            });
        };
        var getRevisions = function() {

            var options = {
                rev_limit : 100,
                locale : "en"//,
            };
            client.revisions("build.sh", options, function(status, reply) {
                Ti.API.info(status);
                Ti.API.info(reply);
            });
        };
        var makeShare = function() {

            var options = {
            };
            client.shares("build.sh", options, function(status, reply) {
                Ti.API.info(status);
                Ti.API.info(reply);
            });
        };
        var makeMedia = function() {

            var options = {
            };
            client.media("build.sh", options, function(status, reply) {
                Ti.API.info(status);
                Ti.API.info(reply);
            });
        };
        var makeThumbnail = function() {

            var options = {
            };
            client.thumbnails("IMG_0017.JPG", options, function(status, reply, meta) {
                Ti.API.info(status);
                //Ti.API.info(reply.path);
                Ti.API.info(meta);
            });
        };
        var copy = function() {

            var options = {
            };
            client.cp("IMG_0017.JPG", "IMG_0017_COPY.JPG", false, options, function(status, reply) {
                Ti.API.info(status);
                Ti.API.info(reply);
            });
        };
        var move = function() {

            var options = {
            };
            client.mv("IMG_0017_COPY.JPG", "Starmeo/IMG_0017_COPY.JPG", options, function(status, reply) {
                Ti.API.info(status);
                Ti.API.info(reply);
            });
        };
        var makeDir = function() {

            var options = {
            };
            client.mkdir("test_dir", options, function(status, reply) {
                Ti.API.info(status);
                Ti.API.info(reply);
            });
        };
        var doDelete = function() {

            var options = {
            };
            client.rm("/test_dir", options, function(status, reply) {
                Ti.API.info(status);
                Ti.API.info(reply);
            });
        };

        var initialise = function() {
            if (client.isAuthorized()) {
                getDelta({
                    reset : true
                });
            }
            client.login(function(options) {
                getDelta({
                    reset : true
                });
            });
        };

        var connect = function() {
            if (client.isAuthorized()) {
                getDelta({
                    reset : false
                });
            }
            client.login(function(options) {
                getDelta({
                    reset : false
                });
            });
        };

        return {
            client : client,
            connect : connect,
            getFile : getFile,
            getFiles : getFiles,
            initialise : initialise
        };
    }());
