/*global L, Ti, Titanium, joli, uploader, logger, models, sus, cust*/
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true*/
_ = require('/lib/underscore');
theme = require('/ui/common/theme');
models = require('/model/model').models;
flurry = require('/ui/common/flurrysettings');
tf = require('/ui/common/testflightsettings');
var scrapbook = require('/sus/scrapbook');
scrapbook.initialise();
//scrapbook.getFiles();

SIDEBAR = 100;
var mainWin, settingsWin, metroBtn, refreshBtn, osname = Titanium.Platform.osname, slideItLeft, slideItRight;
var callBack = function(e) {
    mainWin.title(e.rowData.id);
};

settingsWin = require('/ui/common/SettingsWindow').create(callBack);

mainWin = require('/ui/common/ApplicationWindow').create({
    tabBar : false,
    title : 'all photos'
});

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


//need to open settings window last so buttons are active
mainWin.open();
settingsWin.open();
settingsWin.hide();
mainWin.animate(slideItRight);
