//determine platform and form factor and render appropriate components
var osname = Ti.Platform.osname, version = Ti.Platform.version, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;
var _ = require('lib/underscore');

//TODO latest android phones are higher res than this
var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));

exports.osname = osname;
exports.isTablet = isTablet;

