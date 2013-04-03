/* global L */
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true, regexp: true*/

//this window is added outside the navigation group and stays open all the time
var ApplicationWindow = function(callBack) {

    var theme = require('/ui/common/theme');
    try {
        var win, fakeNavBar, view, table, icons, all, events, postcards, people, settings;

        //private objects
        win = Ti.UI.createWindow({
            backgroundColor : 'white',
            width : SIDEBAR,
            right : 0,
            height : '100%'
        });

        table = Ti.UI.createTableView({
            width : '100%',
            height : '100%',
            backgroundColor : 'white',
            separatorColor : 'transparent'
        });

        if (callBack && ( typeof callBack === 'function')) {
            table.addEventListener('click', callBack);
        }

        view = Ti.UI.createView(_.defaults({
            layout : 'vertical',
            width : '100%',
            height : '100%',
            top : 0,
            backgroundColor : 'white'
        }, theme.mainView));

        
        all = Ti.UI.createLabel({
            backgroundImage : '/images/world.png',
            height : 16,
            width : 16,
            id : L('photos')
        });
        events = Ti.UI.createLabel({
            backgroundImage : '/images/events.png',
            height : 16,
            width : 16,
            id : L('events')
        });
        postcards = Ti.UI.createLabel({
            backgroundImage : '/images/postcard.png',
            height : 16,
            width : 16,
            id : L('postcards')
        });
        people = Ti.UI.createLabel({
            backgroundImage : '/images/people.png',
            height : 16,
            width : 16,
            id : L('people')
        });
        
        settings = Ti.UI.createLabel({
            backgroundImage : '/images/settings.png',
            height : 16,
            width : 16,
            id : L('settings')
        });

        icons = [all, events, postcards, people, settings];

        view.add(table);

        var addRows = function() {
            var row, view, rows = [];
            _.each(icons, function(icon) {
                var lbl;
                row = Ti.UI.createTableViewRow({
                    backgroundColor : 'white',
                    selectedBackgroundColor : theme.scrapbook.lightGreen,
                    layout : 'horizontal',
                    id : icon.id,
                    height : '20%'
                });
                lbl = Ti.UI.createLabel({
                    text : icon.id,
                    font : {
                        fontSize : 10
                    },
                    color : theme.scrapbook.grey,
                    left : 10
                });
                view = Ti.UI.createView({
                    'height' : 16,
                    left : 10,
                    layout : 'horizontal',
                    top : 10
                });
                view.add(icon);
                view.add(lbl);
                row.add(view);
                rows.push(row);
            });
            return rows;
        };

        table.setData(addRows());

        win.add(view);
        //public objects

        //this window is not in the navigation stack
        this.hide = win.hide;

        this.show = win.show;

        this.open = win.open;

        //event handlers

        win.addEventListener('focus', function() {
            table.setData(addRows());
        });

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
