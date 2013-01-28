function cf_view() {
	var win = Titanium.UI.createWindow();
	
	var images = [];
	images.push('/images/bart_born.jpg');
    images.push('/images/200px-Lisa_Simpson.png');
    images.push('/images/Bart_graffiti.jpg');
    images.push('/images/homer_wedding.jpg');
    images.push('/images/simpson_family.jpg');
	
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

module.exports = cf_view;