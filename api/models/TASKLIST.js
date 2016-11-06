/**
 * TASKLIST.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
	  	ID_TASKLIST:{
	  		type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
	  	},
	  	DESCRIPCION: 'string',
	  	ACTIVIDAD: {
	  		model: 'ACTIVIDADES'
	  	},
	  	LUGAR:{
	  		model: 'LUGAR'
	  	}
	},
  	autoPK: false,
  	tableName: 'TASKLIST'
};

