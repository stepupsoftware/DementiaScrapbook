/*global L, Ti, Titanium, joli, uploader, logger, models, sus, cust*/
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true*/
var theme = require('/ui/common/theme');
var _ = require('/lib/underscore-min');
var model = require('model/model');
function cf_view() {
    var win = Ti.UI.createWindow(_.extend({
        title : L('postcards')
    }, theme.window));

    var images = [];
    images.push('/images/bart_born.jpg');
    images.push('/images/200px-Lisa_Simpson.png');
    images.push('/images/Bart_graffiti.jpg');
    images.push('/images/homer_wedding.jpg');
    images.push('/images/simpson_family.jpg');

    var osname = Titanium.Platform.osname;
    if (osname !== 'android') {
        // create coverflow view with images
        var view = Titanium.UI.iOS.createCoverFlowView({
            images : images,
            backgroundColor : '#000'
        });

        // click listener - when image is clicked
        view.addEventListener('click', function(e) {
            Titanium.API.info("image clicked: " + e.index + ', selected is ' + view.selected);
        });

        // change listener when active image changes
        view.addEventListener('change', function(e) {
            Titanium.API.info("image changed: " + e.index + ', selected is ' + view.selected);
        });
        win.add(view);

    } else {
        var view1 = Ti.UI.createView({
            backgroundColor : theme.backgroundColor
        });
        var view2 = Ti.UI.createView({
            backgroundColor : theme.backgroundColor
        });
        var view3 = Ti.UI.createView({
            backgroundColor : theme.backgroundColor
        });

        var view4 = Ti.UI.createView({
            backgroundColor : theme.backgroundColor
        });

        var view5 = Ti.UI.createView({
            backgroundColor : theme.backgroundColor
        });

        var image1 = Ti.UI.createImageView({
            image : '/images/bart_born.jpg'
        });

        var image2 = Ti.UI.createImageView({
            image : '/images/200px-Lisa_Simpson.png'
        });

        var image3 = Ti.UI.createImageView({
            image : '/images/Bart_graffiti.jpg'
        });

        var image4 = Ti.UI.createImageView({
            image : '/images/homer_wedding.jpg'
        });

        var image5 = Ti.UI.createImageView({
            image : '/images/simpson_family.jpg'
        });
        
        view1.add(image1);
        view2.add(image2);
        view3.add(image3);
        view4.add(image4);
        view5.add(image5);

        var scrollableView = Ti.UI.createScrollableView({
            views : [view1, view2, view3, view4, view5],
            showPagingControl : true
        });

        win.add(scrollableView);
    }

    return win;
}

module.exports = cf_view;
