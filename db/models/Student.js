'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


const Student = module.exports = db.define('student', {
  name: {
   type: Sequelize.STRING,
   allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    valudate: {
      isEmail: true
    }
  }
  
}, {
  defaultScope: {
    attributes: {
      include: ['campusId']
    }
  },
  scopes: {
    populated: () => ({
      include: [{
        model: db.model('campus')
      }]
    })
  },
  instanceMethods: {
    // getCampus: function () {
    //   return db.model('campus').findAll({
        
    //     // where: { id: this.campusId }
        
    //     include: [{
    //         model: db.model('student'),
    //         where: { id: this.id } // makes this entire query an inner join
    //       }]
        
    //   })
    }
  }
)