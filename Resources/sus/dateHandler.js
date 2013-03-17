/*global L */
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true, regexp: true*/
module.exports = ( function() {
        var models = require('model/models').models;

        //return the sessions and exercises for those sessions
        var sessions = models.sessions;
        var schedule = sessions.get();
        var exercises = models.exercises;
        var exercisesforday = exercises.get();
        //use default data if none cached from server
        if (!schedule[0]) {
            schedule = sessions.defaults;
        }
        //TODO decide on how to handle whether to use default data or not in live situation
        if (!exercisesforday[0]) {
            exercisesforday = exercises.defaults;
        }

        //get days of data (current month from first of month plus 90 days)
        var dateRange = 90;
        var today = new Date();
        var currentMonth = today.getUTCMonth();
        var currentYear = today.getUTCFullYear();
        var currentDay = today.getDate();
        var startDate = new Date(currentYear, currentMonth, 1);
        //remove the hours and minutes from today (for date calculations elsewhere)
        today = new Date(currentYear, currentMonth, currentDay);

        //dateRange in milliseconds
        var range = (dateRange * 24 * 3600 * 1000);
        //allow for an extra week when it is the first of the month
        var sevenDays = (7 * 24 * 3600 * 1000);
        var twentyFourHours = (24 * 3600 * 1000);
        if (currentDay < 8) {
            startDate = new Date((startDate.valueOf() - sevenDays));
            //add seven days back so end date is still the same
            range = ((dateRange + 7) * 24 * 3600 * 1000);
        }

        var endDate = new Date(startDate.valueOf() + range);

        Ti.API.debug('range is from ' + startDate.toDateString() + ' to ' + endDate.toDateString());

        var label = function(activeDate) {
            todayVal = today.valueOf();
            activeVal = activeDate.valueOf();
            yesterdayVal = (today - twentyFourHours).valueOf();
            if (activeVal === todayVal) {
                dateString = "Today | ";
            } else if (activeVal === yesterdayVal) {
                dateString = "Yesterday | ";
            } else {
                dateString = "";
            }

            return dateString +activeDate.toDateString();
        };

        var getSession = function(args) {
            var sessionDetails = [];
            try {

                if (!args) {
                    throw new Error('no date provided to getSession');
                }
                if (args.constructor !== Date) {
                    throw new Error('args not a date in getSession');
                }
                var testYear, testMonth, testDay, testVal;
                testYear = args.getUTCFullYear();
                testMonth = args.getMonth();
                testDay = args.getDate();
                //remove the time from the date string for comparison with scheduled dates
                testDate = new Date(testYear, testMonth, testDay);
                testVal = testDate.valueOf();

                //lets see if the planned/actual start time is the same day as our test date
                _.each(schedule, function(item) {
                    var itemYear, itemMonth, itemDay, itemDate, itemVal, itemDateString, itemDateArray;
                    itemDateString = item.actual_start_datetime.slice(0, 10);
                    itemDateArray = itemDateString.split("-");
                    itemDateString = itemDateArray[1] + "/" + itemDateArray[2] + "/" + itemDateArray[0];
                    itemDate = new Date(itemDateString);
                    itemYear = itemDate.getUTCFullYear();
                    itemMonth = itemDate.getMonth();
                    itemDay = itemDate.getDate();
                    //remove the timestamp from the scheduled date
                    itemDate = new Date(itemYear, itemMonth, itemDay);
                    if (itemDate.constructor === Date) {
                        itemVal = itemDate.valueOf();

                        if (itemVal === testVal) {
                            sessionDetails.push(item);
                        }
                    }
                });

            } catch(ex) {
                msg = ex || ex.message;
                Ti.API.error(msg);

                return undefined;

            } finally {
                if (sessionDetails.length < 1) {
                    //dont want to return an empty array
                    return undefined;
                }
                return sessionDetails;
            }
        };

        return {
            startDate : startDate,
            endDate : endDate,
            today : today,
            twentyFourHours : twentyFourHours,
            label : label,
            getSession : getSession
        };

    }());
