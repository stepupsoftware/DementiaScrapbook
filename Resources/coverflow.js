/*global L, Ti, Titanium, joli, uploader, logger, models, sus, cust*/
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true*/
var create = function() {

    var win = Ti.UI.createWindow({
        title : L('postcard'),
        backgroundColor : '#696969',
        id : "DETAIL_WINDOW",
        tabBarHidden : true,
        layout : 'composite'

    });
    
    var c;
    var images = [];
    for (c=0;c<30;c++)
    {
        images[c]='/images/imageview/'+c+'.jpg';
    }
    
    // create coverflow view with images
    var view = Titanium.UI.iOS.createCoverFlowView({
        images:images,
        backgroundColor:'#000'
    });
    
    // click listener - when image is clicked
    view.addEventListener('click',function(e)
    {
        Titanium.API.info("image clicked: "+e.index+', selected is '+view.selected);    
    });
    
    // change listener when active image changes
    view.addEventListener('change',function(e)
    {
        Titanium.API.info("image changed: "+e.index+', selected is '+view.selected);    
    });
    win.add(view);

    return win;

};
exports.create = create;
