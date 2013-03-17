/*global L, howRU, scores, data, settings, about, detail, diarynote, ui, util, db, cust, logger */
(function() {
    //TODO make this handle a variable number of params and also JSON.stringify params with typeof Object 
		var msg;
		var loglevel = Ti.App.Properties.getString('loglevel');
		var debug = function(args) {
			if (typeof args === 'string') {
				msg = args;
			} else {
				msg = args.toString();
			}
			Ti.API.debug(msg);
		};
		var info = function(args) {
			if (typeof args === 'string') {
				msg = args;
			} else {
				msg = args.toString();
			}
			Ti.API.info(msg);
		};
		var error = function(args) {
			if (typeof args === 'string') {
				msg = args;
			} else {
				msg = args.toString();
			}
			Ti.API.error(msg);
		};
		switch (loglevel) {
			case 'info':
			exports.log = info;
			break;
			case 'debug':
			exports.log = debug;
			break;
			case 'error':
			exports.log = error;
			break;
			default:
			exports.log = debug;
		}
		exports.debug = debug;
		exports.info = info;
		exports.error = error;

}).call(this);
