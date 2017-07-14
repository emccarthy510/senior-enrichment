// This file should contain all the record creation needed to seed the database with its default values.
// The data can then be loaded with the node seed.js

var Promise = require('bluebird');
var db = require('./db');
var Campus = require('./db/models/Campus');
var Student = require('./db/models/Student');

var Campusdata = {
    campus: [
        {name: "Valentia Island JS",
            location: "Ireland, Earth"
        },
        {name: "Sihnon School",
            location: "Sihnon"
        },
        {name: "Alphabet School",
            location: "Annandale-on-Hudson"
        }]
}

var Studentdata = {

    student: [  
        {name: "Emily", email: "emccarthy510@yahoo.com", campus: Campusdata.campus[0]
            },
            {name: "Elisabeth", email: "emccarthy@gordonherlands.com", campus: Campusdata.campus[1]},
            {name: "Timothy", email: "teammccarthy@aol.com", campus:  Campusdata.campus[2]},
            {name: "Rebecca", email: "bumblebee2788@aol.com", campus: Campusdata.campus[0]}
    
    ]
};

db.sync({force: true})
    .then(function () {
        console.log("Dropped old data, now inserting student data");
        return Promise.map(Object.keys(Studentdata), function (name) {
            return Promise.map(Studentdata[name], function (item) {
                return db.model(name)
                    .create(item,
                    {
                        include: [Campus]
                    });
            });
        });
    })
    .then(function () {
        console.log("now inserting campus data");
        return Promise.map(Object.keys(Campusdata), function (name) {
            return Promise.map(Campusdata[name], function (item) {
                return db.model(name)
                    .create(item);
            });
        });
    })
    .then(function () {
        console.log("Finished inserting data");
    })
    .catch(function (err) {
        console.error('There was totally a problem', err, err.stack);
    })
    .finally(function () {
        db.close() // uses promises but does not return a promise. https://github.com/sequelize/sequelize/pull/5776
        console.log('connection closed'); // the connection eventually closes, we just manually do so to end the process quickly
        return null; // silences bluebird warning about using non-returned promises inside of handlers.
    });
