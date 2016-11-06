/**
 * RESPONSABLE_UNIDAD.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
  		ID_RESPONSABLE:{
	  		type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
	  	},
	  	USUARIO: {
	  		model: 'USERS',
	  	},
	  	UNIDAD: {
	  		model: 'UNIDAD'
	  	}
  	},
  	autoPK: false,
  	tableName: 'RESPONSABLE_UNIDAD'
};

