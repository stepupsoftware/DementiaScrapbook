var joli = require('libs/joli').connect('dementia001');
var Flurry = require('ti.flurry');
Flurry.debugLogEnabled = true;
Flurry.eventLoggingEnabled = true;
Flurry.initialize('3CG3RFQT8ZQQY2NP3V5S');
Flurry.reportOnClose = true;
Flurry.sessionReportsOnPauseEnabled = true;
Flurry.secureTransportEnabled = false;

var testflight = require('com.0x82.testflight');
testflight.takeOff('3bd615ceb2e565ddd53e8035e1c95e9c_MTc5NDM0MjAxMy0wMS0yOCAwNjo0NTo0NC43MjAxNTk');

osname = Titanium.Platform.osname;
if (osname === 'ipad') {
    var splitView = new ( require('SplitView').SplitView)(this);
    splitView.open();
} else if (osname === 'android' || osname === 'iphone') {
    var splitView = new ( require('SingleView').SingleWindow)(this);
}
