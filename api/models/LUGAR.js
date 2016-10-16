/**
 * LUGAR.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
  		ID_LUGAR:{
	  		type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
	  	},
	  	NOMBRE_LUGAR:'string',
	  	SEDE:{
	  		model: 'SEDES'
	  	}
  	},
  	autoPK: false,
  	tableName: 'LUGAR'
};

