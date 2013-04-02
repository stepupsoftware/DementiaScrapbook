/*global L */
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true, regexp: true*/
var model = require('sus/model');
var models = {};

//callbackFunctions for models

models.contents = model.create({
    db : 'contents'
});
models.people = model.create({
    db : 'people'
});
models.photos = model.create({
    db : 'photos'
});
models.events = model.create({
    db : 'events'
});
models.postcards = model.create({
    db : 'postcards'
});
models.settings = model.create({
    db : 'settings'
});
module.exports = {
    models : models
};