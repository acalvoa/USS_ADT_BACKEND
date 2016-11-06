/**
 * ACTIVIDADES.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
	  	ID_ACTIVIDAD:{
	  		type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
	  	},
	  	NOMBRE: 'string',
	  	DESCRIPCION: 'string',
	  	TAREA:{
	  		model: 'TAREAS'
	  	},
	  	TASKLIST: {
	  		collection: 'TASKLIST',
	  		via: 'ACTIVIDAD'
	  	}
	},
  	autoPK: false,
  	tableName: 'ACTIVIDADES'
};

