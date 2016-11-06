/**
 * ASIGNACION_UNIDAD.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	attributes: {
  		ID_ASIGNACION:{
	  		type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
	  	},
	  	USUARIO: {
	  		model: 'USERS',
	  		unique: true
	  	},
	  	UNIDAD: {
	  		model: 'UNIDAD'
	  	}
  	},
  	autoPK: false,
  	tableName: 'ASIGNACION_UNIDAD'
};

