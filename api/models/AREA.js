/**
 * AREA.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	attributes: {
  		ID_AREA:{
	  		type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
	  	},
	  	NOMBRE_AREA:'string',
	  	SEDE:{
	  		model: 'SEDES'
	  	},
	  	RESPONSABLE:{
	  		model: 'USERS'
	  	}
  	},
  	autoPK: false,
  	tableName: 'AREA'
};

