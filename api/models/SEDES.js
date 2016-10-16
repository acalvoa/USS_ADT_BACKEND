/**
 * SEDES.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	attributes: {
  		ID_SEDE:{
	  		type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
	  	},
	  	NOMBRE_SEDE:'string',
	  	DIRECCION:'string',
	  	AREAS:{
	  		collection: 'AREA',
	  		via: 'SEDE'
	  	},
	  	LUGARES:{
	  		collection: 'LUGAR',
	  		via: 'SEDE'
	  	},
	  	toJSON: function() {
	      var obj = this.toObject();
	      if(typeof obj.AREAS != "undefined") { obj.AREAS = obj.AREAS.length; } else { obj.AREAS = 0; }
	      if(typeof obj.LUGARES != "undefined") { obj.LUGARES = obj.LUGARES.length; } else { obj.LUGARES = 0; }
 	      return obj;
	    }
  	},
  	autoPK: false,
  	tableName: 'SEDES'
};

