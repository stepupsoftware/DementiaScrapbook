/*global L */
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true, regexp: true*/

var ScrollWindow = function(args) {

    try {

        var contents = models.contents.get();
        var folderName = Ti.App.Properties.getString('scrapbook') || Titanium.Filesystem.applicationDataDirectory + 'scrapbook';
        var folder = Ti.Filesystem.getFile(folderName);
        var directoryContents = folder.getDirectoryListing();
        var photos = [], views = [];
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

        var scrollableView = Ti.UI.createScrollableView({
            views : views,
            showPagingControl : false
        });

        //get the number of views (photos)
        var number = _.size(views);
        var t = 0;
        var interval = Ti.App.Properties.getInt('interval') || 5000;
        setInterval(function(e) {
            if(t >= number) {
                t = 0;
            } 
            scrollableView.scrollToView(t);
            t++;
        }, interval);

        this.view = scrollableView;

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
