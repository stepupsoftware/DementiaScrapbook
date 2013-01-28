/*global L, Ti, Titanium, joli, uploader, logger, models, sus, cust*/
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true*/
function people() {
    win = Ti.UI.createWindow({
        title : L('people'),
        backgroundColor : '#696969',
        id : "DETAIL_WINDOW",
        tabBarHidden : true,
        layout : 'composite'

    });
    var scrollView = Ti.UI.createScrollView({
        contentWidth : 'auto',
        contentHeight : 'auto',
        showVerticalScrollIndicator : true,
        showHorizontalScrollIndicator : true,
        height : '80%',
        width : '80%'
    });
    var view = Ti.UI.createView({
        backgroundColor : '#696969',
        borderRadius : 10,
        top : 10,
        layout : 'vertical'
    });
    var me = Ti.UI.createImageView({
        image : '/Bootstrap/img/profile-abraham-simpson_150.png',
        top : 10
    });
    var homer = Ti.UI.createImageView({
        image : '/Bootstrap/img/profile-homer_200.png',
        top : 10

    });
    var marge = Ti.UI.createImageView({
        image : '/Bootstrap/img/profile-marge_150.png',
        top : 10

    });
    var bart = Ti.UI.createImageView({
        image : '/Bootstrap/img/profile-bart_150.png',
        top : 10

    });
    var lisa = Ti.UI.createImageView({
        image : '/Bootstrap/img/profile-lisa_150.png',
        top : 10

    });
    var maggie = Ti.UI.createImageView({
        image : '/Bootstrap/img/profile-maggie_150.png',
        top : 10

    });
    view.add(me);
    view.add(homer);
    view.add(marge);
    view.add(bart);
    view.add(lisa);
    view.add(maggie);
    scrollView.add(view);
    win.add(scrollView);
    return win;
}

module.exports = people