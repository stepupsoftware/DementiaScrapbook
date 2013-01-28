/*global L, Ti, Titanium, joli, uploader, logger, models, sus, cust*/
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true*/
var style = require('style').style;
var _ = require('libs/underscore');
SingleWindow = function(controller, options) {
    var that = this;
    that.initialized = false;
    that.appController = controller;

    that.open();

    return that;
};

SingleWindow.prototype.open = function() {
    var that = this;
    if (!that.initialized) {
        that.initialize();
        that.initialized = true;
    }
    that.tabGroup.open();
};

SingleWindow.prototype.initialize = function() {
    var that = this;

    that.tabGroup = Titanium.UI.createTabGroup({
        id : 'tabGroup1'
    });
    homeWindow = Ti.UI.createWindow({
        title : L('title'),
        backgroundColor : '#696969',
        id : "DETAIL_WINDOW",
        tabBarHidden : true

    });
    tab = Titanium.UI.createTab({
        title : 'tab',
        window : homeWindow
    });
    that.tabGroup.addTab(tab);
    that.tabGroup.setActiveTab(tab);

    peopleWindow = Ti.UI.createWindow({
        title : L('people'),
        backgroundColor : '#696969',
        id : "DETAIL_WINDOW",
        tabBarHidden : true,
        layout : 'composite'

    });

    timelineWindow = Ti.UI.createWindow({
        title : L('timeline'),
        backgroundColor : '#696969',
        id : "DETAIL_WINDOW",
        tabBarHidden : true,
        layout : 'composite'

    });

    PostcardWindow = require('coverflow_view');
    postcardWindow = new PostcardWindow();

    peopleBtn = Ti.UI.createButton(_.extend(style.buttons, {
        'title' : L('people'),
        'backgroundColor' : '#1BA1E2'
    }));
    peopleBtn.addEventListener('click', function() {
        that.tabGroup.activeTab.open(peopleWindow);
    });
    postcardBtn = Ti.UI.createButton(_.extend(style.buttons, {
        'title' : L('postcards'),
        'backgroundColor' : '#F09609'
    }));
    postcardBtn.addEventListener('click', function() {
        that.tabGroup.activeTab.open(postcardWindow);
    });
    timelineBtn = Ti.UI.createButton(_.extend(style.buttons, {
        'title' : L('timeline'),
        'backgroundColor' : '#A200FF'
    }));
    timelineBtn.addEventListener('click', function() {
        that.tabGroup.activeTab.open(timelineWindow);
    });

    view = Ti.UI.createView({
        layout : 'vertical'
    });

    view.add(peopleBtn);
    view.add(timelineBtn);
    view.add(postcardBtn);

    homeWindow.add(view);

};

exports.SingleWindow = SingleWindow;
exports.window = this.window;
