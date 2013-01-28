MasterWindow = function(controller, options) {
	var that = this;
	that.initialized = false;
	that.appController = controller;

	that.open();

	return that;
}

MasterWindow.prototype.getWindow = function() {
	var that = this;
	return that.window;
}

MasterWindow.prototype.open = function() {
	var that = this;
	if (!that.initialized) {
		that.initialize();
		that.initialized = true;
	}

	that.window.open();
}

MasterWindow.prototype.initialize = function() {
	var that = this;

	that.window = Ti.UI.createWindow({
		title : 'Index',
		backgroundColor : '#fff',
		id : "MASTER_WINDOW",
		navBarHidden : true
	});

	var tableData = [Ti.UI.createTableViewRow({
		title : 'Home',
		file : 'index'
	}), Ti.UI.createTableViewRow({
		title : 'Me and My Family',
		file : 'people'
	}), Ti.UI.createTableViewRow({
		title : 'Postcards',
		file : 'postcards'
	}), Ti.UI.createTableViewRow({
		title : 'Today and Tomorrow',
		file : 'todayandtomorrow'
	})];

	that.tableview = Titanium.UI.createTableView({
		data : tableData
	});
	that.window.add(that.tableview);

	that.tableview.addEventListener('click', function(event) {
		that.appController.renderDetailWindow({
			"row" : event.index,
			"title" : event.row.title,
			"file" : event.row.file
		});
	});

	Ti.App.addEventListener('htmlevent', function(e) {
		if (Titanium.Platform.osname === 'ipad') {
			that.appController.renderDetailWindow({
				"row" : 1,
				"title" : '',
				"file" : e.file
			});
		}
	});

}
exports.MasterWindow = MasterWindow;
exports.window = this.window;
