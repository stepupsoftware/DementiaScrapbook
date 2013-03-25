/*global L */
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true, regexp: true*/
var model = require('sus/model');
var models = {};

//callbackFunctions for models

models.contents = model.create({
    db : 'contents'
});
module.exports = {
    models : models
};