'use strict';

const express = require('express');
const router = express.Router();
const models = require('../../db/models');
const Student = models.Student;
module.exports = router;

router.get('/', function (req, res, next){
    Student.findAll({ where: req.query })
    .then(students => res.json(students))
    .catch(next);
});

router.param('studentId', function(req, res, next, id){
    Student.scope('defaultScope').findById(id)
    .then(student => {
        if(!student) {
            const err = Error('Student not found');
            err.status = 404;
            throw err
        }
        req.student = student
        next();
        return null; // in order to silence bluebird warning about promises inside of next
    })
    .catch(next);
});

router.get('/:studentId', function(req, res){
    res.json(req.student);
    
});

router.get('/:studentId/campus', function(req, res, next){
    req.student.getCampus()
    .then(campus => res.json(campus))
    .catch(next);
})

router.post('/', function(req, res, next){
    Student.create(req.body)
    .then(student => res.json(student))
    .catch(next);
});


router.put('/:studentId', function(req, res, next){
    var studentInst = req.student
    studentInst.update(req.body)
    .then(() => res.status(200).end())
    .catch(next);
});

router.delete('/:studentId', function(req, res, next){
    req.student.destroy()
    .then(() => res.status(204).end())
    .catch(next);
    
}

);

