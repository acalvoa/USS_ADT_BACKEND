/**
 * USERS.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
  	ID_USER:{
  		type: 'integer',
  		primaryKey: true,
  		autoIncrement: true
  	},
  	NAME: 'string',
  	LASTNAME: 'string',
  	PASSWORD: 'string',
  	EMAIL: {
  		type: 'email',
  		unique: true
  	},
  	PROFILES:{
  		model: 'PROFILES'
  	},
    ROLE:{
      	model: 'ROLES',
      	defaultsTo: 1
    },
    AREA:{
    	model: 'AREA'
    },
    SEDE:{
    	model: 'SEDES'
    },
  	toJSON: function() {
      var obj = this.toObject();
	    return obj;
    }
  },
  autoPK: false,
  tableName: 'USERS',
  // Lifecycle Callbacks
  beforeCreate: function (values, cb) {
    // Hash password
    bcrypt.hash(values.PASSWORD, 10, function(err, hash) {
      if(err) return cb(err);
      values.PASSWORD = hash;
      //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
      cb();
    });
  }
};

