/**
 * INVENTARIO.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
  		ID_INVENTARIO:{
	  		type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
	  	},
	  	TIPO: {
	  		model: 'CATEGORIA_INVENTARIO'
	  	},
	  	MARCA:'string',
	  	MODELO:'string',
	  	CODIGO:'string',
	  	OBSERVACION: 'string',
	  	LUGAR:{
	  		collection: 'LUGAR',
	  		via: 'INVENTARIO'
	  	}
  	},
  	autoPK: false,
  	tableName: 'INVENTARIO'
};

