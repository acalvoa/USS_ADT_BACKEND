/**
 * MIGRATEController
 *
 * @description :: Server-side logic for managing MIGRATES
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	migrate: function(req,res){
		//CREAMOS ROLES BASICOS
		ROLES.create({ NOMBRE_ROL: 'Usuario', SUPERUSER: false }).exec(function(){});
		ROLES.create({ NOMBRE_ROL: 'Admin', SUPERUSER: true }).exec(function(){
			// CREAMOS UN SUPERUSER
			USERS.create({ NAME: 'Super', LASTNAME: 'User', PASSWORD: 'uss_adt', EMAIL: 'root@uss.cl', ROLE:2 }).exec(function(){});
		});
		// CREAMOS UNA SEDE ROOT
		// CREAMOS UN AREA ROOT 
		res.ok();
	}
};

