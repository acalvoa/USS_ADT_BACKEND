/**
 * PROFILE.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	attributes: {
  		ID_PROFILE:{
	  		type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
	  	},
  		NAME: 'string',
  		PERMISION: 'string',
      USER: {
  			collection: 'USERS',
        via: 'PROFILES'
  		}
  	},
  	autoPK: false,
    tableName: 'PERFIL'
};

