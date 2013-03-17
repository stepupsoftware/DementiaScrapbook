/**
 * The following snippet will ask the user to rate your app the second time they launch it.
 * It lets the user rate it now, "Remind Me Later" or never rate the app.
 */

var appId = '551297713';


var checkReminderToRate = function () {
    
    var dayDuration = (1000 * 60 * 60 * 24);
    var now = new Date().getTime();
    var remindToRate = Ti.App.Properties.getString('RemindToRate');
    if (!remindToRate) {
        Ti.App.Properties.setString('RemindToRate', now + 10 * dayDuration);
    }
    else if (remindToRate < now) {
        var alertDialog = Titanium.UI.createAlertDialog({
            title: 'Please rate this app!',
            message: 'Would you take a moment to rate this app?',
            buttonNames: ['OK', 'Remind Me Later', 'Never'],
            cancel: 2
        });
        alertDialog.addEventListener('click', function(evt) {
            switch (evt.index) {
                case 0:
                    Ti.App.Properties.setString('RemindToRate', Number.MAX_VALUE);
                    // NOTE: replace this with your own iTunes link; also, this won't WON'T WORK IN THE SIMULATOR!
                    //TODO move to a global / sus scope var
                    var url = 'itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=' + appId;
                    Ti.Platform.openURL(url);
                    break;
                case 1:
                    // "Remind Me Later"? Ok, we'll remind them later when they launch the app.
                    Ti.App.Properties.setString('RemindToRate', now + 10 * dayDuration);
                    break;
                case 2:
                    Ti.App.Properties.setString('RemindToRate', Number.MAX_VALUE);
                    break;
            }
        });
        alertDialog.show();
    }
}

checkReminderToRate();