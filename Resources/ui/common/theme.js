/*global L */
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true, regexp: true*/

var susUtils = require('sus/utils');
var pal = {

    tempoBlack : '#111111',
    tempoGreen : '#bed936',

    pearsonBlue : '#273383',
    pearsonGreen : '#008b5d',
    pearsonOrange : '#ed6b06',
    pearsonPurple : '#9d1348',
    pearsonCream : '#fbf5ea',

    clinSkillsBlue : '#7DCAEA',

    appcRed : '#CA120D',
    appcDarkGray : '#787878',
    appcLightGray : '#343434',

    performApp : {
        lightOrange : '#ffac27',
        darkOrange : '#ff8a00',
        grey : '#727375',
        lightGrey : '#f5f5f5'
    }
};

var ui = {
    backGroundColor : '#ffffff',

    tabButton : {
        'width' : '80%',
        'height' : '60%',
        'style' : Ti.UI.iPhone.SystemButtonStyle.PLAIN,
        'backgroundColor' : pal.performApp.lightOrange,
        'color' : 'white',
        'font' : {
            'fontSize' : 12,
            'fontWeight' : 'bold'
        },
        'borderRadius' : 6
    },

    tabBarTabs : {
        width : '25%',
        height : Ti.UI.FILL,
        layout : 'absolute'
    },

    homeLabelText : {
        color : pal.performApp.lightOrange,
        backgroundColor : 'transparent',
        width : Ti.UI.FILL,
        left : 15,
        textAlign : 'left',
        font : {
            fontFamily : 'Helvetica Neue',
            fontSize : 20,
            fontWeight : 'bold'
        }
    },

    disclaimerWindow : {
        backgroundColor : 'transparent'
    },

    windowTitle : {
        font : {
            fontSize : 20,
            fontWeight : 'bold'
        }
    },
    //ensure that fakeNavBarView, fakeTabBarView, mainView heights do not exceed 100%!!
    fakeNavBarView : {
        height : '15%',
        //backgroundColor : pal.performApp.darkOrange,
        backgroundGradient : {
            type : 'linear',
            startPoint : {
                x : '0%',
                y : '0%'
            },
            endPoint : {
                x : '100%',
                y : '100%'
            },
            colors : [{
                color : pal.performApp.lightOrange,
                offset : 0.0
            }, {
                color : pal.performApp.darkOrange,
                offset : 0.5
            }, {
                color : pal.performApp.lightOrange,
                offset : 1.0
            }]
        },
        layout : 'horizontal'
    },

    fakeTabBarView : {
        height : '10%',
        backgroundColor : pal.performApp.grey,
        layout : 'horizontal'
    },

    mainView : {
        height : '75%'
    },

    opaqueView : {
        backgroundColor : '#336699',
        opacity : 0.60
    },

    planRow : {
        height : Ti.UI.FILL,
        backgroundColor : pal.performApp.lightGrey,
        selectedBackgroundColor : 'white'
    },

    planView : {
        'layout' : 'horizontal',
        'backgroundColor' : 'white',
        'width' : '90%',
        'height' : '75%',
        borderRadius : 10
    },

    disclaimerView : {
        backgroundColor : pal.clinSkillsBlue
    },

    disclaimerLabelView : {
        backgroundColor : pal.pearsonCream,
        borderColor : '#FFFFFF',
        borderRadius : 10,
        borderWidth : 2
    },
    disclaimerLabel : {
        textid : 'disclaimer_text',
        color : pal.pearsonBlue,
        backgroundColor : pal.pearsonCream
    },

    disclaimerButton : {
        //        color: '#92A1AD'
    },

    buttonBar : {
        backgroundColor : pal.pearsonBlue
    },

    bookshelfView : {
        navBarHidden : true
    },
    applicationWindow : {
        backgroundColor : pal.performApp.lightGrey,
        barColor : pal.performApp.lightOrange,
        navBarHidden : true,
        layout : 'vertical'
    },
    homeTableView : {
        backgroundColor : '#ffffff'
    },

    titleTableSectionHeader : {
        color : '#374696'
    },

    hubHeadings : {
        'color' : pal.performApp.lightOrange,
        'font' : {
            'fontSize' : 24,
            'fontWeight' : 'bold'
        },
        left : 5
    },


    titleTableRow : {
    },

    titleGridView : {
        backgroundColor : 'white'
    },

    titleGridButton : {
    },

    contentsWindow : {
        barColor : pal.performApp.lightOrange,
        barImage : 'images/topsectionheaderbg.png',
        backgroundColor : pal.clinSkillsBlue
    },
    tabletWindow : {
        backgroundColor : pal.pearsonCream
    },
    toolbar : {
        barColor : 'transparent'
        //not supported!        backgroundImage : 'images/topsectionheaderbg.png'
    },
    tableView : {
        backgroundColor : pal.clinSkillsBlue,
        rowBackgroundColor : pal.pearsonCream,
        separatorColor : '#FFFFFF'
    },
    tableLabel : {
        color : '#3285C7',
        backgroundColor : 'transparent',
        inactiveColor : '#AAAAAA'
    },
    searchBar : {
        hinttextid : 'searchbar_hint',
        barColor : pal.clinSkillsBlue
        //        backgroundColor  : pal.pearsonCream
    },
    popover : {
        backgroundColor : pal.pearsonBlue,
        barColor : pal.pearsonBlue
    },
    modalWindow : {
        modalTransitionStyle : Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
        modalStyle : Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,
        navBarHidden : true
    },
    webViewWindow : {
        barColor : pal.pearsonBlue,
        backgroundColor : pal.pearsonCream,
        left : 0,
        right : 0,
        top : 0,
        borderWidth : 0
    },
    webView : {
        scalesPageToFit : true,
        left : susUtils.isTablet ? 20 : 0,
        right : 0,
        top : susUtils.isTablet ? 44 : 0,
        bottom : 0,
        visible : false
    }
};

//Using extend so that ui can refer to the common palette etc
var theme = _.extend({}, pal, ui);
module.exports = theme;
