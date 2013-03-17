/* global cust, sus, $$, models, Ti, Titanium L */
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true*/

var logger = require('sus/logger');
var fileExt = '.jpg';

var getFilePath = function (args) {
    return Ti.Filesystem.applicationDataDirectory + 'photos' + Ti.Filesystem.separator + args.fileName + fileExt;
};

var deleteFile = function(args) {
    if (args.fileName) {
        var target = Titanium.Filesystem.getFile( args.fileName );
        if ((target.exists()) ) {
            target.deleteFile();
        } 
    }
};

var deletePhotoFile = function(args) {
    deleteFile({fileName : args.fileName});
    deleteFile({fileName : args.fileName.replace(/^.*[\\\/]/, '').replace("." + fileExt, "") });
};

/**
 * Select image source, and trigger selecting from lib or taking photo
 * @param {Object} args
 * @returns Void
 */
var showImageSourceDialog = function (args) {
    var dialog = Titanium.UI.createOptionDialog({
        title : L('imagesourceprompt'),
        options : [L('imagesourcecamera'), L('imagesourcelibrary'), L('imagesourcenone'), L('cancel')],
        cancel : 3
    });

    dialog.addEventListener('click', function(e) {
        switch (e.index) {
        case  0: 
            takePhoto(args);
            break;
        case  1: 
            selectPhoto(args);
            break;
        case  2: 
            deletePhotoFile(args);
            Ti.App.fireEvent('app.noPhoto', {id : args.id});
            break;
        }
    });
    dialog.show();
};

/**
 * Select image from lib
 * @returns Void
 */
var selectPhoto = function() {
    var arrowDirection;
    try {
        if (Ti.Platform.osname === 'ipad') {
            // photogallery displays in a popover on the ipad and we
            // want to make it relative to our image with a left arrow
            arrowDirection = Ti.UI.iPad.POPOVER_ARROW_DIRECTION_LEFT;
        }
        Ti.Media.openPhotoGallery({
            allowEditing : false,
            autohide : true,
            arrowDirection : arrowDirection,
            animated : false,
            mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],

            success : function(e) {
                if (e.mediaType === Ti.Media.MEDIA_TYPE_PHOTO) {
                    savePhoto(e);
                } else {
                    require('ui/common/Alert').show("Photos only please");
                }
            },
            cancel : function() {
                Ti.App.fireEvent('app.photoSelectionCancelled');
            },
            error : function(error) {
                logger.log("Problem calling openPhotoGallery : " + JSON.stringify(error));
            }
        });
    } catch (ex) {
        logger.error(JSON.stringify(ex));
    } finally {
        arrowDirection = null;
    }
};
/**
 * Show the phone camera and allow the user to take a photograph
 * @method takePhoto
 * @returns Void
 */
var takePhoto = function(args) {
    try {
        Ti.Media.showCamera({
            saveToPhotoGallery : false,
            allowEditing : false,
            autohide : true,
            mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
            
            success : function(e) {
                if (e.mediaType === Ti.Media.MEDIA_TYPE_PHOTO) {
                    e.id = args.id;
                    savePhoto(e);
                } else {
                    require('ui/common/Alert').show("Photos only please");
                }
            },
            cancel : function() {
                logger.log('Photo taking cancelled.');
                Ti.App.fireEvent('form.attachmentCancelled');
            },
            error : function(error) {
                if (error.code === Ti.Media.NO_CAMERA) {
                    selectPhoto(args);
                } else {
                    Ti.Media.hideCamera();
                    logger.error(JSON.stringify(error));
                }
            }
        });
    } catch (ex) {
        logger.error(JSON.stringify(ex));
        Ti.Media.hideCamera();
    } finally {
        datetime = null;
    }
};

/**
 * saves a photo to the app data directory
 * @param {Object} args data from the showCamera event
 * @method savePhoto
 * @returns Void
 */
var savePhoto = function(args) {
    var imageBlob, savedFile, result, vals;
        
    var resizeImageBlob = function(args) {
        var newBlob = null;
        try {
            var isPortrait = (imageBlob.height >= imageBlob.width);
            var oldLongEdge = isPortrait ? imageBlob.height : imageBlob.width;
            var ratio = args.longEdge / oldLongEdge;
            newBlob = imageBlob.imageAsResized(imageBlob.width * ratio, imageBlob.height * ratio);
            return newBlob;
        } catch (ex) {
            logger.error(JSON.stringify(ex));
        } finally {
            return newBlob;
        }
    };    

    try {
        imageBlob = args.media;

        var photoFolder = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'photos');
        if( !photoFolder.exists() ) {
          photoFolder.createDirectory();
        }

        var fileName = new Date().getTime() ;
        
        var longEdge = Ti.App.Properties.getInt('imageLongEdgePx', 640);
        var thumbLongEdge = 200;

        var fullSizeImagePath = getFilePath({fileName : fileName});
        var thumbnailImagePath = getFilePath({fileName : fileName + '_thmb'});


        var fullSizeImageBlob = resizeImageBlob({longEdge : longEdge});
        logger.error("size" + imageBlob.size +" w " +imageBlob.width);
        var thumbnailImageBlob = imageBlob.imageAsThumbnail(thumbLongEdge); 

        var f1 = Ti.Filesystem.getFile(fullSizeImagePath);
        f1.write(fullSizeImageBlob);
        f1 = null;

        var f2 = Ti.Filesystem.getFile(thumbnailImagePath);

        f2.write(thumbnailImageBlob);
        f2 = null;

        Ti.App.fireEvent('app.photoAttachmentAdded', {
//            id : args.id,
            imagePath : fullSizeImagePath,
            thumbPath : thumbnailImagePath
        });
    } catch (ex) {
        logger.error(JSON.stringify(ex));
        Ti.App.fireEvent('form.attachmentErrored');
    } finally {
        imageBlob = null;
        fullSizeImageBlob = null;
        thumbnailImageBlob = null;
        f1 = null;
        f2 = null;
    }
};


Ti.App.addEventListener('app.takePhoto', function (e){
    showImageSourceDialog({id : e.id, fileName : e.fileName});
//    takePhoto({id : e.id});
});

Ti.App.addEventListener('app.deletePhoto', function (e){
    deletePhotoFile({id : e.id, fileName : e.fileName});
});


exports.takePhoto = takePhoto;
exports.selectPhoto = selectPhoto;
