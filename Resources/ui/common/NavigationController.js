/*global L */
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true*/
var windowStack = [];
var navGroup = {};

exports.create = function(firstWindow) {
    //add the window to the stack of windows managed by the controller
    windowStack.push(firstWindow);

    //hack - setting this property ensures the window is "heavyweight" (associated with an Android activity)
    firstWindow.navBarHidden = firstWindow.navBarHidden || false;

    if (Ti.Platform.osname === 'android') {
        firstWindow.exitOnClose = true;
    } else {
        navGroup = Ti.UI.iPhone.createNavigationGroup({
            window : firstWindow
        });
    }
    return navGroup;
};

exports.open = function(windowToOpen) {
    //add the window to the stack of windows managed by the controller
    windowStack.push(windowToOpen);

    //hack - setting this property ensures the window is "heavyweight" (associated with an Android activity)
    windowToOpen.navBarHidden = windowToOpen.navBarHidden || false;

    //This is the first window
    if (windowStack.length === 1) {
        if (Ti.Platform.osname === 'android') {
            windowToOpen.exitOnClose = true;
            windowToOpen.open();
        } else {

            navGroup = Ti.UI.iPhone.createNavigationGroup({
                window : windowToOpen
            });

            var containerWindow = Ti.UI.createWindow({});
            containerWindow.add(navGroup);
            containerWindow.open();

        }
    }
    //All subsequent windows
    else {
        if (Ti.Platform.osname === 'android') {
            windowToOpen.open();
        } else {
            navGroup.open(windowToOpen);
        }
    }
};
var home = function() {
    //store a copy of all the current windows on the stack
    var i, windows = windowStack.concat([]);
    for ( i = 1, l = windows.length; i < l; i++) {
        navGroup ? navGroup.close(windows[i]) : windows[i].close();
    }
    windowStack = [windowStack[0]];
    //reset stack
};

var back = function() {

    if (windowStack.length <= 1) {
        Ti.API.warn("navigationController: Attempt made to go back from main home page.");
        return;
    }

    var w = windowStack.pop();
    if (Ti.Platform.osname === 'android') {
        w.close();
    } else {
        navGroup.close(w);
    }
};

Ti.App.addEventListener('app:goBack', function() {
    back();
});

exports.home = home;
exports.back = back;

exports.getNg = function() {
    return navGroup;
};
