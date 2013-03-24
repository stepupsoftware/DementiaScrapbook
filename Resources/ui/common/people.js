/*global L, Ti, Titanium, joli, uploader, logger, models, sus, cust*/
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true*/
var theme = require('/ui/common/theme');
var _ = require('/lib/underscore');
var model = require('model/model');
function people() {
    var win = Ti.UI.createWindow(_.extend({
        title : L('people')
    }, theme.window));

    var tv = Titanium.UI.createTableView();

    var addRows = function() {
        var groups = model.person.getGroups();
        var data = [];
        var group, groupArray = _.toArray(groups), i = 0, len = groupArray.length, section, row, groupNames, groupName, label;
        groupNames = _.keys(groups);
        for (i; i < len; i++) {
            group = groupArray[i];
            groupName = groupNames[i];
            section = Ti.UI.createTableViewSection({
                headerTitle : groupName
            });
            _.each(group, function(person) {
                row = Ti.UI.createTableViewRow();
                label = Ti.UI.createLabel({
                    text : person.aliasName,
                    right : 5
                });
                row.add(label);
                image = Ti.UI.createImageView({
                    image: person.picture,
                    left: 5,
                    width : 100
                });
                row.add(image);
                section.add(row);
            });
            data.push(section);
        }
        return data;
    };
    win.add(tv);
    tv.setData(addRows());
    tv.addEventListener('click', function() {
        alert('person biog/timeline will appear here');
    });
    win.addEventListener('focus', function() {
        tv.setData(addRows());
    });
    return win;

}

module.exports = people