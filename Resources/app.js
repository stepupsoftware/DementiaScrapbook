/*global L, Ti, Titanium, joli, uploader, logger, models, sus, cust*/
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true*/
var theme = require('/ui/common/theme');
var _ = require('/libs/underscore');
var model = require('model/model');
flurry = require('/ui/common/flurrysettings');
tf = require('/ui/common/testflightsettings');
var win, osname = Titanium.Platform.osname;
if (osname === 'android') {
    win = new ( require('/ui/handheld/android/SingleView').SingleWindow)();
} else {
    win = new ( require('/ui/handheld/ios/SingleView').SingleWindow)();
}
