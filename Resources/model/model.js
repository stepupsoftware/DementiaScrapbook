/*global L */
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true, regexp: true*/
var model = require('sus/model');
var models = {};

//callbackFunctions for models

models.entries = model.create({
    db : 'entries'
});
module.exports = {
    models : models
};