/*global L, Ti, Titanium, joli, uploader, logger, models, sus, cust*/
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true*/
_ = require('/libs/underscore');
theme = require('/ui/common/theme');
//model = require('model/model');
flurry = require('/ui/common/flurrysettings');
tf = require('/ui/common/testflightsettings');
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
    duration : 500
});

slideItRight = Titanium.UI.createAnimation({
    right : 0,
    duration : 500
});
//TODO resize button or add listener to view, not button
metroBtn = Ti.UI.createButton(_.defaults({
    backgroundImage : '/images/259-list.png',
    width : 40,
    height : 28,
    toggle : true,
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
//mainWin.setRightNavButton(refreshBtn);
mainWin.setLeftNavButton(metroBtn);


//need to open settings window last so buttons are active
mainWin.open();
settingsWin.open();
settingsWin.hide();
