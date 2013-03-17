/*global L, Ti, Titanium, joli, uploader, logger, models, sus, cust*/
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true*/
_ = require('/libs/underscore');
theme = require('/ui/common/theme');
//model = require('model/model');
flurry = require('/ui/common/flurrysettings');
tf = require('/ui/common/testflightsettings');
SIDEBAR = 80;
var mainWin, settingsWin, leftBtn, rightBtn, osname = Titanium.Platform.osname, slideItLeft, slideItRight;

settingsWin = require('/ui/common/SettingsWindow').create();

settingsWin.open();

mainWin = require('/ui/common/ApplicationWindow').create({
    tabBar : false
});

slideItLeft = Titanium.UI.createAnimation({
    left : SIDEBAR,
    duration : 500
});

slideItRight = Titanium.UI.createAnimation({
    left : 0,
    duration : 500
});

leftBtn = Ti.UI.createButton(_.defaults({
    backgroundImage : '/images/259-list.png',
    width : 20,
    height : 14,
    toggle : true,borderRadius: 0
}, theme.tabButton));

leftBtn.addEventListener('click', function(e) {
    if (e.source.toggle === true) {
        mainWin.animate(slideItLeft);
        e.source.toggle = false;
    } else {
        mainWin.animate(slideItRight);
        e.source.toggle = true;
    }
});

rightBtn = Ti.UI.createButton(_.defaults({
    backgroundImage : '/images/01-refresh.png',
    width : 24,
    height : 26
}, theme.tabButton));

//not needed just yet.
//mainWin.setRightNavButton(rightBtn);
mainWin.setLeftNavButton(leftBtn);

mainWin.open();
