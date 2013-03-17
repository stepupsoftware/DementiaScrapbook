/* Ti module 
var Flurry = require('ti.flurry');

Flurry.debugLogEnabled = true;
Flurry.eventLoggingEnabled = true;

Flurry.initialize('GK8YDQWFY5P49SD7JCX4' );

Flurry.reportOnClose = true;
Flurry.sessionReportsOnPauseEnabled = true;
Flurry.secureTransportEnabled = false;

*/


var tiflurry = require('com.sofisoftwarellc.tiflurry');
Ti.API.info("module is => " + tiflurry);


// these must be set before startSession
tiflurry.setContinueSessionMillis(5000);
tiflurry.setLogEnabled(true);
//tiflurry.setDebugLogEnabled(true);
tiflurry.logUncaughtExceptions(true);

tiflurry.startSession("GK8YDQWFY5P49SD7JCX4");

tiflurry.setSessionReportsOnCloseEnabled(true);
tiflurry.setSessionReportsOnPauseEnabled(true);
tiflurry.setSecureTransportEnabled(true);


/* Example flurry calls

setTimeout( function () {

    tiflurry.logEvent("myEvent");
    tiflurry.logEvent('myEvent', {key: 'value'});
    tiflurry.logEvent('myTimedEvent', {key: 'value'}, true); // for timed event
    tiflurry.endTimedEvent('myTimedEvent');
        
    tiflurry.logPageView();
    
    tiflurry.logError("error id", "message");
    
    tiflurry.setUserID("123");
    
    tiflurry.setAge(19);
    tiflurry.setGender("f");
    tiflurry.setGender("m");
    
    tiflurry.setLogEnabled(false);
    tiflurry.onEndSession();
    
    Ti.API.info("test completed");
}, 10000);
*/

exports.tiflurry = tiflurry;