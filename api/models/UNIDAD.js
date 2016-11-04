/**
 * UNIDAD.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	attributes: {
  		ID_UNIDAD:{
	  		type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
	  	},
	  	NOMBRE:'string',
	  	ROOT: 'boolean',
	  	AREA:{
	  		model: 'AREA'
	  	}
  	},
  	autoPK: false,
  	tableName: 'UNIDADES'
};

