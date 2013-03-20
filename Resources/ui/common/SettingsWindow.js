/* global L */
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true, regexp: true*/

//this window is added outside the navigation group and stays open all the time
var ApplicationWindow = function(callBack) {
    
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
            backgroundColor : theme.performApp.grey,
            separatorColor : 'transparent'
        });

        if (callBack && ( typeof callBack === 'function')) {
            table.addEventListener('click', callBack);
        }

        view = Ti.UI.createView(_.defaults({
            layout : 'vertical',
            width : '100%',
            height : Ti.UI.SIZE,
            top : 0,
            backgroundColor : theme.performApp.grey
        }, theme.mainView));

        all = Ti.UI.createLabel({
            backgroundImage : '/images/27-planet.png',
            id : 'all photos'
        });
        events = Ti.UI.createLabel({
            backgroundImage : '/images/83-calendar.png',
            id : 'events'
        });
        postcards = Ti.UI.createLabel({
            backgroundImage : '/images/43-film-roll.png',
            id : 'postcards'
        });
        people = Ti.UI.createLabel({
            backgroundImage : '/images/112-group.png',
            id : 'people'
        });
        settings = Ti.UI.createLabel({
            backgroundImage : '/images/20-gear-2.png',
            id : 'settings'
        });

        icons = [all, events, postcards, people];

        view.add(table);

        var addRows = function() {
            var row, view, rows = [], itemsSection, SettingsSection;
            itemsSection = Ti.UI.createTableViewSection({
                headerTitle : L('views'),
                color : 'black',
                font : {
                    fontSize : 8
                }
            });
            _.each(icons, function(icon) {
                row = Ti.UI.createTableViewRow({
                    backgroundColor : theme.performApp.grey,
                    selectedBackgroundColor : theme.performApp.lightGrey,
                    layout : 'horizontal',
                    id : icon.id
                });
                view = Ti.UI.createView({
                    'height' : 40,
                    left : 10,
                    layout : 'horizontal',
                    top : 10
                });
                view.add(icon);
                row.add(view);
                itemsSection.add(row);
            });
            rows.push(itemsSection);
            SettingsSection = Ti.UI.createTableViewSection({
                headerTitle : L('settings'),
                color : 'black',  
                font : {
                    fontSize : 8
                }
            });
            row = Ti.UI.createTableViewRow({
                backgroundColor : theme.performApp.grey,
                selectedBackgroundColor : theme.performApp.lightGrey,
                layout : 'horizontal',
                id : settings.id
            });
            view = Ti.UI.createView({
                'height' : 40,
                left : 10,
                layout : 'horizontal',
                top : 10
            });
            row.add(view);
            view.add(settings);
            SettingsSection.add(row);
            rows.push(SettingsSection);
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
