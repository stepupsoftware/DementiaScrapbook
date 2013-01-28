var joli = require('libs/joli').connect('dementia001');
osname = Titanium.Platform.osname;
if (osname === 'ipad') {
	var splitView = new ( require('SplitView').SplitView)(this);
	splitView.open();
} else if (osname === 'android' || osname === 'iphone') {
	var splitView = new ( require('SingleView').SingleWindow)(this);
}
