/*global L */
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true, regexp: true*/

//this window is added outside the navigation group and stays open all the time
var ApplicationWindow = function(args) {
    try {
        var win, view;
        
        //private objects
        win = Ti.UI.createWindow({
            title : "Settings",
            backgroundColor : theme.performApp.grey
        });

        view = Ti.UI.createView(_.defaults({
            layout : 'absolute'
        }, theme.mainView));

        win.add(view);
        //public objects
        
        this.open = win.open;
        
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
