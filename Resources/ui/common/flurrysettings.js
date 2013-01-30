/*global L, Ti, Titanium, joli, uploader, logger, models, sus, cust*/
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true*/
function flurrySettings() {
    var Flurry = require('ti.flurry');
    Flurry.debugLogEnabled = true;
    Flurry.eventLoggingEnabled = true;
    Flurry.initialize('3CG3RFQT8ZQQY2NP3V5S');
    Flurry.reportOnClose = true;
    Flurry.sessionReportsOnPauseEnabled = true;
    Flurry.secureTransportEnabled = false;
}
module.exports = flurrySettings;
