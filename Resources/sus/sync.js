/*global L */
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true, regexp: true*/

//immediate function for synching app data
var sync = ( function() {
        var models = require('model/models').models;
        var syncing;
        var setStatus = function(status) {
            var msg;
            syncing = status;
            if (syncing) {
                msg = 'sync has started';
            } else {
                msg = 'sync has stopped';
            }
            Ti.API.info(msg);
        };
        var start = function() {
            setStatus(true);

            var user = models.user;

            user.sync({
                url : user.url,
                connectiontype : user.connectiontype
            });

            var userdetails = user.getField("id", 1);
            var plan = models.trainingplans;

            if (userdetails && userdetails[0]) {
                plan.sync({
                    url : plan.url + userdetails[0],
                    connectiontype : plan.connectiontype
                });
            }
        };
        var stop = function() {
            setStatus(false);
        };

        var status = function() {
            return syncing;
        };

        return {
            start : start,
            stop : stop,
            status : status
        };
    }());

module.exports = sync;

