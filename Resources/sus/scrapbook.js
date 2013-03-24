/* global L */
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true, regexp: true*/

// Added : Kosso : log out of dropbox
// REQUIRES https://github.com/kosso/TiCookiejar v0.1

module.exports = ( function() {
        var cookiejar = require('com.kosso.cookiejar');
        var models = require('/model/model').models;
        var model = models.entries;
        var logout = function() {
            cookiejar.clearWebViewCookies('.dropbox.com');
            Ti.App.Properties.setString('DROPBOX_TOKENS', null);
        };

        var dropbox = require('/lib/dropbox');

        var client = dropbox.createClient({
            app_key : '58jhlk7egohvmk3', // <--- you'll want to replace this
            app_secret : 'vgid87jz6p5rnwu'
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

        var getFile = function(file) {

            var options = {
            };
            client.get(file, options, function(status, reply) {
                Ti.API.info(status);
                Ti.API.info(reply);
            });
        };
        var getDelta = function() {
            
            var options = {
            };
            var cursor = Ti.App.Properties.getString('cursor');
            if (cursor) {
                options.cursor = cursor;
            }
            client.delta(options, function(status, reply) {
                Ti.API.info(status);
                Ti.API.info(reply);
                if (reply.reset) {
                    model.remove();
                    model.merge(reply.entries);
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

        var connect = function() {
            if (client.isAuthorized()) {
                getDelta();
            }
            client.login(function(options) {
                getDelta();
            });
        };

        return {
            connect : connect, 
            getFile : getFile
        };
    }());
