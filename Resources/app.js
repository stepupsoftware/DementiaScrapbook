/*global L, Ti, Titanium, joli, uploader, logger, sus, cust*/
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true*/
_ = require('/lib/underscore-min');
theme = require('/ui/common/theme');
models = require('/model/model').models;
//TODO add flurry back in once I have old machine back or built project
//flurry = require('/ui/common/flurrysettings');
//tf = require('/ui/common/testflightsettings');
var scrapbook = require('/sus/scrapbook');
//TODO download files and show an activity indicator until work is finished
Ti.App.Properties.setInt('interval', 5000);
Ti.App.Properties.setString('scrapbook', Titanium.Filesystem.applicationDataDirectory + 'scrapbook');
var contents = models.contents.get();
if (!contents || _.size(contents) === 0) {
    scrapbook.initialise();
}
var folderName = Ti.App.Properties.getString('scrapbook') || Titanium.Filesystem.applicationDataDirectory + 'scrapbook';
var folder = Ti.Filesystem.getFile(folderName);
var directoryContents = folder.getDirectoryListing();

if (_.size(directoryContents) === 0) {
    scrapbook.download();
}

var scrollView = require('/ui/common/scrollWindow').create();

SIDEBAR = 100;
var mainWin, settingsWin, metroBtn, refreshBtn, osname = Titanium.Platform.osname, slideItLeft, slideItRight;
var callBack = function(e) {
    mainWin.title(e.rowData.id);
    scrollView.setImages(e.rowData.id.toLowerCase());
};

settingsWin = require('/ui/common/SettingsWindow').create(callBack);

mainWin = require('/ui/common/ApplicationWindow').create({
    tabBar : false,
    title : 'all photos'
});

mainWin.add(scrollView.view);

slideItLeft = Titanium.UI.createAnimation({
    right : SIDEBAR,
    duration : 1000,
    curve : Titanium.UI.ANIMATION_CURVE_LINEAR
});

slideItRight = Titanium.UI.createAnimation({
    right : 0,
    duration : 1000,
    curve : Titanium.UI.ANIMATION_CURVE_LINEAR
});
//TODO resize button or add listener to view, not button
metroBtn = Ti.UI.createButton(_.defaults({
    backgroundImage : '/images/259-list.png',
    width : 40,
    height : 28,
    toggle : false,
    borderRadius : 0
}, theme.tabButton));

metroBtn.addEventListener('click', function(e) {
    if (e.source.toggle === true) {
        settingsWin.hide();
        mainWin.animate(slideItRight);
        e.source.toggle = false;
    } else {
        settingsWin.show();
        mainWin.animate(slideItLeft);
        e.source.toggle = true;
    }
});

refreshBtn = Ti.UI.createButton(_.defaults({
    backgroundImage : '/images/01-refresh.png',
    width : 24,
    height : 26
}, theme.tabButton));

//not needed just yet.
//mainWin.setRightNavButton(metroBtn);
mainWin.setLeftNavButton(metroBtn);

mainWin.addEventListener('dblclick', function() {
    scrollView.setTimer();
});

mainWin.addEventListener('swipe', function(e) {
    if (e.direction === 'left') {
        scrollView.setDirection('left');
    } else {
        scrollView.setDirection('right');
    }

});

//need to open settings window last so buttons are active
mainWin.open();
settingsWin.open();
settingsWin.hide();
mainWin.animate(slideItRight);
