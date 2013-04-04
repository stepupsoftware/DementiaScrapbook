/*global L */
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true, regexp: true*/

var ScrollWindow = function(args) {

	try {
		var number, folderName, folder, directoryContents, scrollableView;
		folderName = Ti.App.Properties.getString('scrapbook') || Titanium.Filesystem.applicationDataDirectory + 'scrapbook';
		folder = Ti.Filesystem.getFile(folderName);
		directoryContents = folder.getDirectoryListing();

		scrollableView = Ti.UI.createScrollableView({
			showPagingControl : false
		});

		var getEvents = function() {
			var items = [], events = [], photos = [];
			models.events.sync();
			events = models.events.get();
			photos = models.photos.get();
			//get the first photo for the event
			_.each(events, function(event) {
				var first, obj, contents;
				//if photos not stored already, add them to the events object
				if (!event.photos) {
					event.photos = [];
					_.each(photos, function(photo) {
						//if the photo is of this event
						if (photo.Events.indexOf(event.id) !== -1) {
							event.photos.push(photo);
						}
					});
				}
				//get the first photo (for now)
				first = _.first(event.photos);
				obj = {
					"path" : '/scrapbook/' + first.Name
				};
				//look up the photo details
				contents = models.contents.get(obj);
				if (contents && contents[0]) {
					items.push(contents[0]);
				}
			});
			//update the model with photos (assume that they have not been added)
			models.events.merge(events);
			return items;

		};

		var getPeople = function() {
			var items = [], people;
			models.people.sync();
			people = models.people.get();
			_.each(people, function(person) {
				var obj, contents;
				obj = {
					"path" : '/scrapbook/' + person.KeyPhoto
				};
				contents = models.contents.get(obj);
				if (contents && contents[0]) {
					items.push(contents[0]);
				}
			});

			return items;
		};

		var getPostcards = function() {
			var cards = [], items = [];
			models.postcards.sync();
			postcards = models.postcards.get();
			_.each(postcards, function(postcard) {
				var card = models.photos.get({
					'id' : postcard.PhotoID
				});
				if (card && card[0]) {
					cards.push(card[0]);
				}
			});
			_.each(cards, function(card) {
				var obj, contents;
				obj = {
					"path" : '/scrapbook/' + card.Name
				};
				contents = models.contents.get(obj);
				if (contents && contents[0]) {
					items.push(contents[0]);
				}
			});
			return items;
		};
		var addImages = function(args) {

			var contents, pictures = [], photos = [], views = [], events, people, postcards;

			try {
				//photos used throughout regardless of type
				models.photos.sync();

				switch (args) {
					case 'events':
						contents = getEvents();
						break;
					case 'people':
						contents = getPeople();
						break;
					case 'postcards':
						contents = getPostcards();
						break;
					default:
						contents = models.contents.get();
						break;
				}

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
						pictures.push(item.path);
					}

				});

				//check that the file exists and create an imageView if it does.
				_.each(pictures, function(picture) {

					var view, image;
					var fileName = Titanium.Filesystem.applicationDataDirectory + picture;
					var file = Ti.Filesystem.getFile(fileName);

					if (file.exists()) {
						view = Ti.UI.createView({
							backgroundColor : '#fff'
						});
						image = Ti.UI.createImageView({
							image : fileName,
							height : Ti.UI.SIZE,
							width : Ti.UI.SIZE
						});
						view.add(image);
						views.push(view);
					} else {
						Ti.API.error(fileName + ' is missing');
					}

				});

			} catch (ex) {

				msg = ex || ex.message;
				Ti.API.error(msg);

			} finally {

				number = _.size(views);
				return views;
			}

		};

		scrollableView.views = addImages(args);

		//get the number of views (photos)
		number = number ? number : _.size(scrollableView.getViews());
		var t = 0;
		var interval = Ti.App.Properties.getInt('interval') || 5000;
		//get the window to autoscroll
		var intval;
		var scroll = true;
		var direction = 'left';

		//if there is some content, set up autoscrolling
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
				msg = 'scrolling has resumed. Double click screen to pause';
			} else {
				msg = 'scrolling has stopped.  Double click screen to resume';
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

		this.setImages = function(args) {
			scrollableView.views = addImages(args);
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
