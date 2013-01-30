/*global L, Ti, Titanium, joli, uploader, logger, models, sus, cust*/
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true*/
var joli = require('libs/joli').connect('dementia001');
var _ = require('/libs/underscore');
var models = ( function() {
        var m = {};

        m.content = new joli.model({
            table : 'content',
            columns : {
                id : 'INTEGER PRIMARY KEY AUTOINCREMENT',
                data : 'TEXT',
                type : 'TEXT',
                title : 'TEXT'
            }
        });

        //the compound key make break this!
        m.eventmap = new joli.model({
            table : 'eventmap',
            columns : {
                id : 'INTEGER PRIMARY KEY AUTOINCREMENT',
                eventId : 'INTEGER NOT NULL',
                contentId : 'INTEGER NOT NULL',
                displayOrder : 'INTEGER'
            }
        });

        m.event = new joli.model({
            table : 'event',
            columns : {
                id : 'INTEGER PRIMARY KEY AUTOINCREMENT',
                eventDateTime : 'DATETIME',
                description : 'TEXT',
                eventType : 'TEXT',
                isRead : 'TEXT',
                profilePictureContentId : 'INTEGER'
            },
            methods : {
                getContent : function(eventId) {
                    var q = new joli.query().select('content.title, content.type, content.data').from('content').join('eventMap', 'eventMap.contentId', 'content.id').where('eventMap.eventId = ?', eventId).order('eventMap.displayOrder');
                    return q.execute();
                }
            }
        });

        //the compound key make break this!
        m.personmap = new joli.model({
            table : 'personmap',
            columns : {
                id : 'INTEGER PRIMARY KEY AUTOINCREMENT',
                personId : 'INTEGER NOT NULL',
                contentId : 'INTEGER NOT NULL',
                displayOrder : 'INTEGER',
                aboutMe : 'INTEGER'
            }
        });

        m.person = new joli.model({
            table : 'person',
            columns : {
                id : 'INTEGER PRIMARY KEY AUTOINCREMENT',
                firstName : 'TEXT',
                lastName : 'TEXT',
                aliasName : 'TEXT',
                dob : 'DATETIME',
                nhsNumber : 'TEXT',
                profilePictureContentId : 'INTEGER'
            },
            methods : {
                getRelations : function(personId) {
                    var q = new joli.query().select('relatedPersonId, relation, aliasName').from('relation').where('relation.personId = ?', personId).order('displayOrder');
                    return q.execute();
                },
                getAboutMe : function(personId) {
                    var q = new joli.query().select('content.title, content.type, content.data').from('personMap').join('content', 'content.id', 'personMap.contentId').where('personMap.personId = ?', personId).where('personMap.aboutMe = ?', 1).order('displayOrder');
                    return q.execute();
                },
                getProfile : function(personId) {
                    var q = new joli.query().select('person.aliasName, content.id as profileId, content.data as profileData, content as profileType').from('person').join('content', 'content.id', 'person.profilePictureContentId').where('person.id = ?', personId);
                    return q.execute();
                },
                getTimeline : function(personId) {
                    var q = new joli.query().select('event.id, event.description, event.eventDateTime, eventProfile.id as profileId, eventProfile.data as profileData, eventProfile.type as profileType').from('personMap').join('content', 'content.id', 'personMap.contentId').join('eventMap', 'eventMap.contentId', 'content.id').join('event', 'event.id', 'eventMap.eventId').join('content as eventProfile', 'eventProfile.id', 'event.profilePictureContentId').where('personMap.personId = ?', personId).groupBy('event.id, event.description, event.eventDateTime, eventProfile.id, eventProfile.data, eventProfile.type').order('event.eventDateTime');
                    return q.execute();
                },
                getGroups : function() {
                    var file, fileJSON, people, groups;
                    file = file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model/people.json');
                    if (file.exists()) {
                        fileJSON = file.read();
                        people = JSON.parse(fileJSON);
                        groups = _.chain(people).groupBy(function(obj) {
                            return obj.type;
                        }).value();
                    } else {
                        Ti.API.error('cannot load' +file);
                    }
                    file = null;
                    fileJSON = null;
                    people = null;
                    return groups;
                }
            }
        });

        //the compound key make break this!
        m.relation = new joli.model({
            table : 'relation',
            columns : {
                id : 'INTEGER PRIMARY KEY AUTOINCREMENT',
                personId : 'INTEGER NOT NULL',
                relatedPersonId : 'INTEGER NOT NULL',
                relation : 'TEXT',
                aliasName : 'TEXT',
                displayOrder : 'INTEGER'
            }
        });

        m.helpmap = new joli.model({
            table : 'helpmap',
            columns : {
                id : 'INTEGER PRIMARY KEY AUTOINCREMENT',
                contentId : 'INTEGER NOT NULL',
                displayOrder : 'INTEGER'
            }
        });

        return m;
    }());
joli.models.initialize();
module.exports = models;
