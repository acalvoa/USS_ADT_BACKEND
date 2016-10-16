/**
 * ROLES.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	attributes: {
  		ID_ROLE:{
	  		type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
	  	},
	  	NOMBRE_ROL: 'string',
	  	SUPERUSER: 'boolean',
	  	USERS:{
	  		collection: 'USERS',
      		via: 'ROLE'
	  	}
  	},
  	autoPK: false,
  	tableName: 'ROLES'
};

