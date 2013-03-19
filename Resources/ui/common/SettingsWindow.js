/*global L */
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true, regexp: true*/

//this window is added outside the navigation group and stays open all the time
var ApplicationWindow = function(args) {
    var theme = require('/ui/common/theme');
    try {
        var win, fakeNavBar, view, table, icons, all, events, postcards, people, settings;

        //private objects
        win = Ti.UI.createWindow({
            backgroundColor : theme.performApp.grey,
            width : SIDEBAR,
            right : 0,
            height : '100%'
        });

       
        table = Ti.UI.createTableView({
            width : '100%',
            height : Ti.UI.FILL,
            backgroundColor : theme.performApp.grey, separatorColor: 'transparent'
        });

        view = Ti.UI.createView(_.defaults({
            layout : 'vertical',
            width : '100%',
            height : Ti.UI.SIZE, top : 40
        }, theme.mainView));

        all = Ti.UI.createLabel({
            backgroundImage : '/images/27-planet.png'
        });
        events = Ti.UI.createLabel({
            backgroundImage : '/images/83-calendar.png'
        });
        postcards = Ti.UI.createLabel({
            backgroundImage : '/images/43-film-roll.png'
        });
        people = Ti.UI.createLabel({
            backgroundImage : '/images/112-group.png'
        });
        settings = Ti.UI.createLabel({
            backgroundImage : '/images/20-gear-2.png'
        });

        icons = [all, events, postcards, people];

        view.add(table);

        var addRows = function() {
            var row, view, rows = [], itemsSection, SettingsSection;
            itemsSection = Ti.UI.createTableViewSection({
                backgroundColor : theme.performApp.lightGrey,
                title : 'VIEWS',
                color : 'white'
            });
            //rows.push(itemsSection);
            _.each(icons, function(icon) {
                row = Ti.UI.createTableViewRow({
                    backgroundColor : theme.performApp.grey,
                    layout : 'horizontal'
                });
                view = Ti.UI.createView({
                    'height' : 40,
                    left : 10,
                    layout : 'horizontal', top : 10
                });
                view.add(icon);
                row.add(view);
                rows.push(row);
            });
            SettingsSection = Ti.UI.createTableViewSection({
                backgroundColor : theme.performApp.lightGrey,
                title : 'SETTINGS',
                color : 'white'
            });
            //rows.push(SettingsSection);
            row = Ti.UI.createTableViewRow({
                backgroundColor : theme.performApp.grey,
                layout : 'horizontal'
            });
            view = Ti.UI.createView({
                'height' : 40,
                left : 10,
                layout : 'horizontal', top : 10
            });
            row.add(view);
            view.add(settings);
            rows.push(row);
            return rows;
        };

        table.setData(addRows());

        win.add(view);
        //public objects

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
