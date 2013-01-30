/*global L, Ti, Titanium, joli, uploader, logger, models, sus, cust*/
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true*/
var theme = {
    buttons : {
        color : '#c5c5c7',
        top : 5,
        width : '75%',
        height : '25%',
        borderRadius : 0,
        style : 'none',
        font : {
            fontSize : 20,
            fontFamily : 'Helvetica Neue',
            fontWeight : 'bold'
        }
    },
    colours : {
        blue : '#1BA1E2',
        orange : '#F09609',
        purple : '#A200FF'
    },
    window : {
        backgroundColor : '#696969',
        id : "DETAIL_WINDOW",
        tabBarHidden : true
    }
    
};
theme.colors = theme.colours;
module.exports = theme;
