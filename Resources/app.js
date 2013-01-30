/*global L, Ti, Titanium, joli, uploader, logger, models, sus, cust*/
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true*/
_ = require('/libs/underscore');
model = require('model/model');
theme = require('/ui/common/theme');
flurry = require('/ui/common/flurrysettings');
tf = require('/ui/common/testflightsettings');
osname = Titanium.Platform.osname;
var splitView = new ( require('/ui/handheld/ios/SingleView').SingleWindow)();
