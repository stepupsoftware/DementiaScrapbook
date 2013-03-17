/*global L, Ti, Titanium, joli, uploader, logger, models, sus, cust*/
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true*/
_ = require('/libs/underscore');
theme = require('/ui/common/theme');
//model = require('model/model');
flurry = require('/ui/common/flurrysettings');
tf = require('/ui/common/testflightsettings');
var mainWin, settingsWin, leftBtn, rightBtn, osname = Titanium.Platform.osname, slideItLeft, slideItRight;

settingsWin = require('/ui/common/settingsWindow').create();

settingsWin.open();

mainWin = require('/ui/common/ApplicationWindow').create({
    tabBar : false
});

slideItLeft = Titanium.UI.createAnimation({
    left : 150,
    duration : 500,
    curve : Ti.UI.ANIMATION_CURVE_LINEAR
});

slideItRight = Titanium.UI.createAnimation({
    left : 0,
    duration : 500,
    curve : Ti.UI.ANIMATION_CURVE_LINEAR
});

leftBtn = Ti.UI.createButton(_.defaults({
    backgroundImage : '/images/20-gear-2.png',
    width : 26,
    height : 28,
    toggle : true
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

mainWin.setRightNavButton(rightBtn);
mainWin.setLeftNavButton(leftBtn);

mainWin.open();
