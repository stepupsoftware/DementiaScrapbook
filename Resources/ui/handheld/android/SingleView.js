/*global L, Ti, Titanium, joli, uploader, logger, models, sus, cust*/
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true*/
var theme = require('/ui/common/theme');
var _ = require('/lib/underscore');
SingleWindow = function(options) {
    var that = this;
    if (!( that instanceof SingleWindow)) {
        return new SingleWindow(controller, options);
    }
    that.initialized = false;
    that.open();
    return that;
};

SingleWindow.prototype.open = function() {
    var that = this;
    if (!that.initialized) {
        that = initialize(that);
        that.initialized = true;
    }
    that.tabGroup.open();
};

//initialize is a private function
initialize = function(that) {

    that.tabGroup = Titanium.UI.createTabGroup({
        id : 'tabGroup1'
    });
    homeWindow = Ti.UI.createWindow(_.extend({
        title : L('title')
    }, theme.window));

    tab = Titanium.UI.createTab({
        title : L('home'),
        window : homeWindow
    });
    that.tabGroup.addTab(tab);
    that.tabGroup.setActiveTab(tab);
    
    if (that.tabGroup.tabBarVisible === true) {
        tabGroup.tabBarVisible = false;
    }

    PeopleWindow = require('/ui/common/people');
    peopleWindow = new PeopleWindow();

    TimelineWindow = require('ui/common/timeline');
    timelineWindow = new TimelineWindow();

    PostcardWindow = require('ui/common/postcards');
    postcardWindow = new PostcardWindow();

    peopleBtn = Ti.UI.createButton(_.extend(theme.buttons, {
        'title' : L('people'),
        'backgroundColor' : theme.colors.blue
    }));
    peopleBtn.addEventListener('click', function() {
        that.tabGroup.activeTab.open(peopleWindow);
    });
    postcardBtn = Ti.UI.createButton(_.extend(theme.buttons, {
        'title' : L('postcards'),
        'backgroundColor' : theme.colors.orange
    }));
    postcardBtn.addEventListener('click', function() {
        that.tabGroup.activeTab.open(postcardWindow);
    });
    timelineBtn = Ti.UI.createButton(_.extend(theme.buttons, {
        'title' : L('timeline'),
        'backgroundColor' : theme.colors.purple
    }));
    timelineBtn.addEventListener('click', function() {
        that.tabGroup.activeTab.open(timelineWindow);
    });

    view = Ti.UI.createView({
        height : Ti.UI.SIZE,
        scrollable : false,
        separatorStyle : Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        separatorColor : 'transparent',
        layout : 'vertical'
    });

    view.add(peopleBtn);
    view.add(timelineBtn);
    view.add(postcardBtn);
    homeWindow.add(view);

    return that;

};

exports.SingleWindow = SingleWindow;
exports.create = function() {
    var singleWindow = new SingleWindow();
    return singleWindow;
}
