/**
 * TAREAS.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	attributes: {
	  	ID_TAREA:{
	  		type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
	  	},
	  	NOMBRE: 'string',
	  	DESCRIPCION: 'string',
	  	CATEGORIA: {
	  		model: 'CATEGORIA'
	  	},
	  	UNIDAD: {
	  		model: 'UNIDAD'
	  	},
	  	FRECUENCIA: 'number'
	  },
	  autoPK: false,
	  tableName: 'TAREAS',
};

