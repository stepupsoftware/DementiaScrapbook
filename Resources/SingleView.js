SingleWindow = function(controller, options) {
	var that = this;
	that.initialized = false;
	that.appController = controller;

	that.open();

	return that;
}

SingleWindow.prototype.open = function() {
	var that = this;
	if (!that.initialized) {
		that.initialize();
		that.initialized = true;
	}
	that.tabGroup.open();
}

SingleWindow.prototype.initialize = function() {
	var that = this;

	that.tabGroup = Titanium.UI.createTabGroup({
		id : 'tabGroup1'
	});
	win1 = Ti.UI.createWindow({
		title : '',
		backgroundColor : '#fff',
		id : "DETAIL_WINDOW",
		tabBarHidden : true

	});
	tab = Titanium.UI.createTab({
		title : 'tab',
		window : win1
	});
	that.tabGroup.addTab(tab);
	that.tabGroup.setActiveTab(tab);

	win2 = Ti.UI.createWindow({
		title : '',
		backgroundColor : '#fff',
		id : "DETAIL_WINDOW",
		tabBarHidden : true

	});

	back = Ti.UI.createButton({
		'title' : 'Home'
	});

	win1.setLeftNavButton(back);

	//win2.setLeftNavButton(back);
	var url = "Bootstrap/index.html";
	back.addEventListener('click', function() {
		back.hide();
		webView.url = url;
		webView.reload();
	});

	webView = Ti.UI.createWebView({
		autoDetect : [Ti.UI.AUTODETECT_NONE]
	});
	webView.url = url;
	win1.add(webView);

	//win2.webView = webView;

	Ti.App.addEventListener('htmlevent', function(e) {
		back.show();
		webView.url = "Bootstrap/" + e.file + ".html";
		webView.reload();
	});

}

exports.SingleWindow = SingleWindow;
exports.window = this.window;
