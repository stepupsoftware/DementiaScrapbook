/*global L */
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true, regexp: true*/

var ScrollWindow = function(args) {

    try {

        var scrollableView = Ti.UI.createScrollableView({
            showPagingControl : false
        });

        var addImages = function(args) {

            var contents = models.contents.get();
            var folderName = Ti.App.Properties.getString('scrapbook') || Titanium.Filesystem.applicationDataDirectory + 'scrapbook';
            var folder = Ti.Filesystem.getFile(folderName);
            var directoryContents = folder.getDirectoryListing();
            var photos = [], views = [];

            //remove child windows from scrollableView

            if (scrollableView.children) {
                _.each(scrollableView.children, function(kid) {
                    scrollableView.remove(kid);
                });
            }

            if (!contents || _.size(directoryContents) === 0 || !directoryContents) {
                throw new Error('no contents');
            }

            //get a list of photographs
            _.each(contents, function(item) {

                if (item.mime_type.indexOf("image") !== -1) {
                    photos.push(item.path);
                }

            });

            //check that the file exists and create an imageView if it does.
            _.each(photos, function(photo) {

                var view, image;
                var fileName = Titanium.Filesystem.applicationDataDirectory + photo;
                var file = Ti.Filesystem.getFile(fileName);

                if (file.exists()) {
                    view = Ti.UI.createView({
                        backgroundColor : '#fff'
                    });
                    image = Ti.UI.createImageView({
                        image : fileName,
                        height : '80%',
                        width : '80%'
                    });
                    view.add(image);
                    views.push(view);
                } else {
                    Ti.API.error(fileName + ' is missing');
                }

            });

            return views;

        };
        
        scrollableView.views = addImages();

        //get the number of views (photos)
        var number = _.size(scrollableView.getViews());
        var t = 0;
        var interval = Ti.App.Properties.getInt('interval') || 5000;
        //get the window to autoscroll
        var intval;
        var scroll = true;
        var direction = 'left';
        intval = setInterval(function(e) {
            if (scroll) {
                if (direction === 'left') {
                    //scroll up
                    if (t >= number) {
                        t = 0;
                    }
                    scrollableView.scrollToView(t);
                    t++;
                } else {
                    //scroll down
                    if (t === 0) {
                        t = number;
                    }
                    scrollableView.scrollToView(t);
                    t--;
                }
            }
        }, interval);

        this.view = scrollableView;

        this.setTimer = function() {
            var dialog, msg;
            //toggle scrolling on and off
            scroll = !scroll;
            if (scroll) {
                msg = 'scrolling has resumed. Click screen to pause';
            } else {
                msg = 'scrolling has stopped.  Click screen to resume';
            }
            Ti.API.debug('scrolling is ' + scroll);
            dialog = Ti.UI.createAlertDialog({
                message : msg,
                ok : 'ok'
            });
            dialog.show();
            setTimeout(function() {
                dialog.hide();
            }, 5000);

        };

        this.setDirection = function(args) {
            direction = args || 'left';
            Ti.API.debug('scrolling is ' + direction);
        };

    } catch (ex) {

        msg = ex || ex.message;
        Ti.API.error(msg);

        return undefined;

    } finally {

        if (!(this instanceof ScrollWindow)) {
            return new ScrollWindow();
        }
    }

};

exports.create = function(args) {
    return new ScrollWindow(args);
};
