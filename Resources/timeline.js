/*global L, Ti, Titanium, joli, uploader, logger, models, sus, cust*/
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true*/
function timeline() {
    win = Ti.UI.createWindow({
        title : L('timeline'),
        backgroundColor : '#696969',
        id : "DETAIL_WINDOW",
        tabBarHidden : true,
        layout : 'composite'

    });
    
    tv = Titanium.UI.createTableView({
        
    });
    
    var addRows = function() {
        var data = [];
        var today = Ti.UI.createTableViewSection({
            headerTitle: L('today')
        });
        var visit = Ti.UI.createTableViewRow({
            title: 'Visit from Lisa'
        });
        today.add(visit);
        var tomorrow = Ti.UI.createTableViewSection({
            headerTitle: L('tomorrow')
        });
        var lunch = Ti.UI.createTableViewRow({
            title: 'You have lunch today'
        });
        tomorrow.add(lunch);
        var yesterday = Ti.UI.createTableViewSection({
            headerTitle: L('yesterday')
        });
        var bart = Ti.UI.createTableViewRow({
            title: 'Bart visited yesterday'
        });
        yesterday.add(bart);
        data.push(yesterday);
        data.push(today);
        data.push(tomorrow);
        return data;
    };
    win.add(tv);
    tv.setData(addRows());
        tv.addEventListener('click', function() {
        alert('detail on event will appear here');
    });
    win.addEventListener('focus', function() {
        tv.setData(addRows());
    });
    return win;
}
module.exports = timeline;
