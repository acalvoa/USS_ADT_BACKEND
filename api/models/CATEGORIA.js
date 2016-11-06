/**
 * CATEGORIA.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	attributes: {
  		ID_CATEGORIA:{
	  		type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
	  	},
	  	NOMBRE: 'string',
	  	DESCRIPCION: 'string',
	  	COLOR: 'string',
	  	TEXTO: 'string',
	  	ROOT: {
	  		type: 'boolean',
	  		defaultsTo: false
	  	},
	  	AREA: {
	  		model: 'AREA'
	  	},
	  	TAREAS:{
	  		collection: 'TAREAS',
      		via: 'CATEGORIA'
	  	}
  	},
  	autoPK: false,
  	tableName: 'CATEGORIAS'
};

