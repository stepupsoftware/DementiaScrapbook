/*global L */
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true, regexp: true*/

//this window is added outside the navigation group and stays open all the time
var ApplicationWindow = function(args) {
    try {
        var win, view, all, events, postcards, people, settings;

        //private objects
        win = Ti.UI.createWindow({
            title : "Settings",
            backgroundColor : theme.performApp.Grey
        });

        view = Ti.UI.createView(_.defaults({
            layout : 'vertical'
        }, theme.mainView));

        all = Ti.UI.createButton({
            height : '20%',
            backgroundImage : '/images/27-planet.png'
        });
        events = Ti.UI.createButton({
            height : '20%',
            backgroundImage : '/images/83-calendar.png'
        });
        postcards = Ti.UI.createButton({
            height : '20%',
            backgroundImage : '/images/43-film-roll.png'
        });
        people = Ti.UI.createButton({
            height : '20%',
            backgroundImage : '/images/112-group.png'
        });
        settings = Ti.UI.createButton({
            height : '20%',
            backgroundImage : '/images/30-key.png'
        });

        view.add(all);
        view.add(events);
        view.add(postcards);
        view.add(people);
        view.add(settings);

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
