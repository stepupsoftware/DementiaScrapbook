/*global L, Ti, Titanium, joli, uploader, logger, models, sus, cust*/
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true*/
var theme = require('/ui/common/theme');
function people() {
    _ = require('/libs/underscore');
    win = Ti.UI.createWindow(_.extend({
        title : L('people')
    }, theme.window));

    tv = Titanium.UI.createTableView();

    var addRows = function() {
        var file, fileJSON, people, groups;
        file = Ti.Filesystem.getFile('model/people.json');
        if (file.exists()) {
            fileJSON = file.read();
            people = JSON.parse(fileJSON);
            groups = _.chain(people).groupBy(function(obj) {
                return obj.type;
            }).value();
        }
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
                    backgroundColor : theme.backgroundColor
                });
                row.add(label);
                section.add(row);
            });
            data.push(section);
        }

        return data;
    };
    win.add(tv);
    tv.setData(addRows());
    return win;

}

module.exports = people