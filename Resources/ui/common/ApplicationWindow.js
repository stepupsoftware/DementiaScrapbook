/*global L */
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true, regexp: true*/

var ApplicationWindow = function(args) {
    var nav = require('ui/common/NavigationController');
    try {
        //private objects
        var win, fakeNavBar, leftNav, midNav, rightNav, mainView, fakeTabBar, backButton;
        //extensible titanium window
        var settings = args || {};
        var title = settings.title || '';
        win = Ti.UI.createWindow(_.defaults(settings, theme.applicationWindow));

        //fake navigation bar with left, right, middle views
        fakeNavBar = Ti.UI.createView(theme.fakeNavBarView);
        leftNav = Ti.UI.createView({
            width : '10%',
            layout : 'absolute'
        });
        midNav = Ti.UI.createView({
            width : '80%',
            layout : 'absolute'
        });
        rightNav = Ti.UI.createView({
            width : '10%',
            layout : 'absolute'
        });
        fakeNavBar.add(leftNav);
        fakeNavBar.add(midNav);
        fakeNavBar.add(rightNav);

        lbl = Ti.UI.createLabel(_.defaults({
            text : title,
            color : 'white'
        }, theme.windowTitle));
        midNav.add(lbl);

        mainView = Ti.UI.createView(_.defaults({
            layout : 'absolute'
        }, theme.mainView));

        //fake tab bar with button bar
        fakeTabBar = Ti.UI.createView(theme.fakeTabBarView);

        win.add(fakeNavBar);
        win.add(mainView);
        if (settings.tabBar === true) {
            win.add(fakeTabBar);
        }

        //public objects

        this.close = function() {
            nav.back();

        };

        this.home = function() {
            nav.home();
        };

        this.open = function() {
            nav.open(win);

        };
        this.add = function(args) {
            if (args) {
                mainView.add(args);
            }
        };

        this.title = function(title) {
            lbl.text = title;
        };

        this.navBar = fakeNavBar;

        this.tabBar = fakeTabBar;

        this.setRightNavButton = function(button) {
            rightNav.add(button);
        };

        this.setLeftNavButton = function(button) {
            leftNav.add(button);
        };

        this.addEventListener = win.addEventListener;
        this.removeEventListener = win.removeEventListener;

        //facade for titanium methods and properties on any ti objects in this window
        this.animate = win.animate;

        //event handlers

    } catch (ex) {

        msg = ex || ex.message;
        Ti.API.error(msg);

        return undefined;

    } finally {

        if (!(this instanceof ApplicationWindow)) {
            return new ApplicationWindow();
        }
    }

};

exports.create = function(args) {
    return new ApplicationWindow(args);
};
